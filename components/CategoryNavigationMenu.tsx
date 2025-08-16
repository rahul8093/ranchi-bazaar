"use client"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

const categories = [
    'Groceries',
    'Premium Fruits',
    'Home & Kitchen',
    'Fashion',
    'Electronics',
    'Beauty',
    'Home Improvement',
    'Sports, Toys & Luggage',
]

const dummyLinks = [
    { name: "Best Sellers", href: "#" },
    { name: "New Arrivals", href: "#" },
    { name: "Top Rated", href: "#" },
    { name: "On Sale", href: "#" },
]

export function CategoryNavigationMenu() {
    return (
        <NavigationMenu viewport={false} className="bg-white border-t shadow-sm py-2 px-4 scrollbar-hide">
            <NavigationMenuList>
                {categories.map((category) => (
                    <NavigationMenuItem key={category}>
                        <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
                        <NavigationMenuContent className="z-50 absolute w-max">
                            <ul className="grid gap-4">
                                {dummyLinks.map((link) => (
                                    <li key={link.name} className="row-span-3">
                                        <NavigationMenuLink
                                            href={link.href}
                                            className="hover:bg-muted transition-colors block px-2 py-1 rounded"
                                        >
                                            {link.name} in {category}
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
