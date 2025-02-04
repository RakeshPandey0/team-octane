"use client";

import { useUser } from "../../../context/UserContext";
import { LayoutGrid, ShoppingCart, ReceiptText, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ChatBot from "./ChatBot/ChatBot";

const SideNav = ({ param }) => {
    const pathname = usePathname(); // Get the current pathname
    const { contextUser, setUserData } = useUser();

    // State to track the active menu item
    const [activeMenu, setActiveMenu] = useState("Menu"); // Default is "Menu"

    useEffect(() => {
        // Update the active menu based on the current pathname
        if (
            pathname.includes("/menu") &&
            !pathname.includes("/order") &&
            !pathname.includes("/bill")
        ) {
            setActiveMenu("Menu");
        } else if (pathname === "/menu/order") {
            setActiveMenu("Order");
        } else if (pathname === "/menu/bill") {
            setActiveMenu("Bill");
        }

        // Handle user data if provided
        if (param) {
            const jsonUser = JSON.parse(param);
            if (JSON.stringify(contextUser) !== JSON.stringify(jsonUser)) {
                setUserData(jsonUser);
            }
        }
    }, [pathname, param, contextUser, setUserData]);

    const menuData = [
        {
            id: 1,
            name: "Menu",
            icon: LayoutGrid,
            path: `/menu?id=675cdd072d28ff5599733aa2`,
            menuKey: "Menu", // Key for tracking active state
        },
        {
            id: 2,
            name: "Order",
            icon: ShoppingCart,
            path: "/menu/order",
            menuKey: "Order", // Key for tracking active state
        },
        {
            id: 3,
            name: "Bill",
            icon: ReceiptText,
            path: "/menu/bill",
            menuKey: "Bill", // Key for tracking active state
        },
    ];

    return (
        <div className="h-screen p-5 shadow-md border w-full">
            <div className="flex items-center">
                <Link href={"/"}>
                    <span className="text-3xl text-blue-950 font-extrabold">
                        QuickDine
                    </span>
                </Link>
            </div>
            <div className="mt-16">
                {menuData.map((menu) => {
                    const isActive = activeMenu === menu.menuKey;

                    return (
                        <Link href={menu.path} key={menu.id}>
                            <h2
                                className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-xl hover:text-primary hover:bg-blue-100 
                                ${isActive ? "text-primary bg-blue-100" : ""}`}
                            >
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    );
                })}
            </div>

            <div className="App">
                <ChatBot
                    OPEN_AI_KEY={process.env.NEXT_PUBLIC_OPENAI_API_KEY}
                    model="gpt-4o"
                    max_tokens={200}
                    chatbot_prompt={`You are a friendly and interactive waiter chatbot at a restaurant. Your goal is to assist customers in placing food orders, provide recommendations, and help them stay within their specified budget if mentioned. Follow these rules:

                        Engaging Interaction:
                        Greet the customer warmly and make them feel welcome.
                        If the customer mentions their order quantity is large, comment on it enthusiastically (e.g., "Wow, you seem to have quite the appetite today!").
                        Keep your tone positive, exciting, and conversational.
                        Food Recommendations:
                        Recommend items from the menu if the customer asks for suggestions.
                        Include pricing and briefly describe the item to make it sound appealing.
                        Ensure the item and price appear on a new line, formatted as:
                        [Item Name]  Rs. [Price]
                        Budget Management:
                        If the customer mentions a specific budget, calculate a combination of items they can order within that budget, ensuring the sum stays under or equal to the given amount.
                        Provide clear suggestions, ensuring items and prices are displayed on new lines, formatted as:
                        [Item Name]  Rs. [Price]
                        Unavailable or Out-of-Scope Questions:
                        If the customer asks a question unrelated to food, reply politely: "I cannot answer that at this moment."
                        Menu:
                        Use the following menu for reference:
                        here is the json format for the item and its price:
                        [
  {
    "Item": "Fried Rice",
    "price": 150
  },
  {
    "Item": "Chowmein",
    "price": 150
  },
  {
    "Item": "Mo:Mo",
    "price": 150
  },
  {
    "Item": "Pakoda",
    "price": 100
  },
  {
    "Item": "Thakali Khana Set",
    "price": 550
  },
  {
    "Item": "Samosa",
    "price": 30
  },
  {
    "Item": "Anda Chana",
    "price": 80
  },
  {
    "Item": "Sukuti",
    "price": 150
  }
]
                        Response Length:
                        Limit your response to 2-3 sentences unless the customer asks for more details.
                        Act as a waiter chatbot, assisting the customer based on their input.
        
                        Example Scenarios:
                        Customer Input: "I have a budget of Rs. 1000. What can I order?"
                        Response:
                        "With Rs. 1000, you could enjoy:
                        C. Pizza Rs. 350
                        Pasta Rs. 200
                        C. Momo Rs. 300 x2  
                        That leaves you with Rs. 150 for a refreshing drink or dessert!"
                        Customer Input: "Can you tell me about your restaurant?"
                        Response:
                        "I cannot answer that at this moment, but I'd love to help you with your order."
                        Customer Input: "I'd like to order something delicious!"
                        Response:
                        "How about trying our:
                        C. Pizza Rs. 350
                        It's cheesy, flavorful, and perfect for a hearty meal!"
                        Now respond to the customer's query, ensuring all items and prices are displayed on new lines as instructed.`}
                    headerText="Chatbot"
                    placeholderText="Type a message..."
                    buttonText="Chat with us"
                />
            </div>

            <div className="fixed bottom-10 flex gap-2 justify-center ml-10 items-center font-semibold bg-gray-200 rounded-xl py-2 px-4 ">
                <span className="w-8 h-8 rounded-full bg-slate-300 flex justify-center items-center">
                    <User className="w-7 h-7" />
                </span>
                <h1>{contextUser?.primary_id ?? "Table 01"}</h1>
            </div>
        </div>
    );
};

export default SideNav;
