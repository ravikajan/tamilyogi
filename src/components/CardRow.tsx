import React from "react";
import Card from "./Card";

interface CardRowProps {
  items: Array<{
    image: string;
    title: string;
    year: string;
    genre: string;
    rating: number;
    slug?: string;
    type?: string;
    poster?: string;
    trailer?: string;
    videoUrl?: string;
    seasons?: any[];
  }>;
}

const CardRow = ({ items }: CardRowProps) => (
  <div className="slider-container flex gap-3 sm:gap-4 overflow-x-auto pb-4">
    {items.map((item, idx) => (
      <div key={idx} className="w-44 sm:w-56 md:w-64 min-w-0 flex-shrink-0">
        <Card {...item} />
      </div>
    ))}
  </div>
);

export default CardRow;
