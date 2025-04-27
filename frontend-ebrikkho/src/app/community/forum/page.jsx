"use client";

import { useState } from "react";
import { MessageSquare, Users, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: 1,
      name: "General Discussion",
      description: "Talk about anything related to plants and gardening",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 125,
      posts: 450,
    },
    {
      id: 2,
      name: "Plant Care",
      description: "Share tips and ask questions about plant care",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 98,
      posts: 320,
    },
    {
      id: 3,
      name: "Plant Identification",
      description: "Help identify unknown plants and share your knowledge",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 75,
      posts: 210,
    },
    {
      id: 4,
      name: "Garden Design",
      description: "Share your garden designs and get inspiration",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 65,
      posts: 180,
    },
    {
      id: 5,
      name: "Plant Problems",
      description: "Discuss plant diseases, pests, and solutions",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 110,
      posts: 380,
    },
    {
      id: 6,
      name: "Plant Swap",
      description: "Trade plants and cuttings with other members",
      icon: <MessageSquare className="w-6 h-6" />,
      topics: 45,
      posts: 150,
    },
  ];

  const recentTopics = [
    {
      id: 1,
      title: "Help! My Monstera leaves are turning yellow",
      category: "Plant Problems",
      author: "PlantLover123",
      replies: 12,
      views: 150,
      lastReply: "2 hours ago",
    },
    {
      id: 2,
      title: "Best indoor plants for low light conditions",
      category: "Plant Care",
      author: "GreenThumb",
      replies: 8,
      views: 95,
      lastReply: "3 hours ago",
    },
    {
      id: 3,
      title: "Can anyone identify this plant?",
      category: "Plant Identification",
      author: "NewPlantParent",
      replies: 5,
      views: 75,
      lastReply: "4 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Community Forum
            </h1>
            <p className="text-gray-600">
              Connect with fellow plant enthusiasts and share your knowledge
            </p>
          </div>
          <Link
            href="/community/forum/new-topic"
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Topic
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/community/forum/category/${category.id}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{category.topics} topics</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{category.posts} posts</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Topics
          </h2>
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/community/forum/topic/${topic.id}`}
                className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{topic.category}</span>
                      <span>by {topic.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-medium">{topic.replies}</div>
                      <div>replies</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{topic.views}</div>
                      <div>views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Last reply</div>
                      <div>{topic.lastReply}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
