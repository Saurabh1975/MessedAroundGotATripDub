// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 100},
    width = 1800- margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;
var formatTime = d3.time.format("%e %B");

var graphWidth=600;

var transitionDuration = 3450;

var labelColor = '#39393a';

var assistColor = '#806015'

// Set the ranges
var x = d3.scale.linear().range([0, graphWidth]);
var y = d3.scale.linear().range([200, 0]);

var graphOneStart= 100
var graphOneHeight = 200+graphOneStart;

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var TDLine = d3.svg.line()
    .x(function(d) { return x(d.Game); })
    .y(function(d) { return y(d.TDTotal); });

// Define the line
var PtsLine = d3.svg.line()
    .x(function(d) { return x(d.Game); })
    .y(function(d) { return y(d.PTS); });

var RebLine = d3.svg.line()
    .x(function(d) { return x(d.Game); })
    .y(function(d) { return y(d.REB); });

var AstLine = d3.svg.line()
    .x(function(d) { return x(d.Game); })
    .y(function(d) { return y(d.AST); });

// Define the div for the tooltip
var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");


var focus = svg.append("g") 
        .attr("transform", 
              "translate(" + 0 + "," + (graphOneHeight+50) + ")")
        .style("display", "none");

var bisectGame = d3.bisector(function(d) { return d.Game; }).left;


    svg.append("text")
        .style("stroke",labelColor)
        .style('fill',labelColor)
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .style('font-size','48px')
        .attr('text-anchor',"right")
        .text('RUSSELL WESTBROOK TRIPLE DOUBLE WATCH');


    var colors = new Array( "#55AA55", "#0D4D4D", assistColor );

// Get the data
d3.csv("WestbrookGameLog.csv", function(error, data) {
    data.forEach(function(d) {
        d.Game = +d.Game;
        d.TDTotal = +d.TDTotal;
    });

    // Scale the range of the data
    x.domain([1, d3.max(data, function(d) { return d.Game; })]);
    y.domain([0, d3.max(data, function(d) { return d.TDTotal; })]);

    // Add the valueline path.
    var primaryPath = svg.append("path")
        .attr("class", "line")
        .attr("d", TDLine(data))
        .style('stroke-width','2.5px')
        .attr("transform", "translate(0," + graphOneStart+ ")");   

    var totalLength = primaryPath.node().getTotalLength();
    pathAnimation(primaryPath);

/*        primaryPath
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .ease('linear')
                        .duration(1500)
            .attr("stroke-dashoffset", 0);*/

    // Add the scatterplot

/*    svg.selectAll("dot")    
        .data(data)         
    .enter().append("circle")
        .attr("r", function(d) { if(d.TD>0) return 3; })       
        .attr("cx", function(d) { if(d.TD>0) return x(d.Game); })       
        .attr("cy", function(d) { if(d.TD>0) return y(d.TDTotal); })
        .attr("border", '2px')
        .attr("transform", "translate(0," + graphOneStart+ ")")
        .style('fill','#D49A6A')
        .on("mouseover", function(d) {  
            div.transition()        
               .duration(1000)      
               .style("opacity", .9);
            div.html('<a href= "http://stats.nba.com/game/#!/'+ d.Game_ID + '"><b>'+d.MATCHUP+'</b></a><br/>' +
                    "Points: " + d.PTS + "<br/>" +
                    "Rebounds: " + d.REB+ "<br/>" +
                    "Assists: " + d.AST+ "<br/>")  
               .style("left", 60 + "px")     
               .style("top", (40+graphOneStart) + "px");    
               //  .style("left", (d3.event.pageX) + "px")     
               // .style("top", (d3.event.pageY - 28) + "px");   
            })                  
        .on("mouseenter", function(d) {
            d3.select(this)
               .attr("r",5)
                .attr('stroke-width',5)
               .transition()
               .duration(1000);
        })
        .on("mouseleave", function(d) {
            d3.select(this).transition()            
               .attr("r",3)
               .attr('stroke-width',1)
        });*/

    var timeLength = data.length
//https://ih1.redbubble.net/image.195421564.4991/sticker,375x360.u2.png
    var test = svg.selectAll("dot")    
        .data(data)         
    .enter()
    .append("svg:image")  
        .attr('x',function(d) {  return x(d.Game)-10; })
        .attr('y',function(d) {return y(d.TDTotal)-12; })
        .attr('width', function(d){ if(d.TD>0) return(20)})
        .attr('height', 21)
        .attr("xlink:href","westbrook head.svg")
        .attr("transform", "translate(0," + graphOneStart+ ")")
        .style('opacity',0)
        .on("mouseover", function(d) {  
            div.transition()        
               .duration(1000)      
               .style("opacity", .9);
            div.html('<a href= "http://stats.nba.com/game/#!/'+ d.Game_ID + '"><b>'+d.MATCHUP+'</b></a><br/>' +
                    "Points: " + d.PTS + "<br/>" +
                    "Rebounds: " + d.REB+ "<br/>" +
                    "Assists: " + d.AST+ "<br/>")  
               .style("left", (margin.left) + "px")     
               .style("top", (40+graphOneStart) + "px");    
               //  .style("left", (d3.event.pageX) + "px")     
               // .style("top", (d3.event.pageY - 28) + "px");   
            })                  
        .on("mouseenter", function(d) {
            d3.select(this)
        .attr('width', 20*2)
        .attr('height', 21*2)
               .transition()
               .duration(1000);
        })
        .on("mouseleave", function(d) {
            d3.select(this).transition()  

            .attr('width', 20)
            .attr('height', 21)
        });

    test.transition()
        .ease('bounceIn')
        .delay( function(d,i){return transitionDuration/timeLength*i})
                .style('opacity',1)
;

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + graphOneHeight+ ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + graphOneStart+ ")")
        .call(yAxis);


});



