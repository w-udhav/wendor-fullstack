import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardCollection from "@/components/ProductCardCollection";
import SectionHeading from "@/components/SectionHeading";
import { categories, sampleProducts } from "@/utils/constants";
import { Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function Products() {
  const [products, setProducts] = React.useState(sampleProducts);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search.length > 0) {
      const filteredProducts = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(sampleProducts);
    }
  }, [search]);

  return (
    <div className="flex flex-col gap-20">
      <Header heading="Products" subheading="Our products" />

      <div className="flex gap-5">
        <input
          type="text"
          className="p-2 max-w-sm w-full rounded-md border text-sm"
          placeholder="Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select label="Filter" variant="flat" className="max-w-40">
          {["All", ...categories].map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
      <ProductCardCollection title="Beverages" products={products} />
    </div>
  );
}
