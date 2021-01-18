import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Slider() {
  return (
    <div>
      <div className="container-fluid" style={{height: 400}}>
        <Carousel
          interval={4000}
          pause={false}
          indicators={false}
          controls={false}
        >
          <Carousel.Item style={{ height: "300px" }}>
          <div className="d-flex flex-column align-items-center">
              <div>
                <h1 className="slider">ROLLCALL</h1>
              </div>
              <div>
                <h1 className="slider">WEB APP</h1>
              </div>
              
            </div> 
          <Carousel.Caption>
          <div>
                <h3 className="slider">We make taking attendance easy</h3>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item style={{ height: "300px" }}>
          <Carousel.Caption>
            <div className="d-flex flex-column align-items-center">
              
              <div>
                <h1 className="slider">Toss the paper...</h1>
              </div>
             
            </div>
            </Carousel.Caption>
            </Carousel.Item>

          <Carousel.Item style={{ height: "300px" }}>
            

            <Carousel.Caption>
            <div className="d-flex flex-column align-items-center">
              
              <div>
                <h1 className="slider">Ditch the pencil...</h1>
              </div>
             
            </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            

            <Carousel.Caption>
            <div className="d-flex flex-column align-items-center">
              
              <div>
                <h1 className="slider">Click it and forget it!</h1>
              </div>
             
            </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
