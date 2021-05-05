import React from "react";

const PlotMap = ({
  data: { counties },
  path,
  rowByCounty,
  colorScale,
  colorValue,
}) => (
  <React.Fragment>
    {counties.features.map((feature, index) => {
      const d = rowByCounty.get(feature.id);

      //console.log(d);

      return (
        <path
          key={index}
          d={path(feature)}
          fill={d ? colorScale(colorValue(d)) : "red"}
        >
          <title>{feature.properties.name}</title>
        </path>
      );
    })}
  </React.Fragment>
);

export default PlotMap;
