// Customer data storage utility

// Save customer data to localStorage
export const saveCustomerData = (customerData) => {
  try {
    localStorage.setItem("customerData", JSON.stringify(customerData));
    return true;
  } catch (error) {
    console.error("Error saving customer data:", error);
    return false;
  }
};

// Get customer data from localStorage
export const getCustomerData = () => {
  try {
    const data = localStorage.getItem("customerData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving customer data:", error);
    return null;
  }
};

// Clear customer data from localStorage
export const clearCustomerData = () => {
  try {
    localStorage.removeItem("customerData");
    return true;
  } catch (error) {
    console.error("Error clearing customer data:", error);
    return false;
  }
};

// Save order history to localStorage
export const saveOrderHistory = (order) => {
  try {
    const existingOrders = getOrderHistory() || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error("Error saving order history:", error);
    return false;
  }
};

// Get order history from localStorage
export const getOrderHistory = () => {
  try {
    const data = localStorage.getItem("orderHistory");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving order history:", error);
    return [];
  }
};

// Get a specific order by ID
export const getOrderById = (orderId) => {
  try {
    const orders = getOrderHistory();
    return orders.find((order) => order.id === orderId) || null;
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    return null;
  }
};
