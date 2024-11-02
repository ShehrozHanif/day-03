
"use client";

import { useState } from "react";
import { InputBox } from "@/components";
import useCurrencyInfo from "@/hooks/useCurrencyInfo";
import cc1 from "../image/cc1.jpg";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertAmount, setConvertAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertAmount(amount);
    setAmount(convertAmount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertAmount(amount * currencyInfo[to]);
    } else {
      console.error("Currency data for selected currency is unavailable.");
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* Background image covering the entire screen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cc1.src})` }}
      >
        {/* Optionally add an overlay here for better contrast */}
      </div>

      {/* Centered calculator */}
      <div className="flex justify-center items-center h-full">
        <div className="w-11/12 md:w-2/5 p-6 md:p-8 bg-white bg-opacity-70 rounded-lg shadow-lg relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
              Currency Converter
            </h1>

            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCrrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full flex flex-col items-center my-4">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transform transition hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={swap}
                aria-label="Swap currencies"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M17.65 6.35a.5.5 0 0 0-.85.35V8H6.5a.5.5 0 0 0 0 1H16.8v1.3a.5.5 0 0 0 .85.35l2.5-2.5a.5.5 0 0 0 0-.7l-2.5-2.5zM6.35 17.65a.5.5 0 0 0 .85-.35V16h10.15a.5.5 0 0 0 0-1H7.2v-1.3a.5.5 0 0 0-.85-.35l-2.5 2.5a.5.5 0 0 0 0 .7l2.5 2.5z" />
                </svg>
              </button>
              <p className="text-sm text-blue-500 font-semibold mt-1">Swap</p>
            </div>

            <div className="w-full mb-6">
              <InputBox
                label="To"
                amount={convertAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCrrency={to}
                amountDisable
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-200 shadow-md"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
