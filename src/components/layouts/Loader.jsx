import React from "react";
import loader from "../../assets/images/loader2.gif";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"90vh"
      }}
    >
      <center>
        <img
          src={loader}
          style={{ height: "200px", width: "200px" }}
          alt="Loading..."
        />
        <h1>Wait a Moment...</h1>
      </center>
    </div>
  );
};

export default Loader;
