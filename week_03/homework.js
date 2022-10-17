/* Bar chart for library visits */

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num;
    };

    //set height, width and margin variables to be used later
    const height = 600,
          width = 800,
          margin = ({ top: 50, right: 50, bottom: 200, left: 80 });

    //create svg 
    let svg = d3.select("#chart") //selects the specified chart id
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); //use width and height parameters to enable resizing
    
    //create variable x that is set to the x axis 
    let x = d3.scaleBand() //used to scale x axis
        .domain(data.map(d => d.branch)) //specify library branch data that will be referenced on x axis 
        .range([margin.left, width - margin.right]) //specify space for the x axis data to occupy
        .padding(0.5); //specify how far apart the bars on the chart will be 
    
    //create variable y that is set to y axis 
    let y = d3.scaleLinear() //used to scale y axis
        .domain([0, d3.max(data, d => d.num)]) //set number of visits to data that is represented on y axis
        .range([height - margin.bottom, margin.top]); //set space for y axis data to occupy
    
    //add g elements 
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) //move location of x axis to be next to bars
        .call(d3.axisBottom(x)); //call generates the axis 
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`) //move y axis
        .call(d3.axisLeft(y)); //call generates the axis

    //create bars
    let bar = svg.selectAll(".bar") 
        .append("g") //add to graph 
        .data(data) //add data
        .join("g") 
        .attr("class", "bar"); //assign "bar" class

    bar.append("rect") //add rectangles to the bar group we created above
        .attr("fill", "teal") //choose color of bars
        .attr("x", d => x(d.branch)) //x position
        .attr("width", x.bandwidth()) //this width is the width attr on the element
        .attr("y", d => y(d.num)) //y position attribute
        .attr("height", d => y(0) - y(d.num)); //height of element 
    
    bar.append('text') //add labels
        .text(d => d.num) //choose data for labels 
        .attr('x', d => x(d.branch) + (x.bandwidth()/2)) //x position of labels
        .attr('y', d => y(d.num) + 15) //y position of labels
        .attr('text-anchor', 'middle') //specify that text inside of the bars should be centered
        .style('fill', 'white'); //specify color of text in the middle of bars

});