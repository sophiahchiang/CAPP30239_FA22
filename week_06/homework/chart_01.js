const height = 500,
    width = 800,
    margin = ({ top: 20, right: 40, bottom: 100, left: 50 });

//creates svg object 
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); //sets viewbox dimensions

d3.json('a3cleanedonly2015.json').then(data => {

    let timeParse = d3.timeParse("%d/%m/%Y"); // parse time to JS format so code can read it
    let formatTime1 = d3.timeFormat("%m");
    let formatTime2 = d3.timeFormat("%B");

    //iterate through data to pull percentage and date values 
    for (let d of data) {
        d.Date = timeParse(d.Date);
        d.Date = formatTime1(d.Date)
        };

    let months = [
        { month: 1, count: 0 },
        { month: 2, count: 0 },
        { month: 3, count: 0 },
        { month: 4, count: 0 },
        { month: 5, count: 0 },
        { month: 6, count: 0 },
        { month: 7, count: 0 },
        { month: 8, count: 0 },
        { month: 9, count: 0 },
        { month: 10, count: 0 },
        { month: 11, count: 0 },
        { month: 12, count: 0 },
    ];

    for(var d of data) {
        let nd = months.find(nd => nd.month == d["Date"]);
        nd.count += 1;
    };

    console.log(data)

    console.log(months)


    let x = d3.scaleLinear() //setting the x scale
    .domain(d3.extent(months, d => d.month)).nice() //data
    .range([margin.left, width - margin.right]);

    // //create variable x that is set to the x axis 
    // let x = d3.scaleTime() //used to scale x axis
    //     .domain((months, d => d.month)) //specify library branch data that will be referenced on x axis
    //     .range([margin.left, width - margin.right]); //specify space for the x axis data to occupy

    //create variable y that is set to y axis 
    let y = d3.scaleLinear() //used to scale y axis
        .domain([0,d3.max(months, d => d.count)]).nice() //set data that is represented on y axis, use nice to round
        .range([height - margin.bottom, margin.top]); //set space for y axis data to occupy
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`) //move y axis
      .attr("class", "y-axis") // adding a class to y-axis for scoping
      .call(d3.axisLeft(y) //draw y axis 
        .tickSizeOuter(0) //ticks
        .tickSize(-width + margin.right + margin.left) // modified to meet at the end of y axis
      );

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) //move x axis
      .call(d3.axisBottom(x)
            .tickSizeOuter(0)
            ); //draw x axis with ticks


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
      .text("Number of Deaths"); //text for label
    
    let line = d3.line() //create line object
        .x(d => x(d.month)) //x coordinate values
        .y(d => y(d.count)) //y coordinate values
        .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

    svg.append("path") //draw line 
        .datum(months)
        .attr("d", line)
        .attr("fill", "none") //no fill 
        .attr("stroke-width","3px") //make line thicker
        .attr("stroke", "#99d594"); //set line color

  });