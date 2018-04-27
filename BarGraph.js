/*
The goal here is to load energies from the JSON file

*/

var duration = 5000;

var barHeight = 20,
    barWidth = 100


var width = 800,
    height = 600;

var x = d3.scaleLinear()
  .domain([0,-10000])
  .range([0, height])




var chart = d3.select('.chart')
  .attr("width", width)
  .attr("height", height);



var Calculations = [];
console.log(typeof Calculations);

var realData = new Array();
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


  console.log(data.length);
  //Stacking
  console.log(typeof data);
  for (var i = 0; i<data.length; i++){
    console.log(data[i].Key);


  }


  var bars = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate("+ i * width/data.length + ", 0)"; });


    bars.append("rect")
      .attr("y",0)
      .attr("rx",5 )
      .attr("ry",5)
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
