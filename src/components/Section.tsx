import React from "react";

interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <section className="mb-8">
    <h2 className="px-4 pb-3 pt-5">{title}</h2>
    {children}
  </section>
);

export default Section;
