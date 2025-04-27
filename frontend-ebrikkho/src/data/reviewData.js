export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: "John Doe",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    title: "Excellent quality and fast delivery",
    comment:
      "The plant arrived in perfect condition and was well packaged. It's growing beautifully in my home office. Highly recommend!",
    date: "2024-04-15",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: "Sarah Smith",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 4,
    title: "Good plant, but pricey",
    comment:
      "The plant is healthy and beautiful, but I think it's a bit overpriced compared to other sellers. The customer service was excellent though.",
    date: "2024-04-10",
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    productId: 2,
    userId: 3,
    userName: "Michael Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    title: "Perfect addition to my garden",
    comment:
      "This succulent is exactly what I was looking for. It's thriving in my garden and adds a nice touch to the overall design.",
    date: "2024-04-05",
    verified: true,
    helpful: 15,
  },
  {
    id: 4,
    productId: 2,
    userId: 4,
    userName: "Emily Brown",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 3,
    title: "Nice but needs more care instructions",
    comment:
      "The plant is nice, but I would have appreciated more detailed care instructions. It's doing okay now, but I had to do some research on my own.",
    date: "2024-04-01",
    verified: true,
    helpful: 5,
  },
  {
    id: 5,
    productId: 3,
    userId: 5,
    userName: "David Wilson",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    title: "Beautiful bonsai tree",
    comment:
      "This bonsai tree is absolutely stunning. The craftsmanship is excellent, and it came with detailed care instructions. Worth every penny!",
    date: "2024-03-28",
    verified: true,
    helpful: 20,
  },
];

export const getProductReviews = (productId) => {
  return reviews.filter((review) => review.productId === productId);
};

export const getAverageRating = (productId) => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / productReviews.length;
};

export const getRatingDistribution = (productId) => {
  const productReviews = getProductReviews(productId);
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  productReviews.forEach((review) => {
    distribution[review.rating]++;
  });

  return distribution;
};
