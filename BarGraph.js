/*
The goal here is to load energies from the JSON file
*/

var key_to_zero_on = 178;
var atoms = [79,6,1] //Manual at the moment


var duration = 5000;

var barHeight = 16,
  barWidth = 200;

var height = window.innerHeight - 120
width = window.innerWidth - 10;



var chart = d3.select('.chart')
  .attr("width", width - 10)
  .attr("height", height - 10)

var Calculations = [];

var energeticFixxers = new Array();
var realData = new Array();
//Load From JSON
d3.json("GoodStuff.json", function(error, data) {
  for (let key in data) {
    if (data[key].Key > 159) {
      data[key].pop
      realData.push(data[key]);
    } else {
      energeticFixxers.push(data[key])
    }
  }

  var energies = new Array();
  var minEnergy = 0;
  var maxEnergy = -1000000000;
  var maxAtomList = new Array();
  data = realData;
  data.forEach(function(d) {
    d.Atoms = d.Atoms;
    d.Key = +d.Key;
    d.Energy = Fix_Energy(d);
    console.log(d.Energy)
    if (d.Energy < minEnergy) {
      minEnergy = d.Energy;
      maxAtomList = d.Atoms
    }
    if (d.Energy > maxEnergy) {
      maxEnergy = d.Energy;
    }
  });

  console.log(energeticFixxers);
  var normalizing_value = 96*(energeticFixxers[0].Energy+2*energeticFixxers[1].Energy);
  //fixing the energies
  // Get max key, add to other structures to get to max key
  function Fix_Energy(d) {
    if (d.key != key_to_zero_on) {
      temp = d.Atoms;
      //Super hacky and must be fixed
      if(d.Key == 176){
        d.Energy += energeticFixxers[2].Energy;
      }
      if(d.Key == 174){
        d.Energy += 2*energeticFixxers[2].Energy;
      }
      if(d.Key == 168){
        d.Energy += energeticFixxers[1].Energy;
      }
      if(d.Key == 166){
        d.Energy += energeticFixxers[1].Energy + energeticFixxers[2].Energy ;
      }
    return (+d.Energy*96) // returns in kJ/mol
    }
  }
  var y = d3.scaleLinear()
    .domain([2*barHeight+maxEnergy, minEnergy-2*barHeight])
    .range([0, height]);
  var c = d3.scaleLinear()
    .domain([maxEnergy-normalizing_value,minEnergy-normalizing_value])
    .range([0,1])

  //Stacking the structures based on atoms
  var keys = []
  for (var i = 0; i < data.length; i++) {
    value = data[i].Key;
    if (!keys.includes(value)) {
      keys.push(value);
    }
  }

  var spacing = width / keys.length;
  var x = d3.scaleOrdinal()
    .domain(keys)
    .range(math.range(0, width, spacing)._data); // the underscore data helps to get the actual array

  var bars = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + x(d.Key) + ", 0)";
    });

  bars.append("rect")
    .attr("y", 0)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", function(d) { return d3.interpolateRdYlGn((c(d.Energy-normalizing_value))); })
    .attr("width", (barWidth))
    .attr("height", (barHeight) - 1)
    .transition()
    .attr("y", function(d) {
      return y(d.Energy);
    })
    .duration(duration);

  bars.append("text")
    .attr("y", barHeight / 2)
    .attr("x", barWidth / 2)
    .attr("dy", ".35em")
    .text(function(d) {
      return Math.round(d.Energy- normalizing_value);
    })
    .transition()
    .attr("y", function(d) {
      return y(d.Energy) + barHeight / 2;
    })
    .duration(duration);
});




Array.prototype.contains = function(val){
  return this.filter(item => item == val).length;
}

function get_atom_differences(a,b){
  var missing = [0,0,0]
  var i = 0;
  atoms.forEach(function(atom){
    if(b.contains(atom) != a.contains(atom)){
      missing[i] = b.contains(atom) - a.contains(atom)
    }
    i++;
  });
  console.log(missing)

  return missing //return indices of energies to add
}
