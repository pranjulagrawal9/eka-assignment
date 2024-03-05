import "./App.css";

function App() {
  return (
    <div className="w-96">
      <div className="flex flex-col items-center gap-3">
        <h2 className="uppercase font-medium">Enter 4-digit upi pin</h2>
        <div className="flex gap-3">
          {Array(4)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 border border-black rounded-full"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
