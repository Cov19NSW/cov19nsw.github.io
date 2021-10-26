import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["pie_chart_month@1.csv",new URL("./files/09a70e5fac00d8bd6c3fee04c7dc5034e3e187481c3db33ff7f124b572ea5848ad8bb0beb3344807cb674668f0cf1542bdff5a2bc178e80a6255295317f6750d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("viewof census_month")).define("viewof census_month", ["select"], function(select){return(
select(["7", "8", "9", "10"])
)});
  main.variable(observer("census_month")).define("census_month", ["Generators", "viewof census_month"], (G, _) => G.input(_));
  main.variable(observer("viewof chartType")).define("viewof chartType", ["radio"], function(radio){return(
radio({
  title: 'Chart Type...',
  options: ["Pie", "Donut"],
  value: "Pie"
})
)});
  main.variable(observer("chartType")).define("chartType", ["Generators", "viewof chartType"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["pie","data","census_month","d3","width","height","color","arc","arcLabel"], function(pie,data,census_month,d3,width,height,color,arc,arcLabel)
{
  let arcs, svg;

  arcs = pie(
    data.filter(d => {
      if (census_month == 7) {
        return d.month_measured == 7
      }
        else if (census_month == 8) {
        return d.month_measured == 8;
      } else if (census_month == 9) {
        return d.month_measured == 9;       
      }
        else if (census_month == 10) {
          return d.month_measured == 10;
        }
    })
  );

  svg = d3
    .create("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg
    .append("g")
    .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", d => color(d.data.group))
    .attr("d", arc)
    .append("title")
    .text(d => `${d.data.group}: ${d.data.pop.toLocaleString()}`);

  svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 15)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .call(text =>
      text
        .append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.group)
    )
    .call(text =>
      text
        .filter(d => d.endAngle - d.startAngle > 0.25)
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.pop.toLocaleString())
    );

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Loading Data`
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("pie_chart_month@1.csv").text(),
  d3.autoType
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dimensions`
)});
  main.variable(observer()).define(["width"], function(width){return(
width
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
Math.min(width, 600)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Scales`
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3
  .scaleOrdinal()
  .domain(data.map(d => d.group))
  .range(
    d3
      .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
      .reverse()
  )
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Arcs and Pie`
)});
  main.variable(observer("arc")).define("arc", ["d3","chartType","radius","width","height"], function(d3,chartType,radius,width,height){return(
d3
  .arc()
  .innerRadius(function() {
    if (chartType == 'Donut') {
      return radius * 0.67;
    } else {
      return 0;
    }
  })
  .outerRadius(Math.min(width, height) / 2 - 1)
)});
  main.variable(observer("radius")).define("radius", ["width","height"], function(width,height){return(
Math.min(width, height) / 2
)});
  main.variable(observer("pie")).define("pie", ["d3"], function(d3){return(
d3
  .pie()
  .padAngle(0.005)
  .sort(null)
  .value(d => d.pop)
)});
  main.variable(observer("arcLabel")).define("arcLabel", ["width","height","d3"], function(width,height,d3)
{
  const radius = (Math.min(width, height) / 2) * 0.8;
  return d3
    .arc()
    .innerRadius(radius)
    .outerRadius(radius);
}
);
  main.variable(observer("margin")).define("margin", function(){return(
{top: 75, right: 6, bottom: 6, left: 0}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Imports`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  const child2 = runtime.module(define1);
  main.import("radio", child2);
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("pie_chart_month@1.csv").csv()
)});
  return main;
}