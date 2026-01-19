"use server";

import { RootProduct } from "@/types/products";
import { cacheLife } from "next/cache";

export const getProductsByCategory = async (categoryName: string) => {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(categoryName)}`,
    );

    if (!response.ok) throw new Error(`Error, status: ${response.status}`);

    const data: RootProduct = await response.json();
    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
};
