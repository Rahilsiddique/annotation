import React from "react";
import { Rect, Label, Tag, Text } from "react-konva";

const RectLabel = (value) => {
  return (
    <div>
      <Label x={value.x} y={value.y}>
        <Tag pointerWidth={10} stroke={value.stroke} fill="yellow" />
        <Text
          y={50}
          x={5}
          fontSize={22}
          text={value.label}
          fill="black"
          padding={4}
        />
      </Label>
      <Rect
        x={value.x}
        y={value.y}
        width={value.width}
        height={value.height}
        fill="transparent"
        stroke={value.stroke}
      />
    </div>
  );
};

export default RectLabel;
