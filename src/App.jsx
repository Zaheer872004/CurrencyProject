import InputBox from "./components/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(); 
  const [from, setFrom] = useState("usd"); 
  const [to, setTo] = useState("inr"); 
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from); // Fetch currency information from our custom hooks

  const options = Object.keys(currencyInfo); // Get all currency options

  const swap = () => {
    // Swap the currencies
    setFrom((prev) => to);
    setTo((prev) => from);
    
    // Swap amounts on currency 
    setAmount(convertedAmount); 
    setConvertedAmount(amount); 
  };

  const convert = () => {
    const rate = currencyInfo[to];
    if (rate) {
      setConvertedAmount(amount * rate); // here calculate the converted amount
    } else {
      console.warn("Conversion rate not available");
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center">
      <div
        className="w-1/2 h-screen flex justify-center items-center bg-cover bg-no-repeat gap-x-1"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      <div
        className="w-1/2 h-screen flex justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="m-6 w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert(); 
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencychange={(currency) => setFrom(currency)}
                onAmountChange={setAmount}
                selectCurrency={from}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap} 
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencychange={(currency) => setTo(currency)}
                selectCurrency={to}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-400 transition-all duration-300 text-white font-bold py-2 rounded-lg shadow-lg"
            >
              Convert {`${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
