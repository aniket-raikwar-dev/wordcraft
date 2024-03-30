import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";

const Quote = () => {
  const [quoteData, setQuoteData] = useState({});
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        params: { category: "inspirational" },
        headers: {
          "X-Api-Key": "GpDrMw6pC3Ve7IAxPcTOeg==h5iih3JRIM3M1qMH",
        },
      });
      setQuoteData(response.data[0]);
    } catch (error) {
      console.log("error: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuote();
    const intervalId = setInterval(() => {
      getQuote();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="quote-div">
      <div className="flex item-center">
        <p className="new-foll-text">Quote of the Day</p>
      </div>
      {loading ? (
        <Skeleton paragraph={{ rows: 3 }} active />
      ) : (
        <div className="quote-content">
          <h3 className="quote-text">
            "
            {quoteData?.quote?.length >= 200
              ? quoteData?.quote?.slice(0, 100)
              : quoteData?.quote}
            "
          </h3>
          <div className="flex justify-end w-full">
            <h3 className="quote-writer">- {quoteData.author}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quote;
