import React from "react";
import { Row, Col } from "reactstrap";

const Slide = ({ slide, i, onClick, onLoad }) => {
  return (
    <div className="slide-wrapper p-2 mb-3" onClick={onClick}>
        <Row>
            <Col xs="3">Slide {i + 1}</Col>
            <Col><img src={slide} alt="" className="slide img-fluid" onLoad={onLoad} /></Col>
        </Row>
      
    </div>
  );
};

export default Slide;
