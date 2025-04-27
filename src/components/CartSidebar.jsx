"use client";

import { useEffect, useState } from "react";

export default function CartSidebar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this component renders only on the client
  }, []);

  if (!isClient) {
    return null; // Prevents rendering on the server
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="h-full flex items-center justify-center">
            <div className="w-full">
              {/* Dynamic content here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag w-16 h-16 text-gray-400 mb-4"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
