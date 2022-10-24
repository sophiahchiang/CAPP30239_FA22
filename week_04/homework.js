// Canada line chart

//sets constant values for height, width, and margin values
const height = 500,
    width = 800,
    margin = ({ top: 20, right: 40, bottom: 100, left: 50 });

//creates svg object 
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); //sets viewbox dimensions

//reads in data from csv
d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m"); // parse time to JS format so code can read it

    //iterate through data to pull percentage and date values 
    for (let d of data) {
        d.Num = +d.Num;
        d.Month = timeParse(d.Month); 
    }

    //create variable x that is set to the x axis 
    let x = d3.scaleTime() //used to scale x axis
        .domain(d3.extent(data, d => d.Month)) //specify library branch data that will be referenced on x axis
        .range([margin.left, width - margin.right]); //specify space for the x axis data to occupy

    //create variable y that is set to y axis 
    let y = d3.scaleLinear() //used to scale y axis
        .domain([0,d3.max(data, d => d.Num)]).nice() //set data that is represented on y axis, use nice to round
        .range([height - margin.bottom, margin.top]); //set space for y axis data to occupy
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`) //move y axis
      .attr("class", "y-axis") // adding a class to y-axis for scoping
      .call(d3.axisLeft(y) //draw y axis 
        .tickSizeOuter(0) //ticks
        .tickFormat(d => d + "%") // format to include % on the y axis labels
        .tickSize(-width + margin.right + margin.left) // modified to meet at the end of y axis
      );

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) //move x axis
      .call(d3.axisBottom(x).tickSizeOuter(0)); //draw x axis with ticks

    svg.append("text") //positioning and creating x axis 'Month' label 
      .attr("class", "x-label")
      .attr("text-anchor", "end") 
      .attr("x", width/2)
      .attr("y", height - margin.left)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month"); //text for label
    
    svg.append("text") //positioning and creating y axis 'Interest Rate' label
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -height/3)
      .attr("dx", "-0.5em")
      .attr("y", 10) 
      .attr("transform", "rotate(-90)") //rotate 90 degrees so label is vertical
      .text("Interest rate"); //text for label
    
    let line = d3.line() //create line object
        .x(d => x(d.Month)) //x coordinate values
        .y(d => y(d.Num)) //y coordinate values
        .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

    svg.append("path") //draw line 
        .datum(data)
        .attr("d", line)
        .attr("fill", "none") //no fill 
        .attr("stroke-width","3px") //make line thicker
        .attr("stroke", "pink"); //set line color

  });