{% extends 'layout.swig' %}

{% block content %}
<article>
	<aside>
		<div id="map_wrapper" ng-controller="mapDataController">
			<button ng-click="addHeatPoint()">add</button>
			<span style="display:none;">{{ updateMap() }}</span>
		</div>
	</aside>
	<section>
		<div id="map_canvas"></div>
	</section>
</article>
<ul></ul>
{% endblock %}
