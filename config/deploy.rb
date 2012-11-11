require 'capistrano/ext/multistage'

set :shared_children,         ["node_modules", "log"]
set(:shared_files)            {["config/#{node_env}.yaml"]}

set :user,                    "node"
set :application,             "thebigone"
set :node_file,               "index.js"
set :repository,              "git@github.com:WEBdeBS/thebigone.git"
set :admin_runner,            'node'

set :scm,                     :git
set :deploy_via,              :remote_cache
set :copy_exclude,            ".git"
#role :app, host

set(:deploy_to)               {"/home/node/#{application}/#{node_env}"}
set :use_sudo,                false
default_run_options[:pty] =   true

set :keep_releases,           4
ssh_options[:forward_agent] = true

namespace :deploy do
  task :start, :roles => :app, :except => { :no_release => true } do
    run "#{sudo} start #{application}_#{node_env}"
  end

  task :stop, :roles => :app, :except => { :no_release => true } do
    run "#{sudo} stop #{application}_#{node_env}"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{sudo} start #{application}_#{node_env} || sudo restart #{application}_#{node_env}"
  end

  desc "Symlink static directories and static files that need to remain between deployments."
  task :share_childs do
    if shared_children
      shared_children.each do |link|
        run "mkdir -p #{shared_path}/#{link}"
        run "if [ -d #{release_path}/#{link} ] ; then rm -rf #{release_path}/#{link}; fi"
        run "ln -nfs #{shared_path}/#{link} #{release_path}/#{link}"
        run "chmod ugo+w #{shared_path}/#{link}"
      end
    end
    if shared_files
      shared_files.each do |link|
        link_dir = File.dirname("#{shared_path}/#{link}")
        run "mkdir -p #{link_dir}"
        run "touch #{shared_path}/#{link}"
        run "ln -nfs #{shared_path}/#{link} #{release_path}/#{link}"
      end
    end
  end

#  desc "Symlink config files"
#  task :symlink_configs, :roles => :app do
#    %w[app_config.yml].each do |f|
#      run "ln -sf #{shared_path}/config/#{f} #{release_path}/config/#{f}"
#    end
#  end

  desc "Check required packages and install if packages are not installed"
  task :check_packages, roles => :app do
    run "cd #{release_path} && npm install"
  end

  task :write_upstart_script, :roles => :app do
    upstart_script = <<-UPSTART
# peppertweet - PepperTweet #{node_env}
#
# PepperTweet is PepperTweet

description "#{application}"

start on startup
stop on shutdown

script
    # We found $HOME is needed. Without it, we ran into problems
    export HOME="/home/#{admin_runner}"
    export NODE_ENV="#{node_env}"

    cd #{current_path}
    exec sudo -u #{admin_runner} sh -c "NODE_ENV=#{node_env} /usr/bin/node #{current_path}/#{node_file} #{application_port} >> #{shared_path}/log/#{node_env}.log 2>&1"
end script
respawn
UPSTART
  put upstart_script, "/tmp/#{application}_upstart.conf"
    run "#{sudo} mv /tmp/#{application}_upstart.conf /etc/init/#{application}_#{node_env}.conf"
  end

  task :create_env_config, :roles => :app do
    run "mkdir -p #{shared_path}/config"
    run "mkdir -p #{shared_path}/log"
    run "touch #{shared_path}/config/#{node_env}.yaml"
  end

end

after 'deploy:setup', 'deploy:create_env_config', 'deploy:write_upstart_script'
after "deploy:finalize_update", "deploy:share_childs", "deploy:check_packages", "deploy:restart"
after "deploy", "deploy:cleanup"
