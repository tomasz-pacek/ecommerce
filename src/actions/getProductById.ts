"use server";

import { Product } from "@/types/products";
import { cacheLife } from "next/cache";

export const getProductById = async (productId: number) => {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!response.ok) throw new Error(`Error fetching ${productId} data`);

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
