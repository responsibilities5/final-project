import { useState, useEffect } from "react";
import { csv } from "d3";

export const useData = (csvUrl) => {
  const [status, setStatus] = useState({ isLoading: true, data: [] });

  useEffect(() => {
    const row = (d) => {
      d.cases = +d.cases;
      d.confirmed_cases = +d.confirmed_cases;
      d.cofirmed_deaths = +d.confirmed_deaths;
      d.deaths = +d.deaths;
      d.probable_cases = +d.probable_cases;
      d.probable_deaths = +d.probable_deaths;
      return d;
    };

    csv(csvUrl, row).then(
      (data) => {
        setStatus({ isLoading: false, data: data });
      },
      (error) => {
        console.log(error);
      }
    );
  }, [csvUrl]);

  return status;
};
