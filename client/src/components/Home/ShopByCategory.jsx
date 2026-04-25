import React from "react";
import beverage from "@/assets/beverage.svg";
import candy from "@/assets/candy.svg";
import chips from "@/assets/chips.svg";
import cookies from "@/assets/cookies.svg";
import energyDrink from "@/assets/energyDrink.svg";
import pastries from "@/assets/pastries.svg";

import Icon from "../Icon";

const categoryMap = {
  Snacks: { icon: chips, label: "Chips & Snacks" },
  Beverages: { icon: beverage, label: "Cold Drinks" },
  Chocolates: { icon: pastries, label: "Sweets" },
  Biscuits: { icon: cookies, label: "Cookies" },
  Water: { icon: energyDrink, label: "Water & Drinks" },
  Candy: { icon: candy, label: "Candy" },
};

export default function ShopByCategory({ handleCategoryClick, categories }) {
  return (
    <div className="flex md:flex-row flex-col gap-10 w-full">
      <div className="w-max flex flex-col gap-5">
        <h1 className="flex flex-col leading-none text-xl md:text-2xl font-semibold text-gray-700">
          <span>Shop</span>
          <span>by categories</span>
        </h1>
        <div className="w-14 h-1 bg-primary"></div>
        <Icon name="storeFront" className="text-6xl hidden md:block" />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="w-full flex items-center gap-5 md:gap-10 overflow-auto">
          {categories.map((name) => {
            const cat = categoryMap[name] || { icon: null, label: name };
            return (
              <button
                onClick={() => handleCategoryClick(name)}
                key={name}
                className="flex flex-col gap-2 h-32 md:h-40 border p-2 rounded-md bg-zinc-50"
              >
                <div className="w-32 md:w-40 h-full flex flex-col justify-center items-center gap-2">
                  {cat.icon && (
                    <img
                      src={cat.icon}
                      alt={cat.label}
                      className="w-16 md:w-24 h-16 md:h-24 object-contain"
                    />
                  )}
                  <p className="text-zinc-700 text-sm">{cat.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
