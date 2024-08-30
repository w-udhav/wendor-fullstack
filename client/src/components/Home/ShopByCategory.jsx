import React from "react";
import beverage from "@/assets/beverage.svg";
import candy from "@/assets/candy.svg";
import chips from "@/assets/chips.svg";
import cookies from "@/assets/cookies.svg";
import energyDrink from "@/assets/energyDrink.svg";
import gum from "@/assets/gum.svg";
import pastries from "@/assets/pastries.svg";
import sandwich from "@/assets/sandwich.svg";

import Icon from "../Icon";

export default function ShopByCategory() {
  const categories = [
    {
      name: "Beverages",
      image: "beverage",
      url: beverage,
      className: "",
    },
    {
      name: "Candy",
      image: "candy",
      url: candy,
    },
    {
      name: "Chips",
      image: "chips",
      url: chips,
    },
    {
      name: "Cookies",
      image: "cookies",
      url: cookies,
    },
    {
      name: "Energy Drinks",
      image: "energyDrink",
      url: energyDrink,
    },
    {
      name: "Gum",
      image: "gum",
      url: gum,
    },
    {
      name: "Pastries",
      image: "pastries",
      url: pastries,
    },
    {
      name: "Sandwiches",
      image: "sandwich",
      url: sandwich,
    },
  ];
  return (
    <div className="flex gap-10 w-full">
      <div className="w-max flex flex-col gap-5">
        <h1 className="flex flex-col leading-none text-2xl font-semibold text-gray-700">
          <span>Shop</span>
          <span>by categories</span>
        </h1>

        <div className="w-14 h-1 bg-primary"></div>
        <Icon name="storeFront" className="text-6xl" />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="w-full flex items-center gap-10 overflow-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 h-40 border p-2 rounded-md bg-zinc-50"
            >
              <div className="w-40 h-full flex flex-col justify-between items-center">
                <img
                  src={category.url}
                  alt={category.image}
                  className="w-24 h-24 object-cover"
                />
                <p className="text-zinc-700 text-sm">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
