import { saleorClient } from "../../saleorClient";
import { GET_MENU_ITEMS } from "../queries/getMenu";
import type { GetMenuItemsResponse } from "../types/menu";

export async function getMenuItems(): Promise<GetMenuItemsResponse["menu"] | null> {
  try {
    const data: GetMenuItemsResponse = await saleorClient.request(GET_MENU_ITEMS);
    return data.menu;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return null;
  }
}
