import BulkAdd from "@/components/Inventory/BulkAdd";
import InventoryDetail from "@/components/Inventory/InventoryDetail";
import InventoryTable from "@/components/Inventory/InventoryTable";
import AddInventoryModal from "@/components/Modal/AddInventoryModal";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect } from "react";

export default function Inventory() {
  const [selectedInventory, setSelectedInventory] = React.useState(null);
  const [inventory, setInventory] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const handleSelect = (inventory) => {
    setSelectedInventory(inventory);
  };

  const clearSelected = () => {
    setSelectedInventory(null);
  };

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/inventory/");
      setInventory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full max-h-screen overflow-hidden flex">
      <div className="w-2/3 border-r border-zinc-800 h-full pl-4">
        {/* Top */}
        <div className="p-3 px-4 pl-0 w-full flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <AddInventoryModal refreshData={refreshData} />
            <BulkAdd refreshData={refreshData} />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-zinc-400">Count: </h3>
            <p className="font-semibold">{inventory?.length}</p>
          </div>
        </div>

        {/* Main */}
        <div className="w-full overflow-hidden relative pl-0 p-3 rounded-2xl">
          <InventoryTable rowData={inventory} handleSelect={handleSelect} />
        </div>
      </div>

      <div className="w-1/3 h-full bg-black">
        {selectedInventory && (
          <InventoryDetail
            refreshData={refreshData}
            inventory={selectedInventory}
            clearSelected={clearSelected}
          />
        )}
      </div>
    </div>
  );
}
