import React from "react";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";

export default function ProductCardCollection({ title, products = [] }) {
  return (
    <div className="w-full flex flex-col gap-5">
      <SectionHeading title={title} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}
