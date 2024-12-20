"use client";

import { useEffect, useState } from "react";
import MenuCard from "./_components/MenuCard";
import { Skeleton } from "@mui/material";


const Menu = () => {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error handling state

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/item/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full p-4 flex flex-col justify-center">
                <div className="w-full text-center text-xl flex justify-start pl-4">
                    Menu Items
                </div>
                <div className="flex justify-between items-center gap-4 flex-wrap mt-4 w-[350] h-[400] px-4">
                    {/* Render skeleton loaders while loading */}
                    {Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={350}
                                height={400}
                                className="shadow-lg"
                            />
                        ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full h-full p-4 flex flex-col justify-center">
            <div className="w-full text-center text-xl flex justify-start pl-4">
                Menu Items
            </div>
            <div className="flex justify-around items-center gap-4 flex-wrap mt-8 w-[350] h-[400] px-4">
                {/* Map over items and render MenuCard for each item */}
                {items.map((item) => (
                    <MenuCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
