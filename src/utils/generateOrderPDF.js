import jsPDF from "jspdf";
import { formatPrice } from "./formatPrice";

// Helper function to convert Bengali numerals to English
const convertToEnglishNumbers = (str) => {
  const bengaliToEnglish = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return str.replace(/[০-৯]/g, (match) => bengaliToEnglish[match]);
};

// Helper function to format price in English numbers with BDT symbol
const formatPriceEnglish = (price) => {
  if (typeof price !== "number" || isNaN(price)) return "৳0.00";
  return `৳${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const generateOrderPDF = (orderDetails) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 15;

  // Add company logo
  const logoWidth = 30;
  const logoHeight = 30;
  doc.addImage(
    "/logo.png",
    "PNG",
    pageWidth / 2 - logoWidth / 2,
    y,
    logoWidth,
    logoHeight
  );
  y += logoHeight + 5;

  // Add tagline
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // Gray color
  doc.text("Your Garden, Your Style", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Add order details header
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39); // Dark gray color
  doc.text("Order Confirmation", pageWidth / 2, y, { align: "center" });
  y += 10;

  // Add order information
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81); // Medium gray color
  doc.text(`Order Number: ${orderDetails.orderNumber}`, margin, y);
  y += 8;
  doc.text(`Date: ${convertToEnglishNumbers(orderDetails.date)}`, margin, y);
  y += 8;
  doc.text(`Status: ${orderDetails.status}`, margin, y);
  y += 15;

  // Add customer information
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text("Customer Information", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text(`Name: ${orderDetails.customer?.name || "N/A"}`, margin, y);
  y += 8;
  if (orderDetails.customer?.email) {
    doc.text(`Email: ${orderDetails.customer.email}`, margin, y);
    y += 8;
  }
  doc.text(
    `Phone: ${convertToEnglishNumbers(orderDetails.customer?.phone || "N/A")}`,
    margin,
    y
  );
  y += 8;
  doc.text(`Address: ${orderDetails.customer?.address || "N/A"}`, margin, y);
  y += 15;

  // Add items table header
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text("Order Items", margin, y);
  y += 8;

  // Table headers
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("Item", margin, y);
  doc.text("Quantity", margin + 100, y);
  doc.text("Price", margin + 150, y);
  y += 8;

  // Add a line
  doc.setDrawColor(229, 231, 235); // Light gray color
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Table rows
  orderDetails.items.forEach((item) => {
    // Handle long item names
    const itemName =
      item.name.length > 40 ? item.name.substring(0, 37) + "..." : item.name;
    doc.text(itemName, margin, y);
    doc.text(
      convertToEnglishNumbers(item.quantity.toString()),
      margin + 100,
      y
    );
    doc.text(formatPriceEnglish(item.price * item.quantity), margin + 150, y);
    y += 8;
  });

  y += 8;

  // Add a line
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Add totals
  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text("Subtotal:", margin + 100, y);
  doc.text(formatPriceEnglish(orderDetails.subtotal), margin + 150, y);
  y += 8;

  doc.text("Shipping:", margin + 100, y);
  doc.text(formatPriceEnglish(orderDetails.shipping), margin + 150, y);
  y += 8;

  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text("Total:", margin + 100, y);
  doc.text(formatPriceEnglish(orderDetails.total), margin + 150, y);
  y += 15;

  // Add payment information
  doc.setFontSize(12);
  doc.setTextColor(17, 24, 39);
  doc.text("Payment Information", margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(55, 65, 81);
  doc.text(`Method: ${orderDetails.payment?.method || "N/A"}`, margin, y);
  y += 8;
  if (orderDetails.payment?.transactionId) {
    doc.text(
      `Transaction ID: ${convertToEnglishNumbers(
        orderDetails.payment.transactionId
      )}`,
      margin,
      y
    );
    y += 8;
  }
  y += 15;

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text("Thank you for shopping with Ebrikkho!", pageWidth / 2, y, {
    align: "center",
  });
  y += 5;
  doc.text(
    "For any queries, please contact our customer support.",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 5;
  doc.text(
    "Email: ebrikkho2024@gmail.com | Phone: 01518926700, 01773995858",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`order-${orderDetails.orderNumber}.pdf`);
};
