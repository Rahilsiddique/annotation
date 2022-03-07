import React, { useState } from "react";
import "./Annotation.css";
import { Stage, Layer } from "react-konva";
import RectLabel from "./RectLabel";
import { FaTrashAlt } from "react-icons/fa";

const BoxAnnotator = (props) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const color = getRandomColor();

  const foto = new Image();
  foto.src = props.image;

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x,
          y,
          width: 0,
          height: 0,
          key: 0,
          label: selectedOption,
          stroke: color,
        },
      ]);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
        label: selectedOption,
        stroke: color,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: 0,
          label: selectedOption,
          stroke: color,
        },
      ]);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  const handleDelete = (key) => {
    const updatedAnnotation = annotations.filter((value) => key !== value.key);
    setAnnotations(updatedAnnotation);
  };

  console.log(getRandomColor());
  return (
    <>
      <div className="anno-box">
        <div className="anno-img">
          <>
            <Stage
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              width={600}
              height={600}
              style={{
                backgroundImage: `url(${props.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
                maxWidth: `100%`,
                height: `auto`,
              }}
            >
              <Layer>
                {annotationsToDraw.map((value) => {
                  return <RectLabel {...value} />;
                })}
                {annotationsToDraw.map((value) => {
                  const tempx = value.x;
                  const tempy = value.y;
                  const centerX = tempx / foto.width;
                  const centerY = tempy / foto.height;
                  const boxW = value.width;
                  const boxH = value.height;
                  const boxWidth = boxW / foto.width;
                  const boxHeight = boxH / foto.height;
                  console.log(value);
                })}
              </Layer>
            </Stage>
          </>
        </div>
        <div className="text-box">
          {annotationsToDraw.map((value) => {
            console.log(value);
            return (
              <div
                className="rect-edit-box"
                style={{ border: `2px solid ${value.stroke}` }}
              >
                <select onChange={(e) => (value.label = e.target.value)}>
                  {props.classes.map((food) => {
                    return <option>{food}</option>;
                  })}
                </select>
                <FaTrashAlt
                  size={25}
                  onClick={() => handleDelete(value.key)}
                  className="icon"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BoxAnnotator;
