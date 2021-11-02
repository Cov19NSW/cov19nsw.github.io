// https://observablehq.com/@georgialiu718/nsw-covid-map@2248
import define1 from "./ObservableScrubber.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["LGA 2016 population statistics.csv",new URL("./files/504a594b3a5b6bcfed4723cdc6d215691133c141ed68dc97c114a44d685e4f6c54f54b2bea2288b64fd8fc02b332825d500b081970625adc95ab393d25c2e061",import.meta.url)],["LGANameToCoords.json",new URL("./files/78df2fad3d1f4cfdc736671a4563c2bc7dc735f7274c43a2e4d19d8b9ebe83afe9e3e40491f141b294a2e955c9c5a7a79acd61c7900c2bfd339df972ce703b11",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# New South Wales Coronavirus Daily Cases Map (COVID-19)

This bubble map displays the covid-19 cases for each LGA in NSW daily from july `
)});
  main.variable(observer("viewof day")).define("viewof day", ["Scrubber","dates","data"], function(Scrubber,dates,data){return(
Scrubber(dates.slice(0, data.length), {
  delay: 100,
  loop: false,
  autoplay: false,
  format: d => d.toLocaleDateString()
})
)});
  main.variable(observer("day")).define("day", ["Generators", "viewof day"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["d3","w","h","breakpoint","maxRadius","legendRadii","radius","colorScale","numFormat","sFormat","LGAs","path","data","mutable index","projection","places","html","delay"], function(d3,w,h,breakpoint,maxRadius,legendRadii,radius,colorScale,numFormat,sFormat,LGAs,path,data,$0,projection,places,html,delay)
{
  const svg = d3
    .create("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("viewBox", [0, 0, w, h])
    .attr("class", "italy")
    .on("click", reset);

  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("fill", "#777")
    .attr(
      "transform",
      `translate(${w > breakpoint ? [10, h - 15] : [10, h - 15]})`
    );

  legend
    .append("text")
    .attr("class", "legend-title")
    .text("No. confirmed cases")
    .attr("dy", -maxRadius * 2.9);

  const legendBubbles = legend
    .selectAll("g")
    .data(legendRadii)
    .join("g");

  let margin = 0;
  legendBubbles
    .attr("transform", (d, i) => {
      margin += i === 0 ? 0 : radius(legendBubbles.data()[i - 1]) * 2 + 10;
      return `translate(${margin + radius(d)}, 0)`;
    })
    .append("circle")
    .attr("class", "legend-bubble")
    .attr("fill", d => colorScale(d))
    .attr("cy", d => -radius(d))
    .attr("r", radius);

  legendBubbles
    .append("text")
    .attr("dy", "1.3em")
    .text(w > breakpoint ? numFormat : sFormat);
  
  const g = svg.append("g");
  

  
  g
    .selectAll(".subunit")
    .data(LGAs.features)
    .enter()
    .append("path")
    .attr("class", function(d) {
      return "subunit";
    })
    // .on("click", clicked)
    .attr("d", path);

  const bubble = g
    .selectAll(".bubble")
    .data(data[$0.value])
    .enter()
    .append("circle")
    .attr("transform", function(d) {
      return "translate(" + projection([d.long, d.lat]) + ")";
    })
    .attr("class", "bubble")
    .attr("fill-opacity", 0.5)
    .attr("fill", d => colorScale(+d.totalCase))
    .attr("r", d => radius(+d.totalCase));

  bubble.append("title");

  g
    .selectAll("places")
    .data(places.features)
    .enter()
    .append("circle")
    .attr("class", "place")
    .attr("r", 2.5)
    .attr("transform", function(d) {
      return "translate(" + projection(d.geometry.coordinates) + ")";
    });

  g
    .selectAll(".place-label")
    .data(places.features)
    .enter()
    .append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) {
      return "translate(" + projection(d.geometry.coordinates) + ")";
    })
    .attr("dy", ".35em")
    .text(function(d) {
      return d.properties.name;
    })
    .attr("x", function(d) {
      return d.geometry.coordinates[0] > -1 ? 6 : -6;
    })
    .style("text-anchor", function(d) {
      return d.geometry.coordinates[0] > -1 ? "start" : "end";
    });
  
  const maxZoom = 3;
  const zoom = d3.zoom()
      .scaleExtent([1, maxZoom])
      .on("zoom", zoomed);
  
//   svg.call(zoom);

  function reset() {
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([ - w / 2, h / 2])
    );
  }

  function clicked(d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    d3.event.stopPropagation();
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(w / 2, h / 2)
        .scale(Math.min(maxZoom, 0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.mouse(svg.node()),
      "clicked"
    );
  }

  function zoomed() {
    const {transform} = d3.event;
    if (d3.event.sourceEvent === null) {
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }
  }

  const wrapper = html`<div class="wrapper"></div>`;
  wrapper.append(svg.node());
  

  return Object.assign(wrapper, {
    update(i) {
      const t = svg
        .transition()
        .duration(i === 0 ? 0 : delay)
        .ease(d3.easeLinear);

      bubble
        .data(data[i])
        .call(b => {
          b.transition(t)
            .attr("fill", d => colorScale(+d.totalCase))
            .attr("r", d => radius(+d.totalCase));
        })
        .select("title")
        .text(
          d =>
            `${d.lgaName}: ${numFormat(+d.totalCase)} cases`
        );
     }
  });
  
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`<br><br><br>

