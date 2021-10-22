import define1 from "./4298eef85ed0a136@199.js";
import define2 from "./81dfc4bb0f08d104@3162.js";
import define3 from "./efd693194f3388ed@1251.js";
import define4 from "./df85cae0251ec044@2866.js";
import define5 from "./d032cd7a2e2cbb37@33.js";
import define6 from "./d51c246e7a0ff214@2126.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const child1 = runtime.module(define1).derive([{name: "width", alias: "widthA"},"heightA"], main);
  main.import("chart", "chartB", child1);
  main.import("viewof census_month", child1);
  main.import("census_month", child1);
  const child2 = runtime.module(define2);
  main.import("chart", "chartA", child2);
  main.import("viewof duration", child2);
  main.import("duration", child2);
  const child3 = runtime.module(define3);
  main.import("chart", "chartC", child3);
  main.import("key", child3);
  main.import("TextChart", child3);
  main.import("TextChartNumber", child3);
  const child4 = runtime.module(define4);
  main.import("chart", "chartD", child4);
  main.import("viewof date", child4);
  main.import("date", child4);
  main.import("viewof radius_type", child4);
  main.import("radius_type", child4);
  main.import("legend", child4);
  main.import("update", child4);
  const child5 = runtime.module(define5);
  main.import("chart", "chartE", child5);
  main.import("key", "keyE", child5);
  main.import("viewof lhd", child5);
  main.import("lhd", child5);
  main.import("a", child5);
  const child6 = runtime.module(define6);
  main.import("map", "chartF", child6);
  main.import("viewof day", child6);
  main.import("day", child6);
  main.import("update1", child6);
  main.import("mutable index", child6);
  main.import("index", child6);
  main.import("update2", child6);
  main.import("update3", child6);
  main.import("legendRadii", child6);
  main.import("maxLegend", child6);
  main.variable(observer()).define(["TextChart"], function(TextChart){return(
TextChart
)});
  main.variable(observer()).define(["TextChartNumber"], function(TextChartNumber){return(
TextChartNumber
)});
  main.variable(observer()).define(["md"], function(md){return(
md`NSW LHD Cases Per Day-Bar Chart Race---------NSW LHD Cases Per Month-Pie Chart`
)});
  main.variable(observer()).define(["viewof duration"], function($0){return(
$0
)});
  main.variable(observer()).define(["viewof census_month"], function($0){return(
$0
)});
  main.variable(observer("grid")).define("grid", ["html","screen"], function(html,screen){return(
html`<div style="
  background: #fff;
  display: grid;
  height: ${screen.height / screen.width * 35}vw;
  grid-template-areas: 
    'a b'
    'a b';

  grid-gap: 10px;
">
  <div name="a" style="grid-area:a;border:solid 1px #ccc;"></div>
  <div name="b" style="grid-area:b;border:solid 1px #ccc;"></div>
</div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`NSW Vaccination/Per-region-case Gapminder-------------------NSW Region Streamgraph`
)});
  main.variable(observer()).define(["key"], function(key){return(
key
)});
  main.variable(observer()).define(["viewof date"], function($0){return(
$0
)});
  main.variable(observer()).define(["viewof radius_type"], function($0){return(
$0
)});
  main.variable(observer("gridB")).define("gridB", ["html","screen"], function(html,screen){return(
html`<div style="
  background: #fff;
  display: grid;
  height: ${screen.height / screen.width * 35}vw;
  grid-template-areas: 
    'd c'
    ;

  grid-gap: 10px;
">
  <div name="c" style="grid-area:c;border:solid 1px #ccc;"></div>
  <div name="d" style="grid-area:d;border:solid 1px #ccc;"></div>
</div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`NSW LHD Region Cases`
)});
  main.variable(observer()).define(["viewof lhd"], function($0){return(
$0
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Select one or more LHDs below to continue (Support multiple selection)`
)});
  main.variable(observer()).define(["keyE"], function(keyE){return(
keyE
)});
  main.variable(observer("gridC")).define("gridC", ["html","screen"], function(html,screen){return(
html`<div style="
  background: #fff;
  display: grid;
  height: ${screen.height / screen.width * 60}vw;
  grid-template-areas: 
    'e f f'
    'e f f'
      ;

  grid-gap: 10px;
">
  <div name="e" style="grid-area:e;border:solid 1px #ccc;"></div>
  <div name="f" style="grid-area:f;border:solid 1px #ccc;"></div>
</div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Click play to view Cases on NSW map`
)});
  main.variable(observer()).define(["viewof day"], function($0){return(
$0
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<h2>Appendix</h2>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<h4>Data source: 
<p>https://data.nsw.gov.au/nsw-covid-19-data/cases
<p>https://www.health.gov.au/resources/collections/covid-19-vaccination-geographic-vaccination-rates-lga</h4>`
)});
  main.variable(observer()).define(["Generators","grid","gridB","gridC","chartA","chartB","update","chartC","chartD","chartE","chartF","update1","update2","mutable index"], function(Generators,grid,gridB,gridC,chartA,chartB,update,chartC,chartD,chartE,chartF,update1,update2,$0)
{
  const maxLegend = 10000;
  class Cell {
  constructor(element) {
    this.element = element;
    element.style.position = "relative";
  }
  get width() {
    return resizer(this.element, "clientWidth");
  }
  get height() {
    return resizer(this.element, "clientHeight");
  }
  embed(content) {
    content.style.position = "absolute";
    content.style.width = "100%";
    content.style.height = "auto";
    if (this.element.firstChild) this.element.replaceChild(content, this.element.firstChild);
    else this.element.appendChild(content);
  }
};
  
  function resizer(element, dimension = "clientWidth") {
  return Generators.observe(notify => {
    let width = notify(element[dimension]);
    const resized = () => {
      let w = element[dimension];
      if (w !== width) notify(width = w);
    };
    window.addEventListener("resize", resized);
    return () => window.removeEventListener("resize", resized);
  });
  };
 const cellA = new Cell(grid.querySelector("[name=a]"));
  const cellB = new Cell(grid.querySelector("[name=b]"));
  const cellC = new Cell(gridB.querySelector("[name=c]"));
  const cellD = new Cell(gridB.querySelector("[name=d]"));
  const cellE = new Cell(gridC.querySelector("[name=e]"));
  const cellF = new Cell(gridC.querySelector("[name=f]"));
 cellA.embed(chartA);
 cellB.embed(chartB);
 update;
 cellC.embed(chartC);
 cellD.embed(chartD);
 cellE.embed(chartE);
 cellF.embed(chartF);
 update1;
 update2;
 // update3;
 $0.value;
}
);
  main.variable(observer()).define(["update3"], function(update3){return(
update3
)});
  return main;
}
