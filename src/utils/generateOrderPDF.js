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

// Helper function to add a rounded rectangle
const addRoundedRect = (doc, x, y, width, height, radius, color) => {
  doc.setFillColor(color.r, color.g, color.b);
  doc.roundedRect(x, y, width, height, radius, radius, "F");
};

// Helper function to add a line
const addLine = (doc, x1, y1, x2, y2, color) => {
  doc.setDrawColor(color.r, color.g, color.b);
  doc.line(x1, y1, x2, y2);
};

// Helper function to safely add text with proper positioning
const addText = (doc, text, x, y, options = {}) => {
  if (!text) return;

  const defaultOptions = {
    align: "left",
    maxWidth: null,
    fontSize: doc.getFontSize(),
    textColor: doc.getTextColor(),
    fontStyle: doc.getFont().style,
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Set text properties
  doc.setFontSize(finalOptions.fontSize);
  doc.setTextColor(
    finalOptions.textColor.r,
    finalOptions.textColor.g,
    finalOptions.textColor.b
  );
  doc.setFont(undefined, finalOptions.fontStyle);

  // Add text with proper positioning
  if (finalOptions.maxWidth) {
    doc.text(text, x, y, {
      align: finalOptions.align,
      maxWidth: finalOptions.maxWidth,
    });
  } else {
    doc.text(text, x, y, { align: finalOptions.align });
  }
};

// Helper function to add price with BDT symbol
const addPrice = (doc, price, x, y, options = {}) => {
  const defaultOptions = {
    align: "left",
    fontSize: 9,
    textColor: { r: 17, g: 24, b: 39 }, // Dark gray
    fontStyle: "normal",
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Set text properties
  doc.setFontSize(finalOptions.fontSize);
  doc.setTextColor(
    finalOptions.textColor.r,
    finalOptions.textColor.g,
    finalOptions.textColor.b
  );
  doc.setFont(undefined, finalOptions.fontStyle);

  // Add BDT symbol
  doc.text("৳", x, y);

  // Add price value with proper positioning
  const priceText = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (finalOptions.align === "right") {
    doc.text(priceText, x + 3, y, { align: "right" });
  } else {
    doc.text(priceText, x + 3, y);
  }
};

export const generateOrderPDF = (orderDetails) => {
  // Create a new PDF document with A4 size
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });

  // Set document properties
  doc.setProperties({
    title: `Invoice - ${orderDetails.orderNumber}`,
    subject: "Order Invoice",
    author: "Ebrikkho",
    keywords: "invoice, order, ebrikkho, plants",
    creator: "Ebrikkho E-commerce",
  });

  // Define colors
  const colors = {
    primary: { r: 249, g: 115, b: 22 }, // Orange
    secondary: { r: 17, g: 24, b: 39 }, // Dark gray
    lightGray: { r: 243, g: 244, b: 246 },
    mediumGray: { r: 156, g: 163, b: 175 },
    darkGray: { r: 75, g: 85, b: 99 },
    white: { r: 255, g: 255, b: 255 },
    green: { r: 34, g: 197, b: 94 },
    red: { r: 239, g: 68, b: 68 },
  };

  // Define dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Calculate available space for items table
  const headerHeight = 100; // Approximate height of header section
  const footerHeight = 50; // Approximate height of footer section
  const summaryHeight = 70; // Height of summary section
  const paymentInfoHeight = 30; // Height of payment info section
  const availableHeight =
    pageHeight -
    margin * 2 -
    headerHeight -
    footerHeight -
    summaryHeight -
    paymentInfoHeight;

  // Calculate how many items can fit on a page
  const itemRowHeight = 8; // Height of each item row
  const itemsPerPage = Math.floor(availableHeight / itemRowHeight);

  // Calculate total number of pages needed
  const totalItems = orderDetails.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPages = Math.ceil(orderDetails.items.length / itemsPerPage);

  // Function to add header to each page
  const addHeader = (pageNum) => {
    // Add background color to the entire page
    doc.setFillColor(
      colors.lightGray.r,
      colors.lightGray.g,
      colors.lightGray.b
    );
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Add white content area
    doc.setFillColor(colors.white.r, colors.white.g, colors.white.b);
    doc.roundedRect(
      margin,
      margin,
      contentWidth,
      pageHeight - margin * 2,
      3,
      3,
      "F"
    );

    // Add header with logo and order number
    let y = margin + 10;

    // Add logo
    try {
      const logoWidth = 40;
      const logoHeight = 40;
      doc.addImage("/logo.png", "PNG", margin + 10, y, logoWidth, logoHeight);
    } catch (error) {
      console.error("Error adding logo:", error);
      // Fallback if logo can't be loaded
      addText(doc, "EBRIKKHO", margin + 10, y + 15, {
        fontSize: 24,
        textColor: colors.primary,
        fontStyle: "bold",
      });
    }

    // Add order number in the top right
    addText(doc, "Order Number:", pageWidth - margin - 10 - 40, y + 10, {
      fontSize: 12,
      textColor: colors.mediumGray,
    });

    addText(doc, orderDetails.orderNumber, pageWidth - margin - 10, y + 10, {
      fontSize: 14,
      textColor: colors.secondary,
      fontStyle: "bold",
      align: "right",
    });

    // Add invoice title
    addText(doc, "INVOICE", pageWidth / 2, y + 25, {
      fontSize: 20,
      textColor: colors.secondary,
      fontStyle: "bold",
      align: "center",
    });

    // Add date and status
    y += 40;

    // Add a subtle divider line
    addLine(doc, margin + 10, y, pageWidth - margin - 10, y, colors.lightGray);
    y += 10;

    // Add date
    addText(doc, "Date:", margin + 10, y, {
      fontSize: 10,
      textColor: colors.mediumGray,
    });

    const formattedDate = new Date(orderDetails.date).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    addText(doc, formattedDate, margin + 25, y, {
      fontSize: 10,
      textColor: colors.secondary,
      fontStyle: "bold",
    });

    // Add status with color-coded badge
    const statusText = orderDetails.status || "Processing";
    const statusColor =
      statusText.toLowerCase() === "delivered"
        ? colors.green
        : statusText.toLowerCase() === "processing"
        ? colors.primary
        : statusText.toLowerCase() === "cancelled"
        ? colors.red
        : colors.mediumGray;

    // Status badge background
    doc.setFillColor(statusColor.r, statusColor.g, statusColor.b);
    const statusWidth = doc.getStringUnitWidth(statusText) * 10 * 1.2;
    doc.roundedRect(
      pageWidth - margin - 10 - statusWidth - 10,
      y - 5,
      statusWidth + 10,
      10,
      5,
      5,
      "F"
    );

    // Status text
    addText(
      doc,
      statusText,
      pageWidth - margin - 10 - statusWidth / 2 - 5,
      y + 3,
      {
        fontSize: 10,
        textColor: colors.white,
        align: "center",
      }
    );

    // Add page number if multiple pages
    if (totalPages > 1) {
      addText(doc, `Page ${pageNum} of ${totalPages}`, pageWidth / 2, y, {
        fontSize: 10,
        textColor: colors.mediumGray,
        align: "center",
      });
    }

    y += 20;

    // Add customer information section
    doc.setFillColor(
      colors.lightGray.r,
      colors.lightGray.g,
      colors.lightGray.b
    );
    addRoundedRect(
      doc,
      margin + 10,
      y,
      contentWidth - 20,
      40,
      3,
      colors.lightGray
    );

    addText(doc, "Bill To:", margin + 15, y + 10, {
      fontSize: 12,
      textColor: colors.secondary,
      fontStyle: "bold",
    });

    addText(
      doc,
      orderDetails.customer?.name || "Customer Name",
      margin + 15,
      y + 20,
      {
        fontSize: 10,
        textColor: colors.darkGray,
      }
    );

    if (orderDetails.customer?.email) {
      addText(doc, orderDetails.customer.email, margin + 15, y + 27, {
        fontSize: 10,
        textColor: colors.darkGray,
      });
    }

    if (orderDetails.customer?.phone) {
      addText(doc, orderDetails.customer.phone, margin + 15, y + 34, {
        fontSize: 10,
        textColor: colors.darkGray,
      });
    }

    // Add shipping information
    addText(doc, "Ship To:", pageWidth / 2 + 10, y + 10, {
      fontSize: 12,
      textColor: colors.secondary,
      fontStyle: "bold",
    });

    // Format address with line breaks if needed
    const address = orderDetails.customer?.address || "Customer Address";
    const addressLines = address.split(",");

    let addressY = y + 20;
    addressLines.forEach((line, index) => {
      if (index < 3) {
        // Limit to 3 lines to avoid overflow
        addText(doc, line.trim(), pageWidth / 2 + 10, addressY, {
          fontSize: 10,
          textColor: colors.darkGray,
        });
        addressY += 7;
      }
    });

    return y + 50; // Return the y position after the header
  };

  // Function to add footer to each page
  const addFooter = (y) => {
    // Add a subtle divider line
    addLine(doc, margin + 10, y, pageWidth - margin - 10, y, colors.lightGray);
    y += 10;

    // Add thank you message
    addText(doc, "Thank you for shopping with Ebrikkho!", pageWidth / 2, y, {
      fontSize: 10,
      textColor: colors.mediumGray,
      fontStyle: "italic",
      align: "center",
    });

    // Add contact information
    y += 7;
    addText(
      doc,
      "For any queries, please contact our customer support:",
      pageWidth / 2,
      y,
      {
        fontSize: 8,
        textColor: colors.mediumGray,
        align: "center",
      }
    );

    y += 5;
    addText(
      doc,
      "Email: ebrikkho2024@gmail.com | Phone: 01518926700, 01773995858",
      pageWidth / 2,
      y,
      {
        fontSize: 8,
        textColor: colors.mediumGray,
        align: "center",
      }
    );
  };

  // Function to add items table
  const addItemsTable = (startY, startItemIndex, endItemIndex) => {
    let y = startY;

    // Add items table header
    doc.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
    addRoundedRect(
      doc,
      margin + 10,
      y,
      contentWidth - 20,
      8,
      3,
      colors.primary
    );

    // Table headers with proper spacing
    const col1 = margin + 15;
    const col2 = col1 + 70;
    const col3 = col2 + 25;
    const col4 = col3 + 25;

    addText(doc, "Item", col1, y + 5, {
      fontSize: 9,
      textColor: colors.white,
      fontStyle: "bold",
    });

    addText(doc, "Qty", col2, y + 5, {
      fontSize: 9,
      textColor: colors.white,
      fontStyle: "bold",
    });

    addText(doc, "Price", col3, y + 5, {
      fontSize: 9,
      textColor: colors.white,
      fontStyle: "bold",
    });

    addText(doc, "Total", col4, y + 5, {
      fontSize: 9,
      textColor: colors.white,
      fontStyle: "bold",
    });

    y += 10;

    // Table rows
    for (
      let i = startItemIndex;
      i < endItemIndex && i < orderDetails.items.length;
      i++
    ) {
      const item = orderDetails.items[i];

      // Alternate row background
      if (i % 2 === 0) {
        doc.setFillColor(
          colors.lightGray.r,
          colors.lightGray.g,
          colors.lightGray.b
        );
        addRoundedRect(
          doc,
          margin + 10,
          y,
          contentWidth - 20,
          8,
          0,
          colors.lightGray
        );
      }

      // Item name (with ellipsis if too long)
      const itemName =
        item.name.length > 25 ? item.name.substring(0, 22) + "..." : item.name;
      addText(doc, itemName, col1, y + 5, {
        fontSize: 9,
        textColor: colors.secondary,
      });

      // Quantity
      addText(doc, item.quantity.toString(), col2, y + 5, {
        fontSize: 9,
        textColor: colors.secondary,
      });

      // Price
      addPrice(doc, item.price, col3, y + 5, {
        fontSize: 8,
        textColor: colors.secondary,
      });

      // Total
      const itemTotal = item.price * item.quantity;
      addPrice(doc, itemTotal, col4, y + 5, {
        fontSize: 8,
        textColor: colors.secondary,
        align: "right",
      });

      y += 8;
    }

    return y;
  };

  // Function to add summary section
  const addSummary = (y) => {
    const summaryWidth = 80;
    const summaryX = pageWidth - margin - 10 - summaryWidth;

    // Summary background
    doc.setFillColor(
      colors.lightGray.r,
      colors.lightGray.g,
      colors.lightGray.b
    );
    addRoundedRect(doc, summaryX, y, summaryWidth, 60, 3, colors.lightGray);

    // Summary title
    addText(doc, "Order Summary", summaryX + summaryWidth / 2, y + 10, {
      fontSize: 12,
      textColor: colors.secondary,
      fontStyle: "bold",
      align: "center",
    });

    // Summary details
    // Items count
    addText(doc, `Items (${totalItems}):`, summaryX + 5, y + 25, {
      fontSize: 10,
      textColor: colors.darkGray,
    });

    addPrice(
      doc,
      orderDetails.subtotal || orderDetails.total,
      summaryX + summaryWidth - 5,
      y + 25,
      {
        fontSize: 9,
        textColor: colors.secondary,
        fontStyle: "bold",
        align: "right",
      }
    );

    // Shipping
    addText(doc, "Shipping:", summaryX + 5, y + 35, {
      fontSize: 10,
      textColor: colors.darkGray,
    });

    addPrice(
      doc,
      orderDetails.shipping || 0,
      summaryX + summaryWidth - 5,
      y + 35,
      {
        fontSize: 9,
        textColor: colors.secondary,
        fontStyle: "bold",
        align: "right",
      }
    );

    // Total
    addText(doc, "Total:", summaryX + 5, y + 50, {
      fontSize: 11,
      textColor: colors.secondary,
      fontStyle: "bold",
    });

    addPrice(doc, orderDetails.total, summaryX + summaryWidth - 5, y + 50, {
      fontSize: 10,
      textColor: colors.secondary,
      fontStyle: "bold",
      align: "right",
    });

    return y + 70;
  };

  // Function to add payment information
  const addPaymentInfo = (y) => {
    doc.setFillColor(
      colors.lightGray.r,
      colors.lightGray.g,
      colors.lightGray.b
    );
    addRoundedRect(
      doc,
      margin + 10,
      y,
      contentWidth - 20,
      30,
      3,
      colors.lightGray
    );

    addText(doc, "Payment Information", margin + 15, y + 10, {
      fontSize: 12,
      textColor: colors.secondary,
      fontStyle: "bold",
    });

    addText(
      doc,
      `Method: ${orderDetails.payment?.method || "Credit Card"}`,
      margin + 15,
      y + 20,
      {
        fontSize: 10,
        textColor: colors.darkGray,
      }
    );

    if (orderDetails.payment?.transactionId) {
      addText(
        doc,
        `Transaction ID: ${orderDetails.payment.transactionId}`,
        margin + 15,
        y + 27,
        {
          fontSize: 10,
          textColor: colors.darkGray,
        }
      );
    }

    return y + 40;
  };

  // Generate all pages
  for (let pageNum = 0; pageNum < totalPages; pageNum++) {
    // Add new page if not the first page
    if (pageNum > 0) {
      doc.addPage();
    }

    // Add header to the page
    let y = addHeader(pageNum + 1);

    // Calculate start and end item indices for this page
    const startItemIndex = pageNum * itemsPerPage;
    const endItemIndex = Math.min(
      (pageNum + 1) * itemsPerPage,
      orderDetails.items.length
    );

    // Add items table
    y = addItemsTable(y, startItemIndex, endItemIndex);

    // Add summary section on the last page
    if (pageNum === totalPages - 1) {
      y = addSummary(y);

      // Add payment information
      y = addPaymentInfo(y);

      // Add footer
      addFooter(pageHeight - margin - 30);
    } else {
      // Add "Continued on next page" text
      addText(
        doc,
        "Continued on next page...",
        pageWidth / 2,
        pageHeight - margin - 30,
        {
          fontSize: 10,
          textColor: colors.mediumGray,
          align: "center",
        }
      );
    }

    // Add watermark
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.setFont(undefined, "bold");
    doc.text("EBRIKKHO", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45,
    });
  }

  // Save the PDF
  doc.save(`invoice-${orderDetails.orderNumber}.pdf`);
};
