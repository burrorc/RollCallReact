import React from "react";
import Slider from "./Slider"

function Home() {
  return (
    <div style={{ height: "100%", position: "fixed" }}>
      <div className="jumbotron d-flex align-items-center" style={{paddingBottom: 100, height: '100%'}}>
        <Slider />
      </div>
    </div>
  );
}

export default Home;
