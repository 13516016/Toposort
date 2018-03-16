var w = 800;
var h = 800;

// var dfsCanvas = d3.select("#DFS")
// 				.append("svg")
// 				.attr("width",w)
// 				.attr("height",h);

var bfsCanvas = d3.select("#BFS")
				.append("svg")
				.attr("width",w)
				.attr("height",h);

// d3.json("bfs.json", function(data){
// 	var nodes = data.data;
var links = [
	{source: 0, target: 2},
	{source: 1, target: 3},
	{source: 3, target: 2},
    {source: 4, target: 1},
];

var nodes = {};

links.forEach(function(link){
	link.source = nodes[link.source] || (nodes[link.source] = {name:link.source}); 
	link.target = nodes[link.target] || (nodes[link.target] = {name:link.target});
});

console.log(nodes);

var color = d3.scale.category10();

var force = d3.layout.force()
			.size([w,h])
			.nodes(d3.values(nodes))
			.links(links)
			.on("tick",tick)
			.charge(-300)
			.linkDistance(w/3)

force.start();

var link = bfsCanvas.selectAll('.link')
			.data(links)
			.enter().append('line')
			.attr('class','links');

var node = bfsCanvas.selectAll('.node')
			.data(force.nodes())
			.enter().append('circle')
			.style("fill", function(d) { return color(d.weight); })
			.attr('class', 'node')
			.attr('r', w*0.03)
			.attr('id', function(d){return 'name-' + d.index});



force.start();

var t = d3.transition()
    .duration(600)
function tick(e) {
	node.attr('cx', function(d) {return d.x;})
		.attr('cy', function(d) {return d.y;});

	link.attr('x1',function(d) {return d.source.x;})
		.attr('y1',function(d) {return d.source.y;})
		.attr('x2',function(d) {return d.target.x;})
		.attr('y2',function(d) {return d.target.y;})

	var id;
	for (var i = 0; i < 5; i++) {
		id = "#name-"+i;
		console.log(id);
		d3.select(id).transition()
		.delay(i*500)
		.duration(50)
	    .style("fill", "red");
	}
	
}


d3.select('#restart')
	.on('click', function(){
		force.restart();
	},false);