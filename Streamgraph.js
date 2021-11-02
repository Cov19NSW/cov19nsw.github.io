// https://observablehq.com/@wwj/nsw-region-covid-19-case-streamgraph@1496
import define1 from "./Observable colour.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# NSW Region COVID-19 CASE Streamgraph`
)});
  main.variable(observer("key")).define("key", ["swatches","color","streamMargin"], function(swatches,color,streamMargin){return(
swatches({color, marginLeft: streamMargin.left, columns: "180px"})
)});
  main.variable(observer("streamChart")).define("streamChart", ["d3","width","height","streamSeries","color","area","streamxAxis"], function(d3,width,height,streamSeries,color,area,streamxAxis)
{  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("path")
    .data(streamSeries)
    .join("path")
      .attr("fill", ({key}) => color(key))
      .attr("d", area)
    .append("title")
      .text(({key}) => key);

  svg.append("g")
      .call(streamxAxis);

  return svg.node();
}
);
  main.variable(observer("streamMargin")).define("streamMargin", function(){return(
{top: 50, right: 20, bottom: 30, left: 20}
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("streamx")).define("streamx", ["d3","data","streamMargin","width"], function(d3,data,streamMargin,width){return(
d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([streamMargin.left, width - streamMargin.right])
)});
  main.variable(observer("streamy")).define("streamy", ["d3","streamSeries","height","streamMargin"], function(d3,streamSeries,height,streamMargin){return(
d3.scaleLinear()
    .domain([d3.min(streamSeries, d => d3.min(d, d => d[0])), d3.max(streamSeries, d => d3.max(d, d => d[1]))])
    .range([height - streamMargin.bottom, streamMargin.top])
)});
  main.variable(observer("streamxAxis")).define("streamxAxis", ["height","streamMargin","d3","streamx","width"], function(height,streamMargin,d3,streamx,width){return(
g => g
    .attr("transform", `translate(0,${height - streamMargin.bottom})`)
    .call(d3.axisBottom(streamx).ticks(width/80).tickSizeOuter(0))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("key1")).define("key1", ["swatches","color","streamMargin"], function(swatches,color,streamMargin){return(
swatches({color, marginLeft: streamMargin.left, columns: "180px"})
)});
  main.variable(observer("TextChart")).define("TextChart", ["md","lastDate"], function(md,lastDate){return(
md`<h2>Total cases in NSW<h2> <h4>Since 2021-07-01 To ${lastDate}<h4>`
)});
  main.variable(observer("TextChartNumber")).define("TextChartNumber", ["md","SUM","d3","now"], function(md,SUM,d3,now)
{
  const q = md`${SUM[0]["sum"]}`;
  q.style.color = d3.interpolateRainbow(now / 1000);
  const p = md `Total cases:<h2>${q}<h2>`;
  return p;
}
);
  main.variable(observer("streamMyColor")).define("streamMyColor", function(){return(
["#abdda4","#778899","#FFFACD", "#e15759", "#bab0ab", "#9c755f","#9370DB", "#af7aa1","#D2691E","darkgreen","#191970", "#2E8B57","#FAEBD7", "#9e0142", "#f46d43","#3288bd"]
)});
  main.variable(observer("data")).define("data", ["transformedLHDData"], function(transformedLHDData){return(
transformedLHDData
)});
  main.variable(observer("streamSeries")).define("streamSeries", ["d3","theKeys","transformedLHDData"], function(d3,theKeys,transformedLHDData){return(
d3.stack()
    .keys(theKeys)
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut)
  (transformedLHDData)
)});
  main.variable(observer("area")).define("area", ["d3","streamx","streamy"], function(d3,streamx,streamy){return(
d3.area()
    .x(d => streamx(d.data.date))
    .y0(d => streamy(d[0]))
    .y1(d => streamy(d[1]))
)});
  main.variable(observer("color")).define("color", ["d3","transformedLHDData","streamMyColor"], function(d3,transformedLHDData,streamMyColor){return(
d3.scaleOrdinal()
    .domain(Object.keys(transformedLHDData[0]).slice(1))
    .range(streamMyColor)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  main.variable(observer("rawData")).define("rawData", function(){return(
fetch('https://data.nsw.gov.au/data/dataset/97ea2424-abaf-4f3e-a9f2-b5c883f42b6a/resource/2776dbb8-f807-4fb2-b1ed-184a6fc2c8aa/download/confirmed_cases_table4_location_likely_source.csv')
)});
  main.variable(observer("rawOnes")).define("rawOnes", ["d3","rawData"], async function(d3,rawData){return(
d3.csvParse(await rawData.text(), d3.autoType)
)});
  main.variable(observer("startDate")).define("startDate", function(){return(
new Date("2021-06-30")
)});
  main.variable(observer("updateData")).define("updateData", ["rawOnes","startDate","isNumber","isNull"], function(rawOnes,startDate,isNumber,isNull){return(
rawOnes.filter(
  (d) => 
    d.notification_date > startDate && isNumber(d.postcode) && isNull(d.lga_code19)
)
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
  main.variable(observer("transformerLHD")).define("transformerLHD", ["theKeys"], function(theKeys){return(
(inData) => {

  let outData = [];

  function findRow(arr, d) {
    for (let i = 0; i < arr.length; i++) {
      // let newStringDate = arr[i]["notification_date"].toString();
      // let originalStringDate = d["notification_date"].toString();
      if (arr[i]["date"].toString() === d["notification_date"].toString()){
        return i;
      }
    }
    return null;
  }
  
  for (const d of inData) {
    
    let rowIndex = findRow(outData, d);
    
//Continue to add key and value from this line
    if (rowIndex !== null) {
//If there is already a same key in this array line, the value increases
      if (d["lhd_2010_name"] in outData[rowIndex]){
        // throw "age group already in row";
        // outData[d["lhd_2010_name"]] ++;
        let obj = {};
        let number = {};
        number[0] = outData[rowIndex][d["lhd_2010_name"]]
        obj[d["lhd_2010_name"]] = number[0] + 1;
        Object.assign(outData[rowIndex], obj);
        // outData.push(obj)
      }
    } 
      //Create a new series of numbers, starting from the date
    else {
      let obj = {
        "date": d["notification_date"],
        // "rowIndex": rowIndex
      };
      for(let j=0 ; j < theKeys.length; j++){
        obj[theKeys[j]]= 0;
      }
      obj[d["lhd_2010_name"]] = 1;
      outData.push(obj);
    }
  }
  return outData;
}
)});
  main.variable(observer("transformedLHDData")).define("transformedLHDData", ["transformerLHD","updateData"], function(transformerLHD,updateData){return(
transformerLHD(updateData)
)});
  main.variable(observer("theKeys")).define("theKeys", function(){return(
["Central Coast", "Correctional settings", "Far West", "Hunter New England", "Illawarra Shoalhaven", "Mid North Coast", "Murrumbidgee","Nepean Blue Mountains", "Northern NSW", "Northern Sydney","Sydney", "South Eastern Sydney","Southern NSW", "South Western Sydney", "Western NSW", "Western Sydney"]
)});
  main.variable(observer("Summarier")).define("Summarier", ["theKeys"], function(theKeys){return(
(inData) => {

  let outData = [];
  let obj = {};
  let sum = 0;
///transformedData
  function SummarierF(inData) {
    for (let i = 0; i < inData.length; i++) {
      for (let j = 0; j < theKeys.length; ++j) {
        sum = sum + inData[i][theKeys[j]];
      }
    }
    obj = {
    "sum": sum
    }
    outData.push(obj);
  }

  // obj = {
  //   "sum": sum
  // }

  SummarierF(inData);
  // outData.push(obj);
  return outData;
}
)});
  main.variable(observer("SUM")).define("SUM", ["Summarier","transformedLHDData"], function(Summarier,transformedLHDData){return(
Summarier(transformedLHDData)
)});
  main.variable(observer("lastDate")).define("lastDate", ["transformedLHDData"], function(transformedLHDData){return(
transformedLHDData[(transformedLHDData.length - 1)].date.toISOString().slice(0, 10)
)});
  return main;
}
