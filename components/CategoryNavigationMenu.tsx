"use client";

import { MenuItem, MenuChild } from "@/app/lib/saleor/types/menu";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { SkeletonCardGroupSmall } from "./SkeletorCard";

interface CategoryNavigationMenuProps {
    items: MenuItem[];
    loading?: boolean;
}
export function CategoryNavigationMenu({ items }: CategoryNavigationMenuProps) {

    return (
        <NavigationMenu viewport={false} className="hidden rounded-full md:flex py-2 px-4 scrollbar-hide">
            <NavigationMenuList>
                {items?.map((item) => (
                    <NavigationMenuItem key={item.id}>
                        <NavigationMenuTrigger className="rounded-full shadow-md hover:scale-105 transform transition-all ease-in-out">
                            {item.name}
                        </NavigationMenuTrigger>
                        {item.children.length > 0 && (
                            <NavigationMenuContent className="z-50 absolute w-max rounded-full">
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

export function MobileCategoryNavigationMenu({ items, loading }: CategoryNavigationMenuProps) {

    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <nav className="block md:hidden bg-white shadow-sm px-4 py-2 rounded-b-2xl">
            {loading && <SkeletonCardGroupSmall count={4} />}
            <ul className="space-y-2">
                {items?.map((item) => (
                    <li key={item.id}>
                        <button
                            className="w-full flex justify-between items-center text-left font-semibold text-gray-800"
                            onClick={() =>
                                setExpandedId(expandedId === item.id ? null : item.id)
                            }
                        >
                            {item.name}
                            <span>{expandedId === item.id ? <ChevronUp /> : <ChevronDown />}</span>
                        </button>

                        {expandedId === item.id && item.children.length > 0 && (
                            <ul className="ml-4 mt-1 space-y-1 text-sm">
                                {item.children.map((child: MenuChild) => (
                                    <li key={child.id}>
                                        <a
                                            href={item.category?.slug ? `/category/${item.category.slug}` : "#"}

                                            className="block py-1 px-2 rounded hover:bg-gray-100"
                                        >
                                            {child.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}