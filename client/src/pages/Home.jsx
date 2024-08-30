import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { categories } from "@/utils/constants";
import React from "react";

const subheading =
  "Discover curated products, tailored just for you. Explore our collections and find exactly what you need, from essentials to exclusives.";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Header heading="Home" subheading={subheading} />
      <div className="flex gap-10 w-full">
        <div className="w-max flex flex-col gap-5">
          <h1 className="flex flex-col leading-none text-2xl font-semibold text-gray-700">
            <span>Shop</span>
            <span>by categories</span>
          </h1>

          <div className="w-14 h-1 bg-primary"></div>
          <Icon name="storeFront" className="text-6xl" />
        </div>
        <div className="flex-1 border">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{category}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
