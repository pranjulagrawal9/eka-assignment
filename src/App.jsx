import { useState } from "react";
import "./App.css";
import { IoIosBackspace } from "react-icons/io";

function App() {
  const [pin, setPin] = useState(new Array(4).fill(""));
  const currPinLength = pin.join("").length;

  function handleNumberPress(key) {
    if (currPinLength >= 4) return;

    const currPin = [...pin];
    currPin[currPinLength] = key;
    setPin(currPin);
  }

  function handleSubmit() {
    if (currPinLength === 4) console.log(pin);
  }

  function handleBackspace() {
    const currPin = [...pin];
    currPin[currPinLength - 1] = "";
    setPin(currPin);
  }

  return (
    <div className="flex justify-center">
      <div className="w-96 mt-10 border-2 p-5">
        <div className="flex flex-col items-center gap-3">
          <h2 className="uppercase font-medium">Enter 4-digit upi pin</h2>
          <div className="flex gap-3">
            {Array(4)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 border border-black rounded-full ${
                    i + 1 <= currPinLength ? "bg-black" : "bg-white"
                  }`}
                ></div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-3 mt-10">
          {Array(9)
            .fill()
            .map((_, i) => (
              <button
                key={i + 1}
                className="border text-center py-2 font-medium"
                onClick={() => handleNumberPress(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          <button
            className="border flex justify-center py-2"
            onClick={handleBackspace}
          >
            <IoIosBackspace size={24} />
          </button>
          <button
            className="border text-center py-2"
            onClick={() => handleNumberPress(0)}
          >
            0
          </button>
          <button
            className="border text-center py-2 font-medium"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
