// https://observablehq.com/@wwj/nsw-dose-coverage-population-and-cases-gapminder@3345
import define1 from "./a33468b95d0b15b0@806.js";
import define2 from "./450051d7f1174df8@254.js";
import define3 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["covid-19-vaccination-local-government-area-lga-28-august-2021.csv",new URL("./files/c9756c93e697b1da6fae4b8895b590674d95b6a3d4afcba9318a3d232408cc916a4ba96f48b44d970ea8728d5ba61851f135da60ddb0aefd62a167f8a9b67ab1",import.meta.url)],["covid-19-vaccination-local-government-area-lga-6-september-2021-covid-19-vaccination-local-government-area-lga.csv",new URL("./files/dfa1c46f1ea36a8fd29ecc342998925c8873bfee9825f046a2546056d284fc11e64616e346655fb4de49c32fc122ae54d0f7fa4586f1b09fd91bc5eb01d287a6",import.meta.url)],["LGA 2016 population statistics@1.csv",new URL("./files/504a594b3a5b6bcfed4723cdc6d215691133c141ed68dc97c114a44d685e4f6c54f54b2bea2288b64fd8fc02b332825d500b081970625adc95ab393d25c2e061",import.meta.url)],["covid-19-vaccination-local-government-area-lga-13-september-2021.csv",new URL("./files/47ae517b3a360dc8bcd5ab06c7be314eb250b2362ed186639dfb0db03e36059edf41aec3c6db65c54b9d8a0fd19b4ea11f153109385dc0b8e87b1298665f207c",import.meta.url)],["covid-19-vaccination-local-government-area-lga-20-september-2021-covid-19-vaccination-local-government-area-lga@2.csv",new URL("./files/a084610eb900c59c961c7efb9946e74c92c8d2a685600c9e049cc6a280338588011b32e7f670a302dd5e26715bc984a2738d695a6ac3f097b3a624690477aef0",import.meta.url)],["covid-19-vaccination-local-government-area-lga-27-september-2021@2.csv",new URL("./files/e5469e90774d4c31986b27677becea98a5f3c4813f848931e62d0d0a4a0272cc64e02419e2d1275fdb004389cda7aecf2ef6280920debe05060046a77faadab0",import.meta.url)],["covid-19-vaccination-local-government-area-lga-4-october-2021@2.csv",new URL("./files/acf20c0e92499157e4ea7da531b42b22ce3eddf697b99a724fc7cd71e88a6b5664df2e6a28c64bab405e518abb4c7d4c5b750f850e415f2d4b28d386b80357ff",import.meta.url)],["covid-19-vaccination-local-government-area-lga-11-october-2021@2.csv",new URL("./files/458b711db41f20c726a66e2a58c0a83637491e47f0370f30d13c352e3b59a563170fb7a97246debf72ae623a1ef4adedf4db05c771fc400830ccb301a27a5422",import.meta.url)],["covid-19-vaccination-local-government-area-lga-18-october-2021.csv",new URL("./files/cbc214446eb8039121dbe092d66876659704931fb0136df7a051ff2b64d47d2d7091ffdb577315bb850028ed8434d31f086b808fd10178304b08efc4c25a6bc8",import.meta.url)],["covid-19-vaccination-local-government-area-lga-25-october-2021.csv",new URL("./files/6874f2fdbeb7db5115b33d2f5829bbdad7723c7170494fe99624b5e0f44fa4c36ad0818085d7ebf4451f1d84e9c57f1419b580936def6f4729273c6e6358b33d",import.meta.url)],["covid-19-vaccination-local-government-area-lga-1-november-2021@2.csv",new URL("./files/4904dbdf3543bb1f8b130348f118e8e21912722859037a34826a23de9ef4b90e4f956117050240fe37bf1830c74843cc50f4c54f57e0b881f0d988191630f6cb",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# NSW Dose coverage, population and Cases Gapminder`
)});
  main.variable(observer("viewof date")).define("viewof date", ["Scrubber","dates"], function(Scrubber,dates){return(
Scrubber(dates, {format: date => date.toLocaleString("en", {month: "long", day: "numeric"}),
    delay: 180,//change the rate as date change
    loop: false,
    initial: 0,
    autoplay: false
  }
)
)});
  main.variable(observer("date")).define("date", ["Generators", "viewof date"], (G, _) => G.input(_));
  main.variable(observer("viewof radius_type")).define("viewof radius_type", ["radio"], function(radio){return(
radio({
  title: 'Dose Selection', 
  options: [
    {label: "Dose1 Vaccination Rates", value: 'dose1' },
    {label: "Dose2 Vaccination Rates", value: 'dose2'},
  ],
  value: 'dose1'
})
)});
  main.variable(observer("radius_type")).define("radius_type", ["Generators", "viewof radius_type"], (G, _) => G.input(_));
  main.variable(observer("legend")).define("legend", ["DOM","html","gapMargin","gapColor"], function(DOM,html,gapMargin,gapColor)
{
  const id = DOM.uid().id;
  return html`<style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  background: var(--color);
}

</style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${gapMargin.left}px;"><div>${gapColor.domain().map(Region => html`<span class="${id}" style="--color: ${gapColor(Region)}">${document.createTextNode(Region)}</span>`)}`;
}
);
  main.variable(observer("gapChart")).define("gapChart", ["d3","width","height","xAxis","yAxis","grid","dataAt","x","y","radius_type","radius","gapColor"], function(d3,width,height,xAxis,yAxis,grid,dataAt,x,y,radius_type,radius,gapColor)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(grid);

  const circle = svg.append("g")
      .attr("stroke", "black")
    .selectAll("circle")
    .data(dataAt(new Date("2021-08-27")), d => d.name)
    .join("circle")
      .sort((a, b) => d3.descending(a.population, b.population))
      .attr("cx", d => x(d.cases))
      .attr("cy", d => y(d[radius_type]))
      .attr("r", d => radius(d.population))
      .attr("fill", d => gapColor(d.region))
      .call(circle => circle.append("title")
        .text(d => [d.name, d.region].join("\n")));

  return Object.assign(svg.node(), {
    update(data) {
        circle.data(data, d => d.name)
          .sort((a, b) => d3.descending(a.population, b.population))
          .attr("cx", d => x(d.cases))
          .attr("cy", d => y(d[radius_type]))
          .attr("r", d => radius(d.population));}

  });
}
);
  main.variable(observer("xAxis")).define("xAxis", ["height","gapMargin","d3","x","width"], function(height,gapMargin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - gapMargin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 50, ","))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", gapMargin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Cases per Region  →"))
)});
  main.variable(observer("yAxis")).define("yAxis", ["gapMargin","d3","y"], function(gapMargin,d3,y){return(
g => g
    .attr("transform", `translate(${gapMargin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -gapMargin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Vaccination Rates %"))
)});
  main.variable(observer("x")).define("x", ["d3","gapMargin","width"], function(d3,gapMargin,width){return(
d3
  .scaleLog()
  .range([1.2*gapMargin.left, width - gapMargin.right])
  .domain([1, 20000])
)});
  main.variable(observer("y")).define("y", ["d3","height","gapMargin"], function(d3,height,gapMargin){return(
d3.scaleLinear([20, 100], [height - gapMargin.bottom, gapMargin.top])
)});
  main.variable(observer("radius")).define("radius", ["d3","width"], function(d3,width){return(
d3.scaleSqrt([0, 5e8], [0, width])
)});
  main.variable(observer("gapColor")).define("gapColor", ["d3","data","gapMyColor"], function(d3,data,gapMyColor){return(
d3.scaleOrdinal(data.map(d => d.region), gapMyColor).unknown("black")
)});
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  main.variable(observer("gapMargin")).define("gapMargin", function(){return(
{top: 20, right: 20, bottom: 35, left: 40}
)});
  main.variable(observer("gapMyColor")).define("gapMyColor", function(){return(
["#9370DB","#e15759"
,"#D2691E","#FFFACD","#f46d43","#2E8B57","#FAEBD7","#9c755f","#3288bd","#af7aa1","#191970","#9e0142","#abdda4","darkgreen","#bab0ab"]
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("currentData")).define("currentData", ["dataAt","date"], function(dataAt,date){return(
dataAt(date)
)});
  main.variable(observer("update")).define("update", ["gapChart","currentData"], function(gapChart,currentData){return(
gapChart.update(currentData)
)});
  main.variable(observer("dates")).define("dates", ["interval","d3","data"], function(interval,d3,data){return(
interval.range(
  d3.min(data, d => {
    return d3.min([
      d.cases[0], 
      d.population[0], 
      d.dose1[0],
      d.dose2[0]
    ], ([date]) => date);
  }),
  d3.min(data, d => {
    return d3.max([
      d.cases[d.cases.length - 1], 
      d.population[d.population.length - 1], 
      d.dose1[d.dose1.length - 1],
      d.dose2[d.dose2.length - 1]
    ], ([date]) => date);
  })
)
)});
  main.variable(observer("grid")).define("grid", ["x","gapMargin","height","y","width"], function(x,gapMargin,height,y,width){return(
g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", gapMargin.top)
        .attr("y2", height - gapMargin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", gapMargin.left)
        .attr("x2", width - gapMargin.right))
)});
  main.variable(observer("valueAt")).define("valueAt", ["bisectDate"], function(bisectDate){return(
function valueAt(values, date) {
  const i = bisectDate(values, date, 0, values.length - 1);
  const a = values[i];
  if (i > 0) {
    const b = values[i - 1];
    const t = (date - a[0]) / (b[0] - a[0]);
    return a[1] * (1 - t) + b[1] * t;
  }
  return a[1];
}
)});
  main.variable(observer("dataAt")).define("dataAt", ["data","valueAt"], function(data,valueAt){return(
function dataAt(date) {
  return data.map(d => ({
    name: d.name,
    region: d.region,
    cases: valueAt(d.cases, date),
    population: valueAt(d.population, date),
    dose1: valueAt(d.dose1, date),
    dose2: valueAt(d.dose2, date)
  }));
}
)});
  main.variable(observer("populationArrayFormer")).define("populationArrayFormer", ["theAreaKeys"], function(theAreaKeys){return(
(inData) => {
  let outPopulationData = [];
  let outData = []
  let obj= {};
  let i =0;
  function whetherAreaExist(inData, d) {
    if (d["Local government area"] in theAreaKeys){
        let obj = {
          "lga_name":d["Local government area"],
          "population":d["Population"]
        }
      outPopulationData.push(obj)
    }
    
  for (const d of inData){
      outData.push(obj);
    }
  }
  return outData;
}
)});
  main.variable(observer("interval")).define("interval", ["d3"], function(d3){return(
d3.utcDay
)});
  main.variable(observer("parseSeries")).define("parseSeries", function(){return(
function parseSeries(series) {
  return series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);
}
)});
  main.variable(observer("bisectDate")).define("bisectDate", ["d3"], function(d3){return(
d3.bisector(([date]) => date).left
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
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
  main.variable(observer("isNA")).define("isNA", function(){return(
function isNA(obj) {
  return obj !== "N/A"
}
)});
  main.variable(observer("transformerLGA")).define("transformerLGA", ["DoseRelatedKeys"], function(DoseRelatedKeys){return(
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
      for(let j=0 ; j < DoseRelatedKeys.length; j++){
        obj[DoseRelatedKeys[j]]= 0;
      }
      obj[d["lga_name19"]] = 1;
      outData.push(obj);
    }
    
  }
  return outData;
}
)});
  main.variable(observer("transformedLGAData")).define("transformedLGAData", ["transformerLGA","updateData"], function(transformerLGA,updateData){return(
transformerLGA(updateData)
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
  main.variable(observer("sumcasesfromFirstDate")).define("sumcasesfromFirstDate", ["sumCases","transformedLGAData"], function(sumCases,transformedLGAData){return(
sumCases(transformedLGAData)
)});
  main.variable(observer("Date0827")).define("Date0827", function(){return(
new Date("2021-08-27")
)});
  main.variable(observer("Date0906")).define("Date0906", function(){return(
new Date("2021-09-06")
)});
  main.variable(observer("Date0913")).define("Date0913", function(){return(
new Date("2021-09-13")
)});
  main.variable(observer("Date0920")).define("Date0920", function(){return(
new Date("2021-09-20")
)});
  main.variable(observer("Date0927")).define("Date0927", function(){return(
new Date("2021-09-27")
)});
  main.variable(observer("Date1004")).define("Date1004", function(){return(
new Date("2021-10-04")
)});
  main.variable(observer("Date1011")).define("Date1011", function(){return(
new Date("2021-10-11")
)});
  main.variable(observer("Date1018")).define("Date1018", function(){return(
new Date("2021-10-18")
)});
  main.variable(observer("Date1025")).define("Date1025", function(){return(
new Date("2021-10-25")
)});
  main.variable(observer("Date1101")).define("Date1101", function(){return(
new Date("2021-11-01")
)});
  main.variable(observer("dateSelecter")).define("dateSelecter", ["transformedLGAData","Date0827","Date0906","Date0913","Date0920","Date0927","Date1004","Date1011","Date1018","Date1025","Date1101"], function(transformedLGAData,Date0827,Date0906,Date0913,Date0920,Date0927,Date1004,Date1011,Date1018,Date1025,Date1101){return(
(d) => {
  // const Date1011 = new Date("2021-10-11");
    let outdata = [];
    let poisition = [];
    for(let i = 0; i<d.length; i++){
      if(transformedLGAData[i]["date"].toISOString() === Date0827.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date0906.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date0913.toISOString()){
        poisition.push(i);
      }
        else if(transformedLGAData[i]["date"].toISOString() === Date0920.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date0927.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date1004.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date1011.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date1018.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date1025.toISOString()){
        poisition.push(i);
      }
      else if(transformedLGAData[i]["date"].toISOString() === Date1101.toISOString()){
        poisition.push(i);
      }
    }
    for (let i=0; i<poisition.length; i++) {
      let obj = {}
    obj = transformedLGAData[poisition[i]]
    outdata.push(obj);
    }
    return outdata;
}
)});
  main.variable(observer("dateArray")).define("dateArray", ["dateSelecter","sumcasesfromFirstDate"], function(dateSelecter,sumcasesfromFirstDate){return(
dateSelecter(sumcasesfromFirstDate)
)});
  main.variable(observer("theAreaKeys")).define("theAreaKeys", ["addKeys","theAreanRegionKeys"], function(addKeys,theAreanRegionKeys){return(
addKeys(theAreanRegionKeys)
)});
  main.variable(observer("rawDoseData0827")).define("rawDoseData0827", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-28-august-2021.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData0906")).define("rawDoseData0906", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-6-september-2021-covid-19-vaccination-local-government-area-lga.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData0913")).define("rawDoseData0913", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-13-september-2021.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData0920")).define("rawDoseData0920", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-20-september-2021-covid-19-vaccination-local-government-area-lga@2.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData0927")).define("rawDoseData0927", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-27-september-2021@2.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData1004")).define("rawDoseData1004", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-4-october-2021@2.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData1011")).define("rawDoseData1011", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-11-october-2021@2.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData1018")).define("rawDoseData1018", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-18-october-2021.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData1025")).define("rawDoseData1025", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-25-october-2021.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseData1101")).define("rawDoseData1101", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("covid-19-vaccination-local-government-area-lga-1-november-2021@2.csv").text(), d3.autoType))
)});
  main.variable(observer("rawDoseOnes0827")).define("rawDoseOnes0827", ["rawDoseData0827","isNA"], function(rawDoseData0827,isNA){return(
rawDoseData0827.filter(
  (d) =>
  d.Jurisdiction === "New South Wales" && isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes0906")).define("rawDoseOnes0906", ["rawDoseData0906","isNA"], function(rawDoseData0906,isNA){return(
rawDoseData0906.filter(
  (d) =>
  d.Jurisdiction === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes0913")).define("rawDoseOnes0913", ["rawDoseData0913","isNA"], function(rawDoseData0913,isNA){return(
rawDoseData0913.filter(
  (d) =>
  d.Jurisdiction === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes0920")).define("rawDoseOnes0920", ["rawDoseData0920","isNA"], function(rawDoseData0920,isNA){return(
rawDoseData0920.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes0927")).define("rawDoseOnes0927", ["rawDoseData0927","isNA"], function(rawDoseData0927,isNA){return(
rawDoseData0927.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes1004")).define("rawDoseOnes1004", ["rawDoseData1004","isNA"], function(rawDoseData1004,isNA){return(
rawDoseData1004.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes1011")).define("rawDoseOnes1011", ["rawDoseData1011","isNA"], function(rawDoseData1011,isNA){return(
rawDoseData1011.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes1018")).define("rawDoseOnes1018", ["rawDoseData1018","isNA"], function(rawDoseData1018,isNA){return(
rawDoseData1018.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes1025")).define("rawDoseOnes1025", ["rawDoseData1025","isNA"], function(rawDoseData1025,isNA){return(
rawDoseData1025.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDoseOnes1101")).define("rawDoseOnes1101", ["rawDoseData1101","isNA"], function(rawDoseData1101,isNA){return(
rawDoseData1101.filter(
  (d) =>
  d["State of Residence"] === "New South Wales"&& isNA(d["Dose 1 % coverage of 15+"]) && isNA(d["Dose 2 % coverage of 15+"])
)
)});
  main.variable(observer("rawDataPopulation")).define("rawDataPopulation", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("LGA 2016 population statistics@1.csv").text(), d3.autoType))
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
  main.variable(observer("addDoseRelatedKeys")).define("addDoseRelatedKeys", function(){return(
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
  main.variable(observer("regionDoserRelater")).define("regionDoserRelater", ["theAreanRegionKeys"], function(theAreanRegionKeys){return(
(inData) => {
    let outData = [];
    let obj = {};
    for (const d of inData) {
      for (let i = 0; i < theAreanRegionKeys.length; i++){
        if (d["name"] === theAreanRegionKeys[i]["name"]){
          let obj = {"name":d["name"],
                "region":theAreanRegionKeys[i]["region"]
                    }
          outData.push(obj);
          break;
        }
      }
  }
  return outData;
}
)});
  main.variable(observer("regionRelatedDose")).define("regionRelatedDose", ["regionDoserRelater","DoseKeys0827"], function(regionDoserRelater,DoseKeys0827){return(
regionDoserRelater(DoseKeys0827)
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
  main.variable(observer("addDoseKeys")).define("addDoseKeys", ["theAreaKeys"], function(theAreaKeys){return(
(inData) => {
    let outData = [];
    let obj = {};
    for (const d of inData) {
      for (let i = 0; i < theAreaKeys.length; i++){
        if (theAreaKeys[i] === d["LGA Name"]){
          let obj = {"name":d["LGA Name"],
                     "Dose1":d["Dose 1 % coverage of 15+"],
                     "Dose2":d["Dose 2 % coverage of 15+"]
                    }
          outData.push(obj);
          // break;
        }
      }
      // outData.push(obj);
  }
  return outData;
}
)});
  main.variable(observer("DoseKeys0827")).define("DoseKeys0827", ["addDoseKeys","rawDoseOnes0827"], function(addDoseKeys,rawDoseOnes0827){return(
addDoseKeys(rawDoseOnes0827)
)});
  main.variable(observer("DoseKeys0906")).define("DoseKeys0906", ["addDoseKeys","rawDoseOnes0906"], function(addDoseKeys,rawDoseOnes0906){return(
addDoseKeys(rawDoseOnes0906)
)});
  main.variable(observer("DoseKeys0913")).define("DoseKeys0913", ["addDoseKeys","rawDoseOnes0913"], function(addDoseKeys,rawDoseOnes0913){return(
addDoseKeys(rawDoseOnes0913)
)});
  main.variable(observer("DoseKeys0920")).define("DoseKeys0920", ["addDoseKeys","rawDoseOnes0920"], function(addDoseKeys,rawDoseOnes0920){return(
addDoseKeys(rawDoseOnes0920)
)});
  main.variable(observer("DoseKeys0927")).define("DoseKeys0927", ["addDoseKeys","rawDoseOnes0927"], function(addDoseKeys,rawDoseOnes0927){return(
addDoseKeys(rawDoseOnes0927)
)});
  main.variable(observer("DoseKeys1004")).define("DoseKeys1004", ["addDoseKeys","rawDoseOnes1004"], function(addDoseKeys,rawDoseOnes1004){return(
addDoseKeys(rawDoseOnes1004)
)});
  main.variable(observer("DoseKeys1011")).define("DoseKeys1011", ["addDoseKeys","rawDoseOnes1011"], function(addDoseKeys,rawDoseOnes1011){return(
addDoseKeys(rawDoseOnes1011)
)});
  main.variable(observer("DoseKeys1018")).define("DoseKeys1018", ["addDoseKeys","rawDoseOnes1018"], function(addDoseKeys,rawDoseOnes1018){return(
addDoseKeys(rawDoseOnes1018)
)});
  main.variable(observer("DoseKeys1025")).define("DoseKeys1025", ["addDoseKeys","rawDoseOnes1025"], function(addDoseKeys,rawDoseOnes1025){return(
addDoseKeys(rawDoseOnes1025)
)});
  main.variable(observer("DoseKeys1101")).define("DoseKeys1101", ["addDoseKeys","rawDoseOnes1101"], function(addDoseKeys,rawDoseOnes1101){return(
addDoseKeys(rawDoseOnes1101)
)});
  main.variable(observer("populationFormater")).define("populationFormater", ["DoseRelatedKeys","dateArray"], function(DoseRelatedKeys,dateArray){return(
(populationData) => {
    let outData = [];
   let populationPerline = []
    let obj = {};
    let innerArr = [];
    let num = 0;
    
    for (const d of populationData) {
      if (DoseRelatedKeys.indexOf(d["Local government area"]) !== -1 ) {
        
        for (let j = 0; j< dateArray.length; j++) {
         innerArr = [dateArray[j]["date"],d["Population"]]
            populationPerline.push(innerArr);
        }
        let obj = {
          "name": d["Local government area"],
          "Population": populationPerline
          // ""
        }
        outData.push(obj);
        populationPerline = []
        
      }
  }
  return outData;
  
}
)});
  main.variable(observer("lgaCases")).define("lgaCases", ["CasesFormater","regionRelatedDose"], function(CasesFormater,regionRelatedDose){return(
CasesFormater(regionRelatedDose)
)});
  main.variable(observer("CasesFormater")).define("CasesFormater", ["dateArray"], function(dateArray){return(
(Cases) => {
    let outData = [];
    let casesPerline = [];
    let innerArr = [];
    let obj= {};
    let i = 0;

  for (const d of Cases) {
    for (let j = 0; j < dateArray.length; ++j) {
      if (dateArray[j][d["name"]] === 0){
        innerArr = [
                dateArray[j]["date"], 0.00001
              ];
              casesPerline.push(innerArr);
      }else{
              innerArr = [
                dateArray[j]["date"], dateArray[j][d["name"]]
              ];
              casesPerline.push(innerArr);
      }
    }
    obj = {
            "name": d["name"],
            "Cases": casesPerline
          }
    outData.push(obj);
    casesPerline = [];
    ++i;
  }
   return outData; 
}
)});
  main.variable(observer("lgaPopulation")).define("lgaPopulation", ["populationFormater","rawDataPopulation"], function(populationFormater,rawDataPopulation){return(
populationFormater(rawDataPopulation)
)});
  main.variable(observer("DoseRelatedKeys")).define("DoseRelatedKeys", ["addDoseRelatedKeys","DoseKeys0827"], function(addDoseRelatedKeys,DoseKeys0827){return(
addDoseRelatedKeys(DoseKeys0827)
)});
  main.variable(observer("lgaDose")).define("lgaDose", ["DoseFormater","regionRelatedDose"], function(DoseFormater,regionRelatedDose){return(
DoseFormater(regionRelatedDose)
)});
  main.variable(observer("DoseFormater")).define("DoseFormater", ["DoseKeys0827","dateArray","DoseKeys0906","DoseKeys0913","DoseKeys0920","DoseKeys0927","DoseKeys1004","DoseKeys1011","DoseKeys1018","DoseKeys1025","DoseKeys1101"], function(DoseKeys0827,dateArray,DoseKeys0906,DoseKeys0913,DoseKeys0920,DoseKeys0927,DoseKeys1004,DoseKeys1011,DoseKeys1018,DoseKeys1025,DoseKeys1101){return(
(Cases) => {
    let outData = [];
    let doses1Perline = [];
    let doses2Perline = [];
    let innerArr = [];
    let obj= {};
    let i = 0;
//form dose according to the date sequence one by one
  for (const d of Cases) {
    if(parseFloat(DoseKeys0827[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[0]["date"], parseFloat(DoseKeys0827[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[0]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0906[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[1]["date"], parseFloat(DoseKeys0906[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[1]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0913[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[2]["date"], parseFloat(DoseKeys0913[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[2]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0920[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[3]["date"], parseFloat(DoseKeys0920[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[3]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0927[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[4]["date"], parseFloat(DoseKeys0927[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[4]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1004[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[5]["date"], parseFloat(DoseKeys1004[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[5]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1011[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[6]["date"], parseFloat(DoseKeys1011[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[6]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1018[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[7]["date"], parseFloat(DoseKeys1018[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[7]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1025[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[8]["date"], parseFloat(DoseKeys1025[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[8]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1101[i]["Dose1"]).toString() !== "NaN"){
      innerArr = [
      dateArray[9]["date"], parseFloat(DoseKeys1101[i]["Dose1"])
      ];
      doses1Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[9]["date"], parseFloat("95.1")
      ];
      doses1Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0827[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[0]["date"], parseFloat(DoseKeys0827[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[0]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0906[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[1]["date"], parseFloat(DoseKeys0906[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[1]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0913[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[2]["date"], parseFloat(DoseKeys0913[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[2]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0920[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[3]["date"], parseFloat(DoseKeys0920[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[3]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys0927[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[4]["date"], parseFloat(DoseKeys0927[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[4]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1004[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[5]["date"], parseFloat(DoseKeys1004[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[5]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1011[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[6]["date"], parseFloat(DoseKeys1011[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[6]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1018[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[7]["date"], parseFloat(DoseKeys1018[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[7]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1025[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[8]["date"], parseFloat(DoseKeys1025[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[8]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }

    if(parseFloat(DoseKeys1101[i]["Dose2"]).toString() !== "NaN"){
      innerArr = [
      dateArray[9]["date"], parseFloat(DoseKeys1101[i]["Dose2"])
      ];
      doses2Perline.push(innerArr);
    }
    else{
      innerArr = [
      dateArray[9]["date"], parseFloat("95.1")
      ];
      doses2Perline.push(innerArr);
    }
    obj = {
            "name": d["name"],
            "Doses1": doses1Perline,
            "Doses2": doses2Perline
          }
    outData.push(obj);
    doses1Perline = [];
    doses2Perline = [];
    ++i;
  }
   return outData; 
}
)});
  main.variable(observer("DataFormater")).define("DataFormater", ["lgaCases","lgaPopulation","lgaDose"], function(lgaCases,lgaPopulation,lgaDose){return(
(inData) => {
    let outData = [];
    let obj= {};
    let i = 0;

  for (const d of inData) {
    let obj = {
      "name":d["name"],
      "region":d["region"],
      "cases":lgaCases[i]["Cases"],
      "population":lgaPopulation[i]["Population"],
      "dose1":lgaDose[i]["Doses1"],
      "dose2":lgaDose[i]["Doses2"]
    }
    outData.push(obj);
  ++i;
  }
    return outData; 
}
)});
  main.variable(observer("data")).define("data", ["DataFormater","regionRelatedDose"], function(DataFormater,regionRelatedDose){return(
DataFormater(regionRelatedDose)
)});
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  main.import("button", child3);
  main.import("select", child3);
  main.import("text", child3);
  main.import("radio", child3);
  main.import("checkbox", child3);
  main.import("number", child3);
  return main;
}
