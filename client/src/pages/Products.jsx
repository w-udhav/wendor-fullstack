import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { axiosInstance } from "@/utils/axiosInstance";
import { categories, sampleProducts } from "@/utils/constants";

import Header from "@/components/Header";
import ProductCardCollection from "@/components/ProductCardCollection";
import toaster from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "All";

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
      const uniqueCategories = [
        ...new Set(res.data.map((product) => product.productCategory)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams({ search: value });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.productCategory === selectedCategory;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // const groupedProducts = categories.reduce((acc, category) => {
  //   acc[category] = products.filter(
  //     (product) => product.productCategory === category
  //   );
  //   return acc;
  // }, {});

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
          value={searchQuery}
          onChange={handleSearchChange}
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
      <ProductCardCollection
        title={selectedCategory === "All" ? "All Products" : selectedCategory}
        products={filteredProducts}
      />
    </div>
  );
}
