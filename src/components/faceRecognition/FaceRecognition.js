import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, IMAGE_URL }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={IMAGE_URL} alt={""} width="500px" height="auto" />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>    
            </div>  
        </div>
    );
}

export default FaceRecognition;