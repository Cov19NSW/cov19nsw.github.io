// https://observablehq.com/@wwj/covid-lhd-cases@33
import define1 from "./a33468b95d0b15b0@806.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# # NSW COVID case growth per LHD`
)});
  main.variable(observer("a")).define("a", ["md"], function(md){return(
md `Select one or more LHDs below to continue (use Ctrl+Click or Cmd+Click to select multiple)`
)});
  main.variable(observer("viewof lhd")).define("viewof lhd", ["Inputs","lhds"], function(Inputs,lhds){return(
Inputs.select(lhds, {
  value: ["Central Coast"],
  label: "Select LHDs",
  multiple: true
})
)});
  main.variable(observer("lhd")).define("lhd", ["Generators", "viewof lhd"], (G, _) => G.input(_));
  main.variable(observer("key")).define("key", ["swatches","d3","lhd"], function(swatches,d3,lhd){return(
swatches({ color: d3.scaleOrdinal(lhd, d3.schemeTableau10) })
)});
  main.variable(observer("chart")).define("chart", ["Plot","d3","cases","lhd"], function(Plot,d3,cases,lhd){return(
Plot.plot({
  y: {
    label: "↑ New cases"
  },
  x: {
    label: "Date →",
    domain: d3.extent(cases, (c) => c.notification_date)
  },
  marks: [
    Plot.rectY(
      cases,
      Plot.binX(
        { y: "count", title: (d) => d[0].lhd_2010_name },
        {
          x: "notification_date",
          fill: "lhd_2010_name",
          filter: (d) => lhd.indexOf(d.lhd_2010_name) >= 0,
          thresholds: d3.timeDay
        }
      )
    )
  ]
})
)});
  main.variable(observer("color")).define("color", ["d3","lhds","myColor"], function(d3,lhds,myColor){return(
d3.scaleOrdinal()
    .domain(Object.keys(lhds).slice(1))
    .range(myColor)
)});
  main.variable(observer("data")).define("data", function(){return(
fetch(
  "https://data.nsw.gov.au/data/dataset/97ea2424-abaf-4f3e-a9f2-b5c883f42b6a/resource/2776dbb8-f807-4fb2-b1ed-184a6fc2c8aa/download/confirmed_cases_table4_location_likely_source.csv"
)
)});
  main.variable(observer("startDate")).define("startDate", function(){return(
new Date("2021-06-30")
)});
  main.variable(observer("cases")).define("cases", ["d3","data","startDate"], async function(d3,data,startDate){return(
d3
  .csvParse(await data.text(), d3.autoType)
  .filter((c) => c.notification_date > startDate)
)});
  main.variable(observer("lhds")).define("lhds", function(){return(
["Central Coast", "Correctional settings", "Far West", "Hunter New England", "Illawarra Shoalhaven", "Mid North Coast", "Murrumbidgee","Nepean Blue Mountains", "Northern NSW", "Northern Sydney","Sydney", "South Eastern Sydney","Southern NSW", "South Western Sydney", "Western NSW", "Western Sydney"]
)});
  main.variable(observer("myColor")).define("myColor", function(){return(
["#abdda4","#778899","#FFFACD", "#e15759", "#bab0ab", "#9c755f","#9370DB", "#af7aa1","#D2691E","darkgreen","#191970", "#2E8B57","#FAEBD7", "#9e0142", "#f46d43","#3288bd"]
)});
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  return main;
}
