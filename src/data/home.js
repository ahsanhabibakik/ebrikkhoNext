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
} from "lucide-react";

export const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
    title: "Bring Nature Into Your Space",
    description:
      "Discover the perfect plants for your home or office with Ebrikkho",
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1920&auto=format&fit=crop&q=60",
    title: "Expert Plant Care Services",
    description:
      "Let our plant experts help you create the perfect green environment",
    buttonText: "Learn More",
    buttonLink: "/services",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=1920&auto=format&fit=crop&q=60",
    title: "Join Our Plant Community",
    description: "Connect with fellow plant enthusiasts and share your journey",
    buttonText: "Join Now",
    buttonLink: "/community",
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
