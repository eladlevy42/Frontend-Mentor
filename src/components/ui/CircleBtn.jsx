import React from "react";

function CircleBtn({ symbol, func }) {
  return (
    <button
      onClick={func}
      className="w-7 group h-7 text-white flex items-center justify-center rounded-full border-white border-2 text-center hover:bg-white"
    >
      {symbol}
    </button>
  );
}

export default CircleBtn;
