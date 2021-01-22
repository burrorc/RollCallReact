import React from "react";
import Carousel from "react-bootstrap/Carousel";

function Slider() {
  return (
    //<div>
      <div className="container-fluid" style={{ width: "100vw" }}>
        <Carousel
          interval={4000}
          pause={false}
          indicators={false}
          controls={false}
        >
          <Carousel.Item
          style={{ height: "280px" }}
          >
            <div className="d-flex flex-column justify-content-center">
              <div>
                <h1 className="slider">ROLL CALL</h1>
              </div>
              <div>
                <h1 className="slider">WEB APP</h1>
              </div>
              <div>
                  <h3 className="slider">We make taking attendance easy</h3>
                </div>
              
            </div>
          </Carousel.Item>

          <Carousel.Item style={{ height: "280px" }}>
         
            <div className="d-flex flex-column align-items-center">
              
              <div style={{marginTop: 75}}>
                <h1 className="slider">Toss the paper...</h1>
              </div>
             
            </div>
            
            </Carousel.Item>

          <Carousel.Item style={{ height: "280px" }}>
            

            
            <div className="d-flex flex-column align-items-center">
              
            <div style={{marginTop: 75}}>
                <h1 className="slider">Ditch the pencil...</h1>
              </div>
             
            </div>
            
          </Carousel.Item>
          <Carousel.Item style={{ height: "280px" }}>
            

            
            <div className="d-flex flex-column align-items-center">
              
            <div style={{marginTop: 75}}>
                <h1 className="slider">Click it and forget it!</h1>
              </div>
             
            </div>
           
          </Carousel.Item>
        </Carousel>
      </div>
    //</div>
  );
}

export default Slider;
