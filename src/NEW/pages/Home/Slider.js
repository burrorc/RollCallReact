import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Slider(props) {
  return (
    <div>
      

      <div className="container-fluid">
        <Carousel interval={4000} pause={false} indicators={false}>
          <Carousel.Item style={{ height: "300px" }}>
            

            <Carousel.Caption>
              <h3>First Demo </h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{ height: "300px" }}>
            

            <Carousel.Caption>
              <h3>Second Demo</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{ height: "300px" }}>
            

            <Carousel.Caption>
              <h3>Third Demo</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