## Appendix

*The implementation of this notebook lies below. It is not yet organized or commented.*

---

><br><br><br><br>`
)});
  main.variable(observer("startDate")).define("startDate", function(){return(
new Date("2021-07-01T00:00:00Z")
)});
  main.variable(observer("update1")).define("update1", ["map","index"], function(map,index){return(
map.update(index)
)});
  main.variable(observer("update2")).define("update2", ["mutable index","dates","day"], function($0,dates,day)
{
  $0.value = dates.indexOf(day);
}
);
  main.define("initial index", function(){return(
0
)});
  main.variable(observer("mutable index")).define("mutable index", ["Mutable", "initial index"], (M, _) => new M(_));
  main.variable(observer("index")).define("index", ["mutable index"], _ => _.generator);
  main.variable(observer("projection")).define("projection", ["d3","LGAs"], function(d3,LGAs){return(
d3
  .geoAlbers()
  .rotate([215, 8000])
  .parallels([40, 50])
  .fitExtent([[50, 30], [7000, 6000]], LGAs)
  .translate([-2000, 3700])
)});
  main.variable(observer("update3")).define("update3", ["html"], function(html)
{
  const c = `rgb(255, 255, 255, 0.5)`;
  return html`<style>
form output {
  font-weight: bold;
  font-size: 14px;
}
.wrapper {
  text-align: center;
}
.italy {
  text-anchor: middle;
  font-family: sans-serif;
  font-size: 10px;
  margin: 0 auto;
}
.subunit {
  fill: #f4f4f4;
  fill-opacity: 0.5;
  stroke: #999;
  stroke-width: 0.5
}
.subsubunit {
  fill: #f4f4f4;
  stroke: #999;
  stroke-width: 0.2;
}
.place {
  fill: rgba(0,0,0,0.8);
  stroke: none;
}
.place-label, .legend-title {
  font-weight: bold;
  font-size: 13px;
  fill: rgba(0,0,0,0.8);
}
.place-label {
  text-shadow: ${c} 1px 0px 0px, ${c} 0.540302px 0.841471px 0px,https://duckduckgo.com/?q=miasta+w+polsce+csv&t=lm&atb=v144-1&ia=web ${c} -0.416147px 0.909297px 0px, ${c} -0.989992px 0.14112px 0px, ${c} -0.653644px -0.756802px 0px, ${c} 0.283662px -0.958924px 0px, ${c} 0.96017px -0.279415px 0px;
}
.bubble, .legend-bubble {
  stroke-width: 0.8;
  stroke: rgba(0,0,0,0.3)
}
.bubble:hover {
  stroke: rgba(0,0,0,0.6);
  stroke-width: 1.2;
  cursor: crosshair;
}
.legend text {
  fill: #000;
}
.legend-bubble {
  stroke: rgba(0,0,0,0.4);
}
.legend-title {
  text-anchor: start;
}
</style>`;
}
);
  main.variable(observer("legendRadii")).define("legendRadii", ["maxLegend"], function(maxLegend){return(
[
  10,
  250,
  maxLegend
]
)});
  main.variable(observer("w")).define("w", ["width"], function(width){return(
Math.min(width, 700)
)});
  main.variable(observer("h")).define("h", ["w"], function(w){return(
Math.round(w * 0.8)
)});
  main.variable(observer("maxLegend")).define("maxLegend", ["maxCases","magnitude"], function(maxCases,magnitude){return(
Math.round(maxCases / magnitude) * magnitude
)});
  main.variable(observer("magnitude")).define("magnitude", ["toMagnitude","maxCases"], function(toMagnitude,maxCases){return(
toMagnitude(maxCases)
)});
  main.variable(observer("toMagnitude")).define("toMagnitude", function(){return(
function toMagnitude(n) {
  var order = Math.floor(Math.log(n) / Math.LN10 + 0.000000001);
  return Math.pow(10, order);
}
)});
  main.variable(observer("radius")).define("radius", ["d3","maxCases","maxRadius"], function(d3,maxCases,maxRadius){return(
d3
  .scaleSqrt()
  .domain([0, maxCases])
  .range([0, maxRadius])
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3","maxCases"], function(d3,maxCases){return(
d3
  .scaleSqrt()
  .domain([0, maxCases])
  .range([`hsla(57, 100%, 50%, 0.36)`, `hsla(7, 100%, 50%, 0.57)`])
)});
  main.variable(observer("delay")).define("delay", function(){return(
180
)});
  main.variable(observer("maxCases")).define("maxCases", ["d3","recentData"], function(d3,recentData){return(
d3.max(recentData.map(d => +d.totalCase))
)});
  main.variable(observer("data")).define("data", ["mapDataTransformer","transformedData"], function(mapDataTransformer,transformedData){return(
mapDataTransformer(transformedData)
)});
  main.variable(observer("breakpoint")).define("breakpoint", function(){return(
500
)});
  main.variable(observer("maxRadius")).define("maxRadius", ["w","breakpoint"], function(w,breakpoint){return(
w > breakpoint ? 30 : 18
)});
  main.variable(observer("recentData")).define("recentData", ["data"], function(data){return(
data[data.length - 1]
)});
  main.variable(observer("rawData")).define("rawData", function(){return(
fetch('https://data.nsw.gov.au/data/dataset/97ea2424-abaf-4f3e-a9f2-b5c883f42b6a/resource/2776dbb8-f807-4fb2-b1ed-184a6fc2c8aa/download/confirmed_cases_table4_location_likely_source.csv')
)});
  main.variable(observer("rawOnes")).define("rawOnes", ["d3","rawData"], async function(d3,rawData){return(
d3.csvParse(await rawData.text(), d3.autoType)
)});
  main.variable(observer("isNumber")).define("isNumber", function(){return(
function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
}
)});
  main.variable(observer("isNull")).define("isNull", function(){return(
function isNull(obj) {
  return obj !== null
}
)});
  main.variable(observer("selfStartDate")).define("selfStartDate", function(){return(
new Date("2021-06-30")
)});
  main.variable(observer("updateData")).define("updateData", ["rawOnes","selfStartDate","isNumber","isNull"], function(rawOnes,selfStartDate,isNumber,isNull){return(
rawOnes.filter(
  (d) => 
    d.notification_date > selfStartDate && isNumber(d.postcode) && isNull(d.lga_code19)
)
)});
  main.variable(observer("transformedData")).define("transformedData", ["transformer","updateData"], function(transformer,updateData){return(
transformer(updateData)
)});
  main.variable(observer("sumCases")).define("sumCases", ["theAreaKeys"], function(theAreaKeys){return(
(inData) => {
  let outData = [];
  let arr = [];
  let i =0;
  for (const d of inData){
    // let obj = {"good":d,
    //           "goo2":i};
    
    // outData.push(obj);
    if (outData.length === 0){
      arr = d;
      outData.push(arr);
    }
    else if (outData.length === 1){
      
      for (let j = 0; j < theAreaKeys.length; j++){
        arr = d;
        arr[theAreaKeys[j]] = inData[i][theAreaKeys[j]];
      }
      i++;
      outData.push(arr)
      
    }
    else if (outData.length > 1){
      for (let j =0; j < theAreaKeys.length; j++){
        arr = d;
        arr[theAreaKeys[j]] += inData[i][theAreaKeys[j]];
      }
      i++;
      outData.push(arr);
    }
  }
  return outData;
}
)});
  main.variable(observer("sumcasesfromFirstDate")).define("sumcasesfromFirstDate", ["sumCases","transformedData"], function(sumCases,transformedData){return(
sumCases(transformedData)
)});
  main.variable(observer("mapDataTransformer")).define("mapDataTransformer", ["theAreaKeys","returnCoordsByName"], function(theAreaKeys,returnCoordsByName){return(
(inData) => {
  let outData = [];
  let newline = [];
  let innerObj = {};
  let obj = {};
  // let sumNum = 0
  // let areaSum = [];

  
//sumcasesfromFirstDate 是indata
  for(const d of inData){
    for (let i =0;i< inData.length; i++){
      for (let j = 0; j < theAreaKeys.length; ++j) {
        var name = theAreaKeys[j].toString();
        var coordinate = returnCoordsByName(name);
          innerObj = {
          "date": inData[i]["date"].toJSON(),
          "lgaName": name,
          // "totalCase": areaSum[theAreaKeys[j].toString()].toString(),
           "totalCase":inData[i][theAreaKeys[j]],
          "long":coordinate[0],
          "lat":coordinate[1]
        };
        newline.push(innerObj);
        // innerObj = {};
      }
      outData.push(newline);
      newline = [];
    }
  }
  return outData;
  
}
)});
  main.variable(observer("transformer")).define("transformer", ["theAreaKeys"], function(theAreaKeys){return(
(inData) => {

  let outData = [];
  
  function findRow(arr, d) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["date"].toString() === d["notification_date"].toString()){
        return i;
      }
    }
    return null;
  }

  for (const d of inData) {
    
    let rowIndex = findRow(outData, d)
    
    if (rowIndex !==null){
      if (d["lga_name19"] in outData[rowIndex]){
          let obj = {};
          let number = {};
          number[0] = outData[rowIndex][d["lga_name19"]]
          obj[d["lga_name19"]] = number[0] + 1;
          Object.assign(outData[rowIndex], obj);
          // for (let i =1; i < outData[rowIndex].length; i++){
          //   outData[rowIndex][i] = outData[rowIndex - 1][i] 
          // }
      }
    }
    else
    {
      let obj = {
        "date": d["notification_date"]
      };
      for(let j=0 ; j < theAreaKeys.length; j++){
        obj[theAreaKeys[j]]= 0;
      }
      obj[d["lga_name19"]] = 1;
      outData.push(obj);
    }
    
  }
  return outData;
}
)});
  main.variable(observer("addKeys")).define("addKeys", function(){return(
(inData) => {
    let outData = [];
    let obj = "";
    for (const d of inData) {
      let obj = d["name"]
      outData.push(obj);
  }
  return outData;
}
)});
  main.variable(observer("theAreaKeys")).define("theAreaKeys", ["addKeys","theAreanRegionKeys"], function(addKeys,theAreanRegionKeys){return(
addKeys(theAreanRegionKeys)
)});
  main.variable(observer("addRegionKeys")).define("addRegionKeys", ["rawOnes"], function(rawOnes){return(
(inData) => {
    let outData = [];
    let obj = {};
    for (const d of inData) {
      for (let i = 0; i < rawOnes.length; i++){
        if (rawOnes[i]["lga_name19"] === d["Local government area"]){
          
          let obj = {"name":d["Local government area"],
                "region":rawOnes[i]["lhd_2010_name"]
                    }
          outData.push(obj);
          break;
        }
      }
      // outData.push(obj);
  }
  return outData;
}
)});
  main.variable(observer("theAreanRegionKeys")).define("theAreanRegionKeys", ["addRegionKeys","rawDataPopulation"], function(addRegionKeys,rawDataPopulation){return(
addRegionKeys(rawDataPopulation)
)});
  main.variable(observer("rawDataPopulation")).define("rawDataPopulation", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("LGA 2016 population statistics.csv").text(), d3.autoType))
)});
  main.variable(observer("dateStrings")).define("dateStrings", ["dates"], function(dates){return(
dates.map(
  d =>
    d
      .toISOString()
      .split("T")[0]
)
)});
  main.variable(observer("dates")).define("dates", ["dateRange","startDate"], function(dateRange,startDate){return(
dateRange(startDate, new Date("2021-10-21T00:00:00Z"))
)});
  main.variable(observer("dateRange")).define("dateRange", function(){return(
function dateRange(start, end) {
  const duration = 1000 * 60 * 60 * 24;
  const dates = [];
  let ms = start * 1;
  while (ms < end * 1) {
    dates.push(new Date(ms));
    ms += duration;
  }
  return dates;
}
)});
  main.variable(observer("LGAs")).define("LGAs", ["topojson","nsw"], function(topojson,nsw){return(
topojson.feature(nsw, nsw.objects.LGAs)
)});
  main.variable(observer("places")).define("places", function(){return(
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Sydney" },
      geometry: { type: "Point", coordinates: [151.2073, -33.8678] }
    },
    {
      type: "Feature",
      properties: { name: "Central Coast" },
      geometry: { type: "Point", coordinates: [151.3493, -33.4365] }
    },
   
    {
      type: "Feature",
      properties: { name: "North Sydney" },
      geometry: { type: "Point", coordinates: [151.2072, -33.839] }
    },
    {
      type: "Feature",
      properties: { name: "Murrumbidgee" },
      geometry: { type: "Point", coordinates: [145.8804, -34.8039] }
    },
    {
      type: "Feature",
      properties: { name: "Wollodilly" },
      geometry: { type: "Point", coordinates: [150.8333, -34.05] }
    },
    {
      type: "Feature",
      properties: { name: "Lithgow" },
      geometry: { type: "Point", coordinates: [149.8401, -31.8595] }
    },
    {
      type: "Feature",
      properties: { name: "Liverpool" },
      geometry: { type: "Point", coordinates: [150.9333, -33.9] }
    },
    {
      type: "Feature",
      properties: { name: "Blacktown" },
      geometry: { type: "Point", coordinates: [150.9136, -33.8015] }
    },
    {
      type: "Feature",
      properties: { name: "The Hills" },
      geometry: { type: "Point", coordinates: [150.9773, -33.6049]  }
    },
    {
      type: "Feature",
      properties: { name: "Blue Mountains" },
      geometry: { type: "Point", coordinates: [150.1800, -33.4200]  }
    },
    {
      type: "Feature",
      properties: { name: "Hawkesbury" },
      geometry: { type: "Point", coordinates: [150.8609, -33.2263]  }
    },
    
  ]
}
)});
  main.variable(observer("sFormat")).define("sFormat", ["d3"], function(d3){return(
d3.format(".1s")
)});
  main.variable(observer("numFormat")).define("numFormat", ["d3"], function(d3){return(
d3.format(",")
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath().projection(projection)
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("geojson_nsw")).define("geojson_nsw", ["d3"], function(d3){return(
d3.json("https://data.gov.au/geoserver/nsw-local-government-areas/wfs?request=GetFeature&typeName=ckan_f6a00643_1842_48cd_9c2f_df23a3a1dc1e&outputFormat=json")
)});
  main.variable(observer("topology")).define("topology", ["require"], function(require){return(
require("topojson-server@3")
)});
  main.variable(observer("nsw")).define("nsw", ["topology","geojson_nsw"], function(topology,geojson_nsw){return(
topology.topology({LGAs:geojson_nsw},1e4)
)});
  main.variable(observer("extractNames")).define("extractNames", ["nsw"], function(nsw){return(
function extractNames (){
  var LGAs = nsw.objects.LGAs.geometries.filter(function(el){
  return el.properties.nsw_lga__3 != "UNINCORPORATED";
});
  var result = [];
  for(var item, i = 0; item = LGAs[i++];){
    var name = item.properties.nsw_lga__3;
  
    result.push(name.toLowerCase());
    
  }
  return result;
}
)});
  main.variable(observer("lga_names")).define("lga_names", ["extractNames"], function(extractNames){return(
extractNames()
)});
  main.variable(observer("LGANameToCoords")).define("LGANameToCoords", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("LGANameToCoords.json").json()
)});
  main.variable(observer("returnCoordsByName")).define("returnCoordsByName", ["LGANameToCoords"], function(LGANameToCoords){return(
function returnCoordsByName(name){
const regex = /^(\w+( |-)?)+\w+/gm;
const found = name.match(regex)[0].toLowerCase();

  var entry = LGANameToCoords.filter(obj => {
    return obj.lganame == found.toLowerCase();
  });
  var long = entry[0]?.coordinate[0];
  var lat = entry[0]?.coordinate[1];
  return [long,lat];
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
