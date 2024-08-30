import React, { useEffect } from "react";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import ProductTable from "@/components/Products/ProductTable";
import ProductDetail from "@/components/Products/ProductDetail";
import { axiosInstance } from "@/utils/axiosInstance";
import AddProductModal from "@/components/Modal/AddProductModal";
import { fetchProducts } from "@/utils/commonFunctions";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  const handleSelect = (product) => {
    setSelectedProduct(product);
  };

  const clearSelected = () => {
    setSelectedProduct(null);
  };

  const refreshData = async () => {
    fetchProducts(setProducts);
  };

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <div className="w-full h-full max-h-screen overflow-hidden flex">
      <div className="w-2/3 border-r border-zinc-800 h-full pl-4">
        {/* Top */}
        <div className="p-3 px-4 pl-0 w-full flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <AddProductModal refreshData={refreshData} />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-zinc-400">Count: </h3>
            <p className="font-semibold">13</p>
          </div>
        </div>

        {/* Main */}
        <div className="w-full overflow-hidden relative pl-0 p-3 rounded-2xl">
          <ProductTable rowData={products} handleSelect={handleSelect} />
        </div>
      </div>

      <div className="w-1/3 h-full bg-black">
        {selectedProduct && (
          <ProductDetail
            refreshData={refreshData}
            product={selectedProduct}
            clearSelected={clearSelected}
          />
        )}
      </div>
    </div>
  );
}