d3.csv("WestbrookGameLog.csv", function(error, data) {
    data.forEach(function(d) {
        d.Game = +d.Game;
        d.PTS = +d.PTS;
        d.REB = +d.REB;
        d.AST = +d.AST;

    });

    y.domain([0, d3.max(data, function(d) { return d.PTS; })]);


   var ptsPathLine =  svg.append("path")
        .attr("class", "line")
        .attr("d", PtsLine(data))
        .style('stroke','#55AA55')
        .attr("transform", "translate("+0+"," +(graphOneHeight+50)+ ")")

    var rebPathLine = svg.append("path")
        .attr("class", "line")
        .attr("d", RebLine(data))
        .style('stroke','#0D4D4D')
        .attr("transform", "translate("+0+"," +(graphOneHeight+50)+ ")")

    var astPathLine = svg.append("path")
        .attr("class", "line")
        .attr("d", AstLine(data))
        .style('stroke','#804515')
        .attr("transform", "translate("+0+"," +(graphOneHeight+50)+ ")")


    pathAnimation(ptsPathLine);
    pathAnimation(rebPathLine);
    pathAnimation(astPathLine);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (graphOneHeight+250)+ ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + (graphOneHeight+50)+ ")")
        .call(yAxis);


    for(i = 1; i<4; i++){
    focus.append("circle")
        .attr("class", "Stat"+i)
        .style("fill", "none")
        .style("stroke", colors[i-1])
        .attr("r", 4);
    focus.append("text")
        .attr("class", "StatText"+i)
        .style("stroke",colors[i-1])
        .style("stroke-width", "0.5px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em");
    }
    focus.append("text")
        .attr("class", "StatDateText")
        .style("stroke",'black')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em");
    
    svg.append("rect")
            .attr("width", width)
            .attr("height", graphOneHeight)
            .attr("transform",
                      "translate(" + 0 + "," +
                                     graphOneHeight + ")")
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

    function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectGame(data, x0, 1),
                d0 = data[i + 1],
                d1 = data[i],
                d = x0 - d0.Game > d1.Game - x0 ? d1 : d0;
            console.log(i)
            focus.select("circle.Stat1")
                .attr("transform",
                      "translate(" + x(d.Game) + "," +
                                     y(d.PTS) + ")");
            focus.select("circle.Stat2")
                 .attr("transform",
                       "translate(" + x(d.Game) + "," +
                                      y(d.REB) + ")");
             focus.select("circle.Stat3")
                 .attr("transform",
                       "translate(" + x(d.Game) + "," +
                                      y(d.AST) + ")");

            focus.select("text.StatText1")
                .attr("transform",
                      "translate(" + graphWidth + "," +
                                     0 + ")")
               .text(d.PTS+" Pts");
            focus.select("text.StatText2")
                .attr("transform",
                      "translate(" + graphWidth + "," +
                                     20 + ")")
               .text(d.REB+" Rebs");
            focus.select("text.StatText3")
                .attr("transform",
                      "translate(" + graphWidth + "," +
                                     40 + ")")
               .text(d.AST+" Asts");  
            focus.select("text.StatDateText")
                .attr("transform",
                      "translate(" + graphWidth + "," +
                                     -20 + ")")
               .text(d.MATCHUP); 

    }
});


