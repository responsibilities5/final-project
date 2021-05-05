import React from "react";
import {
  geoAlbersUsa,
  geoPath,
  scaleSequential,
  interpolateBlues,
  max,
  min,
  mean,
} from "d3";
import { useMapData } from "./useMapData";
import PlotMap from "./PlotMap";
import CountyBorders from "./CountyBorder";
import { useData } from "./useData";

const ChoroplethFC = () => {
  const jsonUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
  const csvUrl =
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv";

  const { isLoading, data } = useMapData(jsonUrl);
  const covidData = useData(csvUrl);

  const width = 1200;
  const height = 600;

  const margin = { top: 20, bottom: 50, left: 30, right: 150 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const projection = geoAlbersUsa().translate([width / 2, height / 2]);

  const path = geoPath(projection);

  const colorValue = (d) => {
    //console.log(d.date);
    return d.cases;
  };

  const rowByCounty = new Map();

  covidData.data.forEach((d) => rowByCounty.set(d.fips, d));

  // prettier-ignore

  const colorScale = scaleSequential(interpolateBlues).domain([min(covidData.data, colorValue), mean(covidData.data, colorValue)]);

  return (
    <React.Fragment>
      {isLoading || covidData.isLoading ? (
        <React.Fragment>
          <h2>Loading Data...</h2>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {/* <path id="nation" d={path(data.nation)}></path> */}
              <PlotMap
                data={data}
                path={path}
                colorScale={colorScale}
                colorValue={colorValue}
                rowByCounty={rowByCounty}
              />
              <path id="state-border" d={path(data.borders)}></path>
              <CountyBorders data={data} path={path} />
            </g>
          </svg>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChoroplethFC;
