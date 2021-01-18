import React from "react";
import Slider from "./Slider"

function Home() {
  return (
    <div style={{ height: "100%", position: "fixed" }}>
      <div className="jumbotron">
        <Slider />
      </div>
    </div>
  );
}

export default Home;
