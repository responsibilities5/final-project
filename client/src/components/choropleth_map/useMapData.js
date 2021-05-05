import { useEffect, useState } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson-client";

export const useMapData = (jsonUrl) => {
  const [status, setStatus] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    json(jsonUrl).then(
      (topoJsonData) => {
        const { states, counties, nation } = topoJsonData.objects;

        setStatus({
          isLoading: false,
          data: {
            states: feature(topoJsonData, states),
            counties: feature(topoJsonData, counties),
            borders: mesh(topoJsonData, states, (a, b) => a !== b),
            countyBorders: mesh(topoJsonData, counties, (a, b) => a !== b),
            nation: mesh(topoJsonData, nation, (a, b) => a !== b),
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [jsonUrl]);

  return status;
};
