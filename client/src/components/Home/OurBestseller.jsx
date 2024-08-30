import React from "react";
import SectionHeading from "../SectionHeading";
import ProductCard from "../ProductCard";

export default function OurBestseller() {
  return (
    <div className="w-full flex flex-col gap-5">
      <SectionHeading title="Our Bestseller" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
