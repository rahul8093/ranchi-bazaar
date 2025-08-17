"use client";

import { getMenuItems } from "@/app/lib/saleor/helpers/getMenu";
import { MenuItem, MenuChild } from "@/app/lib/saleor/types/menu";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { useEffect, useState } from "react";

export function CategoryNavigationMenu() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        async function fetchMenu() {
            const menu = await getMenuItems();
            if (menu?.items) {
                setMenuItems(menu.items);
            }
        }
        fetchMenu();
    }, []);

    return (
        <NavigationMenu viewport={false} className="bg-white border-t shadow-sm py-2 px-4 scrollbar-hide">
            <NavigationMenuList>
                {menuItems.map((item) => (
                    <NavigationMenuItem key={item.id}>
                        <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                        {item.children.length > 0 && (
                            <NavigationMenuContent className="z-50 absolute w-max">
                                <ul className="grid gap-2 p-2">
                                    {item.children.map((child: MenuChild) => (
                                        <li key={child.id}>
                                            <NavigationMenuLink
                                            href={item.category?.slug ? `/category/${item.category.slug}` : "#"}

                                                className="hover:bg-muted transition-colors block px-2 py-1 rounded"
                                            >
                                                {child.name}
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
