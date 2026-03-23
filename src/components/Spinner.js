import React from "react";
import loading from "./loading.gif"; // adjust path

const Spinner = () => {
  return (
    <div className="text-center my-5">
      <img className= "my-3" src={loading} alt="loading" style={{ width: "50px", height: "50px" }} />
    </div>
  );
};

export default Spinner;
