# Currency Converter 

## CUSTOM HOOKS
LET START 
---

Code Structure

Here’s an overview of what each section of the code does:

1. "use client";

This line tells Next.js that this code should run on the client side (in the user's browser), not on the server.


2. import { useState, useEffect } from "react";

We’re importing two hooks:

useState: Allows us to store data, like currency info, that might change over time.

useEffect: Lets us run code when the component loads or when certain values change.



3. interface CurrencyData { [key: string]: number; }

This defines the structure of CurrencyData in TypeScript, where:

Each key is a string (like "usd" or "eur") representing a currency.

Each value is a number representing the conversion rate.



For example, CurrencyData could look like { usd: 0.012, eur: 0.011 }.

4. function useCurrencyInfo(currency: string)

Here, we're creating a custom hook named useCurrencyInfo, which will:

Fetch currency conversion data.

Make it available to any component that uses this hook.



The hook accepts a currency argument, which should be a currency code like "inr" or "usd". This argument tells the API which currency data we need.

5. const [data, setData] = useState<CurrencyData | null>(null);

Using useState, we create a data variable to hold the currency data, starting with null.

setData is the function we use to update data once we have fetched the currency info.


6. useEffect(() => { ... }, [currency]);

The useEffect hook runs the fetch function whenever the component loads or when currency changes.


7. const fetchData = async () => { ... }

We define an async function fetchData to fetch currency data.

Inside fetchData:

We use fetch to call the API endpoint for the specified currency (e.g., https://cdn.jsdelivr.net/.../inr.json).

The response is parsed to JSON format.

We then set data to the specific currency rates.



8. return data;

The hook returns the data, allowing any component using this hook to access the fetched currency data.


9. export default useCurrencyInfo;

Finally, we export useCurrencyInfo so it can be used in other parts of the project.



---

Real-World Example of Using This Hook

Imagine you’re creating a currency converter. You want users to type a currency code (like "usd") into an input box, and then see conversion rates to other currencies, such as INR or EUR. This custom hook makes it easy to get and display these conversion rates.





# INPUTBOX

InputBoxProps Interface Breakdown

Let's go through each property in InputBoxProps and understand why some of them are optional (?) and what they’re used for.

1. label: string

Type: Required

Purpose: This is the text label that appears above the input field, describing what the input is for.

Example: "Enter Amount"



2. amount: number

Type: Required

Purpose: Holds the numeric value for the input, which represents an amount.

Example: 100



3. onAmountChange: (value: number) => void

Type: Required

Purpose: A function that gets called when the amount in the input box changes, passing the new amount as an argument.

Example: (value) => setAmount(value)



4. onCurrencyChange: (currency: string) => void

Type: Required

Purpose: A function that gets called when the currency selection changes, passing the new currency value.

Example: (currency) => setCurrency(currency)



5. currencyOptions?: string[]

Type: Optional (string[] is an array of strings)

Purpose: Provides a list of available currency options for the dropdown (like USD, EUR, etc.). If omitted, the component could use a default or assume there are no options to display.

Why Optional: Not all use cases may need a currency dropdown (e.g., if there's only one currency option), so this gives flexibility.

Example: ["usd", "eur", "inr"]



6. selectCrrency?: string

Type: Optional

Purpose: Sets the currently selected currency in the dropdown. If omitted, the component could use a default currency.

Why Optional: It’s optional to allow flexibility for the component to use a default (like USD) if no initial currency is provided.

Example: "usd"



7. amountDisable?: boolean

Type: Optional

Purpose: Disables the amount input field when true, preventing users from changing the amount.

Why Optional: Sometimes you may want to lock the amount input (e.g., if the amount is fixed), so this allows that flexibility without enforcing it.

Example: true



8. currencyDisable?: boolean

Type: Optional

Purpose: Disables the currency dropdown when true, preventing users from selecting a different currency.

Why Optional: In some cases, you may want the currency to stay fixed and not be selectable, so this allows you to set that without requiring it.

Example: true



9. className?: string

Type: Optional

Purpose: Allows custom CSS classes to be added to the component for additional styling or layout adjustments.

Why Optional: It gives flexibility for styling without requiring every instance to have extra styling.

Example: "mb-4"




## Why Use Optional Properties?

1. Flexibility: Optional properties let you customize only what’s necessary, without needing to provide every prop each time.


2. Reusability: With optional properties, a single component can adapt to different situations, making it more reusable across different parts of the app.


3. Defaults: Optional properties can allow a component to use sensible defaults when a prop isn’t provided, simplifying code for common cases.



Real-World Example Using InputBoxProps

Imagine you’re building a currency converter app. You may want to use the InputBox component in different parts of the app, sometimes allowing users to edit all fields, and other times locking certain options.

1. Case 1: Basic Usage for Editing Amount and Currency

Here, all fields are editable, so you would pass only the required props and optionally currencyOptions.


<InputBox
  label="Amount"
  amount={100}
  onAmountChange={(value) => setAmount(value)}
  onCurrencyChange={(currency) => setCurrency(currency)}
  currencyOptions={["usd", "eur", "inr"]}
/>


2. Case 2: Locked Currency, Editable Amount

In this example, the currency is set to "usd" and cannot be changed by the user.


<InputBox
  label="Amount in USD"
  amount={100}
  onAmountChange={(value) => setAmount(value)}
  onCurrencyChange={(currency) => setCurrency(currency)}
  selectCrrency="usd"
  currencyDisable={true}
/>


3. Case 3: Display Only (All Fields Disabled)

For example, in a summary screen, you may want to display the amount and currency but prevent the user from editing them.


<InputBox
  label="Total Amount"
  amount={200}
  onAmountChange={() => {}}
  onCurrencyChange={() => {}}
  selectCrrency="eur"
  amountDisable={true}
  currencyDisable={true}
/>



In these examples:

Case 1 uses optional props (currencyOptions).

Case 2 makes use of currencyDisable to lock the currency.

Case 3 disables both fields, showing how optional properties allow for flexible use cases without modifying the core InputBox component.


Summary

Optional properties in TypeScript interfaces let you decide which properties are needed for a specific instance of a component, enhancing flexibility and reusability. They allow the component to handle different scenarios—like displaying, locking, or enabling/disabling fields based on the context—without requiring every property every time.


This code defines a React component called InputBox. It’s designed as a reusable input field with a label, an amount input, and a currency dropdown. Here’s a breakdown of how it works:

Code Breakdown

1. Imports

import { useId } from "react";
import React from "react";

useId: A hook that generates a unique ID for each component instance, which is useful for linking input fields with labels.

React: The core React library is imported for JSX support.



2. Interface InputBoxProps

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

Defines props (properties) for InputBox:

label: Text label for the input box (e.g., "Amount").

amount: The numeric amount to display in the input field.

onAmountChange: Function to call when the amount changes.

onCurrencyChange: Function to call when the selected currency changes.

currencyOptions: Optional array of currency options (e.g., ["usd", "eur", "inr"]).

selectCrrency: The selected currency option, defaulting to "usd".

amountDisable: Boolean to control whether the amount input is disabled.

currencyDisable: Boolean to control whether the currency dropdown is disabled.

className: Optional additional class names for custom styling.




3. InputBox Component

function InputBox({ ... }: InputBoxProps) { ... }

Destructures props from InputBoxProps and sets default values if some are not provided.



4. Unique ID for Amount Input

const amountInputId = useId();

useId generates a unique ID for the amount input, which is also used in the label to ensure accessibility.



5. Component Structure

<div className={bg-gray-100 p-4 rounded-lg shadow-md text-sm ${className}}>
  ...
</div>

This div wraps the entire InputBox with some styling, including a gray background, padding, and rounded corners.

className allows additional styling to be added from parent components.



6. Label

<label htmlFor={amountInputId} className="block text-gray-600 mb-2">
  {label}
</label>

Uses the htmlFor attribute with amountInputId to connect the label with the input field, enhancing accessibility.



7. Amount Input

<input
  type="number"
  placeholder="Amount"
  id={amountInputId}
  disabled={amountDisable}
  value={amount}
  onChange={(e) => onAmountChange(Number(e.target.value))}
/>

type="number": Ensures only numbers can be entered.

disabled={amountDisable}: Disables the input if amountDisable is true.

value={amount}: Sets the input value to the amount prop.

onChange: Calls onAmountChange with the new amount whenever the input changes.



8. Currency Dropdown

<select
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

value={selectCrrency}: Sets the selected currency.

disabled={currencyDisable}: Disables the dropdown if currencyDisable is true.

onChange: Calls onCurrencyChange with the new currency whenever a different option is selected.

currencyOptions.map: Renders an <option> for each currency in currencyOptions, displaying the uppercase version of the currency.





---








# ADDITIONAL PART 




Explanation of the <option> Element Inside map()

<option key={currency} value={currency}>:

key={currency}:

The key prop is required in React when rendering lists to uniquely identify each element.

React uses keys to track which items have changed, been added, or removed, which helps optimize rendering performance.

In this case, currency is used as the key, which should be unique for each item in currencyOptions.


value={currency}:

The value attribute sets the value of the <option> element.

When a user selects this option, the value (in this case, the currency code like "usd") will be sent to the onCurrencyChange handler function.


{currency.toUpperCase()}:

{currency.toUpperCase()} is used to display the currency code in uppercase (e.g., "USD" instead of "usd").

This makes the displayed currency code more readable for the user.




Putting It All Together: Example

Let’s say currencyOptions is ["usd", "eur", "inr"]. The map function will loop through each item and generate the following HTML structure:

<select>
  <option key="usd" value="usd">USD</option>
  <option key="eur" value="eur">EUR</option>
  <option key="inr" value="inr">INR</option>
</select>



Example: Why React Needs a key

Imagine if you had a list of currencies like ["usd", "eur", "inr"], and later you change it to ["usd", "gbp", "inr"]. With unique keys (key="usd", key="gbp", etc.), React can tell that "eur" was removed and "gbp" was added, so it only updates those specific items in the DOM. Without keys, React would have to re-render the whole list, which is less efficient.





# App.tsx 
This code creates a currency converter app with a user-friendly interface where users can enter an amount, select two currencies, and get the converted amount. Let’s go through it step-by-step, using real-world examples to make it simple and easy to understand.

Code Walkthrough

1. Import Statements:

useState (React): Manages state, or the data that can change, in the component.

InputBox: A custom component for user input fields. It lets users enter an amount and select a currency.

useCurrencyInfo: A custom hook that fetches exchange rates for the selected currency.

Image (Next.js): For displaying images efficiently.

cc1: An image used as a background.




Component Function (App)

2. State Variables:

amount: Stores the amount the user wants to convert (e.g., 10 USD).

from: The "from" currency code (default is "usd").

to: The "to" currency code (default is "pkr").

convertAmount: Holds the converted amount based on the exchange rate.



3. Fetch Exchange Rates:

currencyInfo: Uses useCurrencyInfo(from) to get the latest exchange rates for the "from" currency.

options: Checks if currencyInfo has data. If yes, it gets all available currency codes, like ["usd", "eur", "inr", ...], which are shown in dropdowns for currency selection.

For Example:

const currencyInfo = useCurrencyInfo(from);

This line uses a custom hook called useCurrencyInfo to get currency data. The from variable (e.g., "usd") is passed as an argument to useCurrencyInfo, which then fetches exchange rates for the "from" currency.

For example, if from is "usd," currencyInfo might contain data like this:

{
  "pkr": 278.5,
  "eur": 0.91,
  "inr": 83.6,
  // other currencies
}

Each key in this object represents another currency and its exchange rate to the "from" currency (e.g., 1 USD = 278.5 PKR).

const options = currencyInfo ? Object.keys(currencyInfo) : [];

This line creates an array called options, which lists all available currency options from currencyInfo.

Object.keys(currencyInfo) gets the names of the currencies as an array of strings, such as ["pkr", "eur", "inr"].

If currencyInfo is null or undefined, the fallback ([]) is an empty array.


So, options provides a list of currency codes (like PKR, EUR, INR) that the user can choose from.



4. Swap Function (swap):

This function swaps the from and to currencies, making it easier for users to reverse conversions.

It also swaps the amount and convertAmount values to keep the input consistent after the swap.


Let's break down each part of this code in a simple way.



 const swap = () => { ... };

The swap function is a simple way to switch the "from" and "to" currencies. Here’s what each line does:

setFrom(to);: Sets the "from" currency to be the current "to" currency.

setTo(from);: Sets the "to" currency to be the current "from" currency.

setConvertAmount(amount);: Updates convertAmount (the converted value) to match the amount value.

setAmount(convertAmount);: Updates amount to be equal to the convertAmount.


In short, this function reverses the conversion direction. For example, if you’re converting USD to PKR, clicking "swap" will switch to PKR to USD.





5. Convert Function (convert):

Calculates the conversion when called. If the exchange rate for the to currency is available, it multiplies the amount by the exchange rate and updates convertAmount.

If no data is available, it logs an error (e.g., if the currency data is unavailable).

For Example:
 const convert = () => { ... };

The convert function calculates the converted amount based on the currencyInfo data. Here’s what it does:

if (currencyInfo && currencyInfo[to]): Checks that currencyInfo exists and contains the target currency (to). If not, an error message is displayed.

setConvertAmount(amount * currencyInfo[to]);: Multiplies the input amount by the exchange rate for the target currency (currencyInfo[to]) to get the converted value, and then updates convertAmount with this result.


For example, if you’re converting 10 USD to PKR, and currencyInfo["pkr"] is 278.5, then:

convertAmount = 10 * 278.5; // convertAmount will be set to 2785

If the currency data for to doesn’t exist, an error message is displayed. This helps handle cases where a currency might not be supported.



Real-World Analogy:

Imagine you want to know how much 10 USD is in PKR. After seeing the result, you want to check how much the same amount of PKR is in USD. The swap button automates this by switching the two currencies with a click



JSX Structure (What’s Displayed)

6. Background Image:

Displays a background image (cc1) that covers the whole screen, providing a visually appealing backdrop for the converter.



7. Currency Converter Form:

Form Layout: The form appears in the center of the screen with a semi-transparent white background.



8. Title:

Displays a header with the text "Currency Converter" in a bold, large font at the top.



9. "From" Input Box:

Uses the InputBox component to let the user enter an amount and select a "from" currency

Sure! Let’s break down this part of the code in detail:

Code Snippet

<form
  onSubmit={(e) => {
    e.preventDefault();
    convert();
  }}
>

Explanation

1. <form> Tag:

This is an HTML form element that allows users to input data. In this case, it is used to collect the amount of money and the currencies for conversion (from and to).



2. onSubmit Event Handler:

onSubmit is an event handler in React that listens for the form submission event, which occurs when a user clicks the submit button (in this case, the button labeled "Convert").

When the form is submitted, the function provided as the value of onSubmit will be executed.



3. The Arrow Function (e) => { ... }:

This is an arrow function that takes a single argument e, which represents the event object for the form submission.

The event object contains information about the event that occurred, such as what triggered the event (in this case, the form being submitted).



4. e.preventDefault();:

This line prevents the default behavior of the form submission.

By default, submitting a form in a web page would cause the page to reload or navigate to a new URL, which is usually not desired in single-page applications (like those built with React).

Calling e.preventDefault() stops that default behavior, allowing the developer to define what should happen instead (in this case, calling the convert function).



5. convert();:

After preventing the default behavior, this line calls the convert function defined earlier in the code.

The convert function is responsible for taking the input amount and converting it based on the selected currencies.

This function will perform the conversion and update the state of the application with the converted amount.




Real-World Example

Imagine you're using an online currency converter. You enter an amount, select a currency to convert from (e.g., USD), and choose a currency to convert to (e.g., EUR). You then click the "Convert" button.

When you click "Convert," the onSubmit handler runs:

It prevents the page from refreshing (which would lose your input).

It calls the convert function to calculate how much your input amount in USD is worth in EUR using the current exchange rates.

# In Summary

This part of the code allows the form to submit without reloading the page, ensuring a smooth user experience. Instead of traditional form submission, it handles the input dynamically by calling the convert function directly, which processes the currency conversion logic. This is a common practice in React applications to keep everything within the same page and to manage the state more effectively.



onCurrencyChange: Updates the from currency whenever the user selects a different option.

onAmountChange: Updates amount when the user enters a new value.



10. Swap Button:

Button in the middle with a swap icon. Clicking it switches the from and to currencies.

Styled with hover effects for a better user experience.



11. "To" Input Box:

Another InputBox component to display the converted amount.

Since this field shows the result, amountDisable is set to true, making it uneditable.



12. Convert Button:

Triggers the currency conversion when clicked.

Converts the amount from the "from" currency to the "to" currency using the exchange rate.




Real-World Analogy

Imagine you’re traveling from the U.S. to Pakistan. You want to know how much money to take in Pakistani rupees (PKR). You enter the amount in USD (the "from" currency), select PKR as the "to" currency, and click "Convert" to see the equivalent in PKR. Later, if you want to reverse the calculation, you can click the "Swap" button, and the app will flip the currencies for you.

Summary

In simple terms, this app:

Lets users select two currencies and an amount to convert.

Uses a background image and styled components to create a polished look.

Allows users to swap between currencies easily.

Fetches real-time exchange rates to provide accurate conversions.


This app could be useful for travelers, international shoppers, or anyone who needs quick currency conversions on the go!