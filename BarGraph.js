/*
The goal here is to load energies from the JSON file

*/



var duration = 5000;

var barHeight = 16,
    barWidth =  200;


var height = window.innerHeight- 200
    width = window.innerWidth - 60;

var y = d3.scaleLinear()
  .domain([0,-10000])
  .range([0, height])


var chart = d3.select('.chart')
  .attr("width", width-10)
  .attr("height", height-10);



var Calculations = [];


var energeticFixxers = new Array();
var realData = new Array();
//Load From JSON
d3.json("GoodStuff.json", function(error, data) {
  for (let key in data){
    if( data[key].Key > 20){
      data[key].pop
      realData.push( data[key]);
    }else{
      energeticFixxers.push(data[key])
    }

  }

  var energies = new Array();

  data = realData;
  data.forEach(function(d) {
    d.Atoms = d.Atoms;
    d.Energy = Fix_Energy(+d.Energy);
    d.Key = +d.Key;
  });

function Fix_Energy(energy){
  return(energy)

}


  //Stacking the structures based on atoms
  var keys = []
  for (var i = 0; i<data.length; i++){
    value = data[i].Key;
    if(!keys.includes(value) ){
      keys.push(value);
    }
  }

  //fixing the energies
  // Get max key, add to other structures to get to max key


  var spacing = width/keys.length;
  var x = d3.scaleOrdinal()
    .domain(keys)
    .range(math.range(0,width, spacing)._data); // the underscore data helps to get the actual array




  var bars = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate("+ x(d.Key) + ", 0)"; });


    bars.append("rect")
      .attr("y",0)
      .attr("rx",5 )
      .attr("ry",5)
      .attr("width", (barWidth))
      .attr("height", (barHeight) - 1)
    .transition()
      .attr("y", function(d) {return y(d.Energy);})
      .duration(duration);

    bars.append("text")
        .attr("y", barHeight/2)
        .attr("x", barWidth/2)
        .attr("dy", ".35em")
        .text(function(d) { return d.Key;})
      .transition()
        .attr("y", function(d) { return y(d.Energy)+barHeight/2;})
        .duration(duration);
});
