import {
  ShoppingCart,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  Leaf,
  Users,
  User,
  Award,
  Droplet,
  Sun,
  Flower,
  Bug,
  Home,
  Building2,
  Trees,
  Gift,
} from "lucide-react";

export const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
    title: "Transform Your Space with Nature",
    description:
      "Discover the perfect plants to create a serene and beautiful environment in your home or office",
    buttonText: "Explore Collection",
    buttonLink: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1920&auto=format&fit=crop&q=60",
    title: "Expert Plant Care Services",
    description:
      "Let our plant experts help you create and maintain the perfect green environment",
    buttonText: "Learn More",
    buttonLink: "/services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
    title: "Join Our Plant Community",
    description:
      "Connect with fellow plant enthusiasts, share your journey, and get expert advice",
    buttonText: "Join Now",
    buttonLink: "/community",
  },
];

export const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    slug: "indoor-plants",
    icon: <Home className="w-12 h-12" />,
    description: "Perfect for your living spaces",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 24,
  },
  {
    id: 2,
    name: "Office Plants",
    slug: "office-plants",
    icon: <Building2 className="w-12 h-12" />,
    description: "Enhance your workspace",
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 18,
  },
  {
    id: 3,
    name: "Outdoor Plants",
    slug: "outdoor-plants",
    icon: <Trees className="w-12 h-12" />,
    description: "Transform your garden",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 12,
  },
  {
    id: 4,
    name: "Gift Plants",
    slug: "gift-plants",
    icon: <Gift className="w-12 h-12" />,
    description: "Perfect for any occasion",
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    count: 15,
  },
];

export const features = [
  {
    title: "Shop Plants",
    description: "Browse our wide selection of indoor and outdoor plants",
    icon: <ShoppingCart className="w-6 h-6" />,
    link: "/shop",
  },
  {
    title: "Plant Care Guide",
    description: "Learn how to care for your plants with our expert tips",
    icon: <BookOpen className="w-6 h-6" />,
    link: "/plant-care",
  },
  {
    title: "Our Gallery",
    description: "View inspiring plant arrangements and customer projects",
    icon: <ImageIcon className="w-6 h-6" />,
    link: "/gallery",
  },
  {
    title: "Testimonials",
    description: "Read what our customers say about our services",
    icon: <MessageSquare className="w-6 h-6" />,
    link: "/testimonials",
  },
  {
    title: "About Us",
    description: "Learn about our story and mission",
    icon: <Leaf className="w-6 h-6" />,
    link: "/about",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our plant experts",
    icon: <Phone className="w-6 h-6" />,
    link: "/contact",
  },
];

export const stats = [
  {
    number: "5000+",
    label: "Happy Customers",
    icon: <Users className="w-8 h-8" />,
  },
  {
    number: "100+",
    label: "Plant Varieties",
    icon: <Leaf className="w-8 h-8" />,
  },
  {
    number: "50+",
    label: "Expert Staff",
    icon: <User className="w-8 h-8" />,
  },
  {
    number: "10+",
    label: "Years Experience",
    icon: <Award className="w-8 h-8" />,
  },
];

export const plantCareTips = [
  {
    title: "Watering Guide",
    description:
      "Learn the right way to water your plants based on their type and season",
    icon: <Droplet className="w-6 h-6" />,
  },
  {
    title: "Light Requirements",
    description: "Understand how much light your plants need to thrive",
    icon: <Sun className="w-6 h-6" />,
  },
  {
    title: "Soil & Fertilizer",
    description:
      "Choose the right soil and fertilizer for healthy plant growth",
    icon: <Flower className="w-6 h-6" />,
  },
  {
    title: "Pest Control",
    description: "Natural ways to keep your plants pest-free",
    icon: <Bug className="w-6 h-6" />,
  },
];

export const contactInfo = {
  address: "123 Green Street, Plant City",
  phone: "+1 234 567 890",
  localPhone: "01518926700",
  email: "hello@ebrikkho.com",
  location: "Mirpur DOHS, Road 10, Avenue 10, House 1217",
};

export const homepageData = {
  featuredProducts: [
    {
      id: 1,
      name: "Premium Plant Pot",
      description: "Handcrafted ceramic pot with drainage hole",
      price: 800,
      originalPrice: 1000,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Succulent Collection",
      description: "Set of 3 rare succulents in decorative pots",
      price: 1500,
      originalPrice: 1800,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 3,
      name: "Plant Care Kit",
      description: "Complete kit with tools and fertilizers",
      price: 1200,
      originalPrice: 1500,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Hanging Plant Basket",
      description: "Macrame plant hanger with ceramic pot",
      price: 1000,
      originalPrice: 1200,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
  ],
  bestSellers: [
    {
      id: 5,
      name: "Monstera Deliciosa",
      description: "Large tropical plant with distinctive leaves",
      price: 2500,
      originalPrice: 3000,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 6,
      name: "Plant Stand Set",
      description: "Set of 3 modern plant stands",
      price: 2000,
      originalPrice: 2500,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 7,
      name: "Watering Can",
      description: "Stainless steel watering can with long spout",
      price: 600,
      originalPrice: 800,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 8,
      name: "Plant Mister",
      description: "Fine mist sprayer for tropical plants",
      price: 400,
      originalPrice: 500,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: false,
      isBestSeller: true,
    },
  ],
  newArrivals: [
    {
      id: 9,
      name: "Rare Philodendron",
      description: "Variegated philodendron with unique patterns",
      price: 3000,
      originalPrice: 3500,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 10,
      name: "Smart Plant Monitor",
      description: "Digital monitor for soil moisture and light",
      price: 1500,
      originalPrice: 1800,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 11,
      name: "Plant Propagation Kit",
      description: "Complete kit for growing new plants",
      price: 1200,
      originalPrice: 1500,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 12,
      name: "Decorative Plant Labels",
      description: "Set of 10 ceramic plant labels",
      price: 500,
      originalPrice: 600,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop&q=60",
      isNew: true,
      isBestSeller: false,
    },
  ],
};
