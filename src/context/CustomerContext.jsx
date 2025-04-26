"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Load customer info from localStorage on initial load
    const savedCustomerInfo = localStorage.getItem("customerInfo");
    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo));
    }
  }, []);

  const updateCustomerInfo = (info) => {
    const updatedInfo = { ...customerInfo, ...info };
    setCustomerInfo(updatedInfo);
    localStorage.setItem("customerInfo", JSON.stringify(updatedInfo));
  };

  const getCustomerByPhone = async (phone) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate it with localStorage
      const savedCustomerInfo = localStorage.getItem("customerInfo");
      if (savedCustomerInfo) {
        const customer = JSON.parse(savedCustomerInfo);
        if (customer.phone === phone) {
          setCustomerInfo(customer);
          return customer;
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customerInfo,
        updateCustomerInfo,
        getCustomerByPhone,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
