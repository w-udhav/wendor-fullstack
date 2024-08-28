import React, { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Input2 from "../Input2";

import { categories } from "@/utils/constants";

export default function ProductDetail({ product, clearSelected }) {
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category || "Select Category"
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="w-full h-full pl-4">
      <div className="p-3 px-4 pl-0 w-full flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <button
            className="flex items-center justify-center"
            onClick={clearSelected}
          >
            <Icon name="close" className="text-zinc-500 font-bold" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button className="text-sm flex items-center py-2 ">Save</Button>
        </div>
      </div>

      <div className="p-4 pt-5 pl-0 flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-zinc-400">
            Name
          </label>
          <Input2 type="text" id="name" value={product?.name} />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-zinc-400">
            Price
          </label>
          <Input2 type="number" id="price" value={product?.height} />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-zinc-400">
            Category
          </label>
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="rounded-xl p-4 py-3 outline-none bg-gray hover:bg-zinc-800 transition-all w-full text-left"
            >
              {selectedCategory}
            </button>
            {isCategoryOpen && (
              <div className="absolute top-10 bg-zinc-900 w-[12rem] max-h-[12rem] overflow-auto p-2 rounded-2xl flex flex-col text-sm shadow-md">
                {categories &&
                  categories.map((category, index) => (
                    <button
                      onClick={() => handleCategorySelection(category)}
                      className={`text-left p-2 px-3 rounded-lg hover:bg-zinc-800 transition-all flex items-center justify-between ${
                        selectedCategory === category ? "bg-zinc-800" : ""
                      }`}
                    >
                      <span>{category}</span>
                      <span className="flex justify-center items-center">
                        <Icon
                          name={category === selectedCategory ? "check" : ""}
                          className="text-lg font-light"
                        />
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-zinc-400">
            Image
          </label>
          <Input2 type="text" id="name" value={product.name} />
        </div>
      </div>
    </div>
  );
}
