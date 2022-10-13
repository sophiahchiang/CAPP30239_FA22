// Bar chart for COVID country cases

d3.csv("covid.csv").then(data => {

    for(let d of data) {
        d.cases = +d.cases;
    };

    const height = 800, 
          width = 800,
          margin = ({top: 25, right: 30, bottom: 35, left: 50});

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox",[0,0,width, height]);

    let x = d3.scaleBand() //domain is scale function only used w/in scaleband
        .domain(data.map(d => d.country)) //arrow function, first you pass the d
        .range([margin.left,width - margin.right])
        .padding(0.1); //how far apart will bars be on chart
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice() //the data
        //=> same as writing (function (d) {return d.cases});
        .range([height - margin.bottom, margin.top]); //space that data takes up

    const xAxis = g => g //assigning g to the x_axis function
        .attr("transform",`translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x)); //call runs the function 

    const yAxis = g => g //assigning g to the y_axis function
        .attr("transform",`translate(0,${margin.left - 5},0)`)
        .call(d3.axisLeft(y)); //call runs the function

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar") //select all with class of bar
        .append("g")
        .data(data)
        .join("g")
        .attr("class","bar"); 

    bar.append("rect") //append a rectangle element to the bar we just created
        .attr("fill","steelBlue")
        .attr("x",d => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y",d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));
        
});