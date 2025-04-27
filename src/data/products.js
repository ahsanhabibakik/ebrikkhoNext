export const categories = [
  {
    id: 1,
    name: "All Plants",
    slug: "all",
    icon: "🌿",
  },
  {
    id: 2,
    name: "Indoor Plants",
    slug: "indoor",
    icon: "🏠",
  },
  {
    id: 3,
    name: "Outdoor Plants",
    slug: "outdoor",
    icon: "🌳",
  },
  {
    id: 4,
    name: "Flowering Plants",
    slug: "flowering",
    icon: "🌸",
  },
  {
    id: 5,
    name: "Succulents",
    slug: "succulents",
    icon: "🌵",
  },
  {
    id: 6,
    name: "Herbs",
    slug: "herbs",
    icon: "🌱",
  },
  {
    id: 7,
    name: "Bonsai",
    slug: "bonsai",
    icon: "🎋",
  },
  {
    id: 8,
    name: "Air Plants",
    slug: "air-plants",
    icon: "💨",
  },
];

export const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 1200,
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Indoor Plants",
    description: "A popular tropical plant known for its large, glossy, perforated leaves. Perfect for adding a touch of the jungle to your home.",
    rating: 4.5,
    reviews: 128,
    isNew: true,
    isBestSeller: true,
    stock: 15,
    care: {
      light: "Bright indirect light",
      water: "Water when top soil is dry",
      humidity: "High humidity preferred",
      temperature: "65-85°F (18-29°C)"
    }
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 800,
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Indoor Plants",
    description: "A hardy plant with stiff, upright leaves that are often variegated. Known for its air-purifying qualities and low maintenance needs.",
    rating: 4.8,
    reviews: 95,
    isNew: false,
    isBestSeller: true,
    stock: 20,
    care: {
      light: "Low to bright indirect light",
      water: "Water sparingly",
      humidity: "Tolerates low humidity",
      temperature: "60-85°F (15-29°C)"
    }
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: 1500,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Indoor Plants",
    description: "A stunning plant with large, violin-shaped leaves. Makes a bold statement in any room.",
    rating: 4.3,
    reviews: 76,
    isNew: true,
    isBestSeller: false,
    stock: 10,
    care: {
      light: "Bright indirect light",
      water: "Water when top soil is dry",
      humidity: "Moderate humidity",
      temperature: "65-75°F (18-24°C)"
    }
  },
  {
    id: 4,
    name: "Peace Lily",
    price: 900,
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Indoor Plants",
    description: "An elegant plant with glossy leaves and white flowers. Known for its air-purifying properties.",
    rating: 4.6,
    reviews: 112,
    isNew: false,
    isBestSeller: true,
    stock: 18,
    care: {
      light: "Low to bright indirect light",
      water: "Keep soil moist",
      humidity: "High humidity preferred",
      temperature: "65-80°F (18-27°C)"
    }
  },
  {
    id: 5,
    name: "Succulent Collection",
    price: 600,
    image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Succulents",
    description: "A beautiful collection of various succulents, perfect for beginners and collectors alike.",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isBestSeller: false,
    stock: 25,
    care: {
      light: "Bright direct light",
      water: "Water sparingly",
      humidity: "Low humidity",
      temperature: "60-80°F (15-27°C)"
    }
  },
  {
    id: 6,
    name: "Bonsai Tree",
    price: 2000,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Bonsai",
    description: "A carefully cultivated miniature tree, perfect for adding a touch of zen to your space.",
    rating: 4.9,
    reviews: 45,
    isNew: false,
    isBestSeller: true,
    stock: 8,
    care: {
      light: "Bright indirect light",
      water: "Keep soil moist",
      humidity: "Moderate humidity",
      temperature: "60-75°F (15-24°C)"
    }
  }
];

export const sortOptions = [
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];
