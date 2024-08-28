import React from "react";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import ProductTable from "@/components/Products/ProductTable";
import ProductDetail from "@/components/Products/ProductDetail";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleSelect = (product) => {
    setSelectedProduct(product);
  };

  const clearSelected = () => {
    setSelectedProduct(null);
  };

  console.log(selectedProduct);

  return (
    <div className="w-full h-full max-h-screen overflow-hidden flex">
      <div className="w-2/3 border-r border-zinc-800 h-full pl-4">
        {/* Top */}
        <div className="p-3 px-4 pl-0 w-full flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <Button className="text-sm flex items-center justify-center py-2">
              <Icon name="add" className="font-medium" /> Add Product
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-zinc-400">Count: </h3>
            <p className="font-semibold">13</p>
          </div>
        </div>

        {/* Main */}
        <div className="w-full overflow-hidden relative pl-0 p-3 rounded-2xl">
          <ProductTable handleSelect={handleSelect} />
        </div>
      </div>

      <div className="w-1/3 h-full bg-black">
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            clearSelected={clearSelected}
          />
        )}
      </div>
    </div>
  );
}
