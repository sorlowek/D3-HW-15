function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

    // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;

    // margins
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

    // chart area minus margins
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .arrt("height", svgHeight);

    // shift everything over by the margins
  var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data using d3
d3.csv("../data/data.csv", function(healthData){
  healthData.poverty = +healthData.poverty;
  healthData.povertyMoe = +healthData.povertyMoe;
  healthData.age = +healthData.age;
  healthData.income = +healthData.income;
  healthData.incomeMoe = +healthData.incomeMoe;
  healthData.noHealthInsurance = +healthData.noHealthInsurance;
  healthData.obesity = +healthData.obsesity;
  healthData.smokes = +healthData.smokes;
      });
      console.log(healthData);

    // scale y to chart height
  var yScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d.obesity)-1, d3.max(data, d=> d.obesity)])
        .range([height, 0]);

    // scale x to chart width
  var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d =>d.poverty)])
        .range([0, width]);

    // create axes
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
  chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // set y to the y axis
  chartGroup.append("g")
        .call(yAxis);


  chartGroup.selectAll("item")
        .data(healthData)
        .enter()
        .append('g')
        items.append("text")
        .text(healthData => healthData.abbr)
        .attr("dx", d => xScale(d.poverty)-6) 
        .attr("dy", d => yScale(d.obesity)+6)
        .style("fill", "blue")
        .style("font", "12px sans-serif")
        .style("font-weight", "bold")
        .classed("fill-text", true);   

//Creat circles for datapoints
        
  items.append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.obesity))
      .attr("r", "15")
      .attr("fill", "green")
      .attr("opacity", ".5");
     
     chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "axisText")
     .text("Poverty");
 
     chartGroup.append("text")
     .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
     .attr("class", "axisText")
     .text("Obesity");   

    };

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);