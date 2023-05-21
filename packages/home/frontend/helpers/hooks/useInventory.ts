import { useCallback, useEffect, useState } from 'react';
import { Inventory } from 'types/inventory';
import { useProduct } from 'frontastic';

export interface UseInventoryOptions {
  sku: string;
}

const useInventory = ({ sku }: UseInventoryOptions) => {
  const [inventory, setInventory] = useState<Inventory>();

  const { getInventory } = useProduct();

  const fetchInventory = useCallback(async () => {
    if (!sku) return;

    const response = await getInventory(sku);
    setInventory(response);
  }, [sku, getInventory]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return inventory;
};

export default useInventory;
