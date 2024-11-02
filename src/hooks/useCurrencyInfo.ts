"use client";

import { useState, useEffect } from "react";

interface CurrencyData {
  [key: string]: any; // or you can use more specific types based on the API response structure
}

function useCurrencyInfo(currency: string) {
  const [data, setData] = useState<CurrencyData | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const json = await res.json();
        console.log("API response data:", json);
        setData(json[currency]);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };



    if (currency) {
      fetchData();
    }
  }, [currency]);

  return data;
}

export default useCurrencyInfo;