d3.csv("WestbrookSummaryStats.csv", function(error, summarystats) {
/*    summarystats.forEach(function(d) {
        d.PPG = +d.PPG;
        d.RPG = +d.RPG;
        d.APG = +d.APG;

        d.TargetPPG = +d.TargetPPG;
        d.TargetRPG = +d.TargetRPG;
        d.TargetAPG = +d.TargetAPG;

        d.Probability = +d.Probability;
        d.Projection = +d.Projection;

    });*/

    summarystats=summarystats[0];

    var current_target = new Array("CURRENT", "TARGET");
    for(i = 0; i<2; i++){
        svg.append("text")
            .style("stroke",labelColor)
            .style("fill",labelColor)
            .style("stroke-width", "0.75px")
            .style("opacity", 1)
            .attr("dx", 8)
            .attr("dy", "1em")
                .attr('text-anchor',"middle")
            .attr("transform", 
              "translate(" + graphWidth*1.5 + "," + (graphOneStart+i*100) + ")")
            .style('font-size','15px')
            .text(current_target[i]);
    }
    var statsTag = new Array("PPG", "RPG", "APG" );

    var stats = new Array(Math.round(summarystats.PPG*100)/100, 
        Math.round(summarystats.RPG*10)/10, 
        Math.round(summarystats.APG*10)/10 );



    svg.append("line")
                         .attr("x1", 5)
                         .attr("y1", 5)
                         .attr("x2", 500)
                         .attr("y2", 500);

    for(i = 1; i<4; i++){
    svg.append("text")
        .style("stroke",colors[i-1])
        .style("fill",colors[i-1])
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1+(i)*.25) + "," + (graphOneStart+35) + ")")
        .style('font-size','45px')
        .style('font-weight','bold')
        .text(stats[i-1]);

    svg.append("text")
        .style("stroke",colors[i-1])
        .style("fill",colors[i-1])
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.1+(i)*.25) + "," + (graphOneStart+ 55) + ")")
        .style('font-size','14px')
        .text(statsTag[i-1]);   
    }

    var targetStats = new Array(Math.round(summarystats.TargetPPG*100)/100, 
        Math.round(summarystats.TargetRPG*10)/10, 
        Math.round(summarystats.TargetAPG*10)/10 );

    for(i = 1; i<4; i++){
    svg.append("text")
        .style("stroke",colors[i-1])
        .style("fill",colors[i-1])
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1+(i)*.25) + "," + (graphOneStart+135) + ")")
        .style('font-size','45px')
        .style('font-weight','bold')
        .text(targetStats[i-1]);

    svg.append("text")
        .style("stroke",colors[i-1])
        .style("fill",colors[i-1])
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.1+(i)*.25) + "," + (graphOneStart+ 155) + ")")
        .style('font-size','14px')
        .text(statsTag[i-1]);   
    }

       svg.append("text")
        .style("stroke",labelColor)
        .style('fill',labelColor)
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.5) + "," + (graphOneStart+235) + ")")
        .style('font-size','15px')
        .style('font-weight','bold')
        .text("Chances of Averaging a Triple-Double");

    svg.append("text")
        .style("stroke",'#801515')
        .style("fill",'#801515')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.25)  + "," + (graphOneStart+275) + ")")
        .style('font-size','72px')
        .style('font-weight','bold')
        .style('opacity',0)
        .text(Math.round(summarystats.Probability*100))
        .transition()
        .duration(500)
            .ease('bounceIn')
            .delay(50*Math.round(summarystats.Projection*100)/100+250)
            .style('opacity',1);
    
    svg.append("text")
        .style("stroke",'#801515')
        .style("fill",'#801515')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.375  )  + "," + (graphOneStart+315) + ")")
        .style('font-size','15px')
        .style('font-weight','bold')
        .style('opacity',0)
        .text("percent")
                .transition()
        .duration(500)
            .ease('bounceIn')
            .delay(50*Math.round(summarystats.Projection*100)/100+250)
            .style('opacity',1);

    for(i = 0; i<5; i++){
        for(j = 0; j<20; j++){
                svg.append("svg:image")  
                    .attr('x',graphWidth*(1.5)+j*20)
                    .attr('y',(graphOneStart+260)+i*30)
                    .attr('width', 15)
                    .attr('height', 30)
                    .attr("xlink:href","westbrookshot.svg")
                    .style('opacity',0.25)
        }
    };

    for(i = 0; i<5; i++){
        for(j = 0; j<20; j++){
            if((i)*20+j < Math.round(summarystats.Probability*100)){
                svg.append("svg:image")  
                    .attr('x',graphWidth*(1.5)+j*20)
                    .attr('y',(graphOneStart+260)+i*30)
                    .attr('width', 15)
                    .attr('height', 30)
                    .style('opacity',0)   
                    .attr("xlink:href","westbrookshot.svg")
                    .transition()
            .ease('bounceIn')
            .delay(50*(i*10+j))
            .style('opacity',1)            }
        }
    };

        svg.append("text")
        .style("stroke",labelColor)
        .style('fill',labelColor)
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.5) + "," + (graphOneStart+425) + ")")
        .style('font-size','15px')
        .style('font-weight','bold')
        .text("Projected Triple-Doubles");


    svg.append("text")
        .style("stroke",'#801515')
        .style("fill",'#801515')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.25)  + "," + (575) + ")")
        .style('font-size','72px')
        .style('font-weight','bold')
                    .style('opacity',0)
        .text(Math.round(summarystats.Projection*100)/100)
        .transition()
        .duration(500)
            .ease('bounceIn')
            .delay(50*Math.round(summarystats.Projection*100)/100+250)
            .style('opacity',1);

    svg.append("text")
        .style("stroke",'#801515')
        .style("fill",'#801515')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(1.4)  + "," +  (610) + ")")
        .style('font-size','15px')
        .style('font-weight','bold')
                            .style('opacity',0)
        .text("triple doubles")
        .transition()
        .duration(500)
            .ease('bounceIn')
            .delay(50*Math.round(summarystats.Projection*100)/100+250)
            .style('opacity',1);

    for(i = 0; i<100; i++){
        for(j = 0; j<10; j++){
        svg.append("svg:image")  
            .attr('x',graphWidth*(1.5)+j*30)
            .style('opacity',0)
            .attr('y',550+i*35)
            .attr('width', 40)
            .attr('height', 40)
            .attr("xlink:href","westbrok3.svg")
            .transition()
            .ease('bounceIn')
            .delay(50*(i*10+j))
            .style('opacity',1)
        if((i*10+j+2) > Math.round(summarystats.Projection*100)/100){
            break;
        }

        }
        if(i+1 > Math.round(summarystats.Projection*100)/100/10)
            break;
    }


});


    svg.append("text")
        .style("stroke",labelColor)
        .style("fill",labelColor)
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(.5)  + "," + (graphOneHeight+15) + ")")
        .style('font-size','12px')
        .text("Game Number");

    svg.append("text")
        .style("stroke",labelColor)
        .style("fill",labelColor)
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + graphWidth*(.5)  + "," + (graphOneHeight*2-graphOneStart*.35) + ")")
        .style('font-size','12px')
        .text("Game Number");


    svg.append("text")
        .style("stroke",'#2d2d2d')
        .style("fill",'#2d2d2d')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + -75  + "," + (graphOneHeight+graphOneStart-20)/2  + ")")
        .style('font-size','12px')
        .html("Triple");

    svg.append("text")
        .style("stroke",'#2d2d2d')
        .style("fill",'#2d2d2d')
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + -75  + "," + ((graphOneHeight+graphOneStart-20)/2+15)  + ")")
        .style('font-size','12px')
        .html("Doubles");



var statList = new Array("Points","Rebounds","Assists")

    for(i = 0; i<3; i++){
    svg.append("text")
        .style("stroke",colors[i])
        .style("fill",colors[i] )
        .style("stroke-width", "0.75px")
        .style("opacity", 1)
        .attr("dx", 8)
        .attr("dy", "1em")
        .attr('text-anchor',"middle")
        .attr("transform", 
              "translate(" + -75  + "," + ((graphOneHeight*2.5+graphOneStart-17.5)/2+(i*20))  + ")")
        .style('font-size','12px')
        .html(statList[i]);
    }

    function pathAnimation(path_corr){
        var totalLength = path_corr.node().getTotalLength();
        path_corr
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .ease('linear')
                        .duration(transitionDuration)
            .attr("stroke-dashoffset", 0);
        } 