import React from "react";
import FuelQuoteForm from "./components/Quote/FuelQuoteForm"

function App() {
  /* To do's:
   * Gallons requested (numeric, required)
  - Fuel Quote Form with following fields: (We are not building pricing module yet)
  - Gallons Requested (numeric, required)
  - Delivery Address (Non-editable, comes from client profile)
  - Delivery Date (Calender, date picker)
  - Suggested Price / gallon (numeric non-editable, price will be calculated by Pricing Module - we are not building pricing module yet)
  - Total Amount Due (numeric non-editable, calculated (gallons * price))
	
- Fuel Quote History
  - Tabular display of all client quotes in the past. All fields from Fuel Quote are displayed.
  */

  return (
    <div className="App">
      <FuelQuoteForm />
    </div>
  );
}

export default App;
