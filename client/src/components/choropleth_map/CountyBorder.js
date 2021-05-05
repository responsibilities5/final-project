import React, { useMemo } from "react";

const CountyBorders = ({ data: { countyBorders, borders }, path }) => (
  <React.Fragment>
    {useMemo(
      () => (
        <React.Fragment>
          <path id="county-border" d={path(countyBorders)}></path>
          {/* <path id="national-border" d={path(nation)}></path> */}
          {/* <path id="state-border" d={path(borders)}></path> */}
        </React.Fragment>
      ),
      [countyBorders, path]
    )}
  </React.Fragment>
);

export default CountyBorders;
