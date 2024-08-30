import React from "react";

import { sampleProducts } from "@/utils/constants";

import Header from "@/components/Header";
import ShopByCategory from "@/components/Home/ShopByCategory";
import ProductCardCollection from "@/components/ProductCardCollection";

const subheading =
  "Discover curated products, tailored just for you. Explore our collections and find exactly what you need, from essentials to exclusives.";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Header heading="Home" subheading={subheading} />
      <ShopByCategory />
      <ProductCardCollection title="Our Bestseller" products={sampleProducts} />
      <ProductCardCollection title="Under ₹50" products={sampleProducts} />
    </div>
  );
}
