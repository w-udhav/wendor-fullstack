import React, { useEffect, useState } from "react";

import { sampleProducts } from "@/utils/constants";

import Header from "@/components/Header";
import ShopByCategory from "@/components/Home/ShopByCategory";
import ProductCardCollection from "@/components/ProductCardCollection";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const subheading =
  "Discover curated products, tailored just for you. Explore our collections and find exactly what you need, from essentials to exclusives.";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [underFiftyProducts, setUnderFiftyProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/inventory");
      const allProducts = res?.data || [];
      setProducts(allProducts);

      // Filter products under ₹50
      const underFifty = allProducts.filter(
        (product) => parseFloat(product.productPrice) < 50
      );
      setUnderFiftyProducts(underFifty);

      // Select random 3 products
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      const selectedRandomProducts = shuffled.slice(0, 3);
      setRandomProducts(selectedRandomProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-20">
      <Header heading="Home" subheading={subheading} />
      <ShopByCategory />
      <ProductCardCollection title="Our Bestseller" products={randomProducts} />
      <ProductCardCollection title="Under ₹50" products={underFiftyProducts} />
    </div>
  );
}
