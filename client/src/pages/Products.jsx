import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/utils/axiosInstance";
import { categories, sampleProducts } from "@/utils/constants";

import Header from "@/components/Header";
import ProductCardCollection from "@/components/ProductCardCollection";
import toaster from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (search.length > 0) {
      const filteredProducts = products.filter((product) =>
        product?.productName.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(filteredProducts);
    }
  }, [search]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/inventory");
      setProducts(res.data);
      setFilteredProducts(res.data);
      const uniqueCategories = [
        ...new Set(res.data.map((product) => product.productCategory)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      toaster.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = products.filter(
      (product) => product.productCategory === category
    );
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-20">
      <Header
        heading="Products"
        subheading="Explore a wide range of categories and find the perfect items for you!"
      />

      <div className="flex gap-5">
        <input
          type="text"
          className="p-2 max-w-sm w-full rounded-md border text-sm"
          placeholder="Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Filter"
          variant="flat"
          className="max-w-40"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {["All", ...categories].map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
      {selectedCategory === "All" ? (
        categories.map((category) => (
          <ProductCardCollection
            key={category}
            title={category}
            products={groupedProducts[category]}
          />
        ))
      ) : (
        <ProductCardCollection
          key={selectedCategory}
          title={selectedCategory}
          products={groupedProducts[selectedCategory]}
        />
      )}
    </div>
  );
}
