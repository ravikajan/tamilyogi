import React from "react";
import Card from "./Card";

interface CardRowProps {
  items: { image: string; title: string; year: string; genre: string; rating: number }[];
}

const CardRow = ({ items }: CardRowProps) => (
  <div className="slider-container flex gap-3 sm:gap-4 overflow-x-auto pb-4">
    {items.map((item, idx) => (
      <Card key={idx} {...item} />
    ))}
  </div>
);

export default CardRow;
