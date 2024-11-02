import { useId } from "react";
import React from "react";

interface InputBoxProps {
  label: string;
  amount: number;
  onAmountChange: (value: number) => void;
  onCurrencyChange: (currency: string) => void;
  currencyOptions?: string[];
  selectCrrency?: string;
  amountDisable?: boolean;
  currencyDisable?: boolean;
  className?: string;
}

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCrrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}: InputBoxProps) {
  const amountInputId = useId();

  return (
    <div className={`bg-gray-100 p-4 rounded-lg shadow-md text-sm ${className}`}>
      <label htmlFor={amountInputId} className="block text-gray-600 mb-2">
        {label}
      </label>
      
      <div className="flex space-x-2">
        <input
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="number"
          placeholder="Amount"
          id={amountInputId}
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />

        <select
          className="w-1/3 bg-white border border-gray-300 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition"
          value={selectCrrency}
          disabled={currencyDisable}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
