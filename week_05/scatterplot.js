//get rid of 2020 by using axisBottom(x).tickFormat(d3.timeFormat("%B")) <-- canada.js 

//set variables
let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => { //gettting the data 
  
  let x = d3.scaleLinear() //setting the x scale
    .domain(d3.extent(data, d => d.body_mass_g)).nice() //data
    .range([margin.left, width - margin.right]); //where the data actually is, space it takes on the page

  let y = d3.scaleLinear() //setting y scale
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() //data (extent does d3 min, d3 max)
    .range([height - margin.bottom, margin.top]); //space 

  svg.append("g") //creating x axis
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g") //creating y axis
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.body_mass_g))
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2) //radius 
    .attr("opacity", 0.75); //see through them 

  const tooltip = d3.select("body").append("div")
    .attr("class", "svg-tooltip") //from css styles page 
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});