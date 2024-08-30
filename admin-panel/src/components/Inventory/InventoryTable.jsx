import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
const columns = [
  {
    key: "inventoryId",
    label: "ID",
  },
  {
    key: "productName",
    label: "NAME",
  },
  {
    key: "productPrice",
    label: "PRICE",
  },
  {
    key: "quantity",
    label: "QUANTITY",
  },
];

export default function InventoryTable({ rowData, handleSelect }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedInventory, setSelectedInventory] = React.useState(null);

  const handleRowClick = (product) => {
    handleSelect(product);
  };

  return (
    <Table
      isHeaderSticky
      selectionMode="single"
      color="primary"
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rowData}>
        {(item) => (
          <TableRow key={item.productId} onClick={() => handleRowClick(item)}>
            {(columnKey) => {
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
