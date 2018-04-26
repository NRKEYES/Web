/*
The goal here is to load energies from the JSON file

*/

var duration = 5000;

var barHeight = 20,
    barWidth = 20


var width = window.innerWidth - 40,
    height = window.innerHeight - 40;

var x = d3.scaleLinear()
  .range([0, width])
  .domain([0,-10000]);



var chart = d3.select('.chart')
  .attr("width", width);


var realData = [];
//Load From JSON
d3.json("GoodStuff.json", function(error, data) {

  for (let key in data){
    realData.push( data[key]);
  }
  data = realData;

  data.forEach(function(d) {
    d.Atoms = d.Atoms;
    d.Energy = +d.Energy;
  });



  console.log(data.length)

  chart.attr("height", barHeight * data.length)

  var bars = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate("+ i * barWidth + ", 0)"; });


    bars.append("rect")
      .attr("y",0)
      .attr("rx",15)
      .attr("ry",15)
      .attr("width", (barWidth))
      .attr("height", (barHeight) - 1)
    .transition()
      .attr("y", function(d) {return x(d.Energy);})
      .duration(duration);

    bars.append("text")
        .attr("y", barHeight/2)
        .attr("x", barWidth/2)
        .attr("dy", ".35em")
        .text(function(d) { return d.Key;})
      .transition()
        .attr("y", function(d) { return x(d.Energy)+barHeight/2;})
        .duration(duration);
});
