import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { IoIosBackspace } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";

function App() {
  const [keyPadNumbers, setKeyPadNumbers] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [pin, setPin] = useState(new Array(4).fill(""));
  const [totalDigits, setTotalDigits] = useState(4);

  const handleNumberPress = useCallback(
    function handleNumberPress(key) {
      if (pin.join("").length >= totalDigits) return;
      const currPin = [...pin];
      currPin[pin.join("").length] = Number(key);
      setPin(currPin);
    },
    [pin, totalDigits]
  );

  const handleSubmit = useCallback(
    function handleSubmit() {
      if (pin.join("").length === totalDigits) console.log(pin);
    },
    [pin, totalDigits]
  );

  const handleBackspace = useCallback(
    function handleBackspace() {
      if (pin.join("").length > 0) {
        const currPin = [...pin];
        currPin[pin.join("").length - 1] = "";
        setPin(currPin);
      }
    },
    [pin]
  );

  function handleInputBox(e) {
    const digits = Number(e.target.value);
    if (digits > 8) return;
    setTotalDigits(digits);
  }

  function handleEnter(e) {
    e.stopPropagation();
    if (e.key === "Enter") {
      setPin(new Array(totalDigits).fill(""));
    }
  }

  function handleRandomize() {
    const newKeypadArray = [...keyPadNumbers];
    newKeypadArray.sort(() => Math.random() - 0.5);
    setKeyPadNumbers(newKeypadArray);
  }

  useEffect(() => {
    function handleKeyboard(e) {
      if (!isNaN(e.key)) {
        handleNumberPress(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    }

    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleNumberPress, handleBackspace, handleSubmit]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        className="border-2"
        value={totalDigits}
        onChange={handleInputBox}
        onKeyDown={handleEnter}
      />
      <div className="w-96 mt-10 border-2 p-5">
        <div className="bg-gray-200 flex justify-between p-2 mb-20 font-medium">
          <div>
            <div>To:</div>
            <div>Sending:</div>
          </div>
          <div>
            <div>SANKALP GULATI</div>
            <div className="text-right">₹ 500.00</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h2 className="uppercase font-medium">
            Enter {pin.length}-digit upi pin
          </h2>
          <div className="flex gap-4">
            {pin.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 border border-black rounded-full ${
                  i + 1 <= pin.join("").length ? "bg-black" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-yellow-100 rounded-md p-1 mt-14">
          <FaExclamationCircle size={34} color="orange" />

          <p>You are sending ₹ 500.00 from your account to SANKALP GULATI</p>
        </div>

        <button
          className="bg-gray-200 p-2 rounded-md ml-5 mt-10"
          onClick={handleRandomize}
        >
          Randomize Keyboard
        </button>

        <div className="grid grid-cols-3 mt-10 text-lg">
          {keyPadNumbers.map((value, i) => (
            <button
              key={i}
              className={`border text-center py-2 font-medium ${
                i === 0 ? "col-start-2 col-end-3 row-start-4" : ""
              }`}
              onClick={() => handleNumberPress(i)}
            >
              {value}
            </button>
          ))}
          <button
            className="border flex justify-center py-2 row-start-4 col-start-1"
            onClick={handleBackspace}
          >
            <IoIosBackspace size={24} />
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
