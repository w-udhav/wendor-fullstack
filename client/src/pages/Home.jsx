import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import ShopByCategory from "@/components/Home/ShopByCategory";
import ProductCardCollection from "@/components/ProductCardCollection";
import { axiosInstance } from "@/utils/axiosInstance";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const subheading =
  "Discover curated products, tailored just for you. Explore our collections and find exactly what you need, from essentials to exclusives.";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [underFiftyProducts, setUnderFiftyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/inventory");
      const allProducts = res?.data || [];
      setProducts(allProducts);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(allProducts.map((p) => p.productCategory)),
      ];
      setCategories(uniqueCategories);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="flex flex-col gap-20">
      <Header heading="Home" subheading={subheading} />
      {loading ? (
        <div className="w-full flex items-center justify-center h-40">
          <Spinner color="secondary" size="lg" />
        </div>
      ) : (
        <>
          <ShopByCategory handleCategoryClick={handleCategoryClick} categories={categories} />
          <ProductCardCollection title="Our Bestseller" products={randomProducts} />
          <ProductCardCollection title="Under ₹50" products={underFiftyProducts} />
        </>
      )}
    </div>
  );
}
