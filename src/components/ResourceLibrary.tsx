import { useState } from "react";
import { motion } from "framer-motion";

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "pdf" | "video" | "article";
  fileUrl: string;
  thumbnail: string;
  date: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Kidney Health",
    description:
      "A comprehensive guide to kidney health, prevention, and early detection.",
    category: "Education",
    type: "pdf",
    fileUrl: "/resources/kidney-health-guide.pdf",
    thumbnail: "/resources/thumb-1.jpg",
    date: "March 2024",
  },
  {
    id: 2,
    title: "Living Donation Process",
    description:
      "Step-by-step guide to the living donation process and what to expect.",
    category: "Process",
    type: "pdf",
    fileUrl: "/resources/donation-process.pdf",
    thumbnail: "/resources/thumb-2.jpg",
    date: "February 2024",
  },
  {
    id: 3,
    title: "Community Engagement Strategies",
    description:
      "Best practices for engaging communities in health equity initiatives.",
    category: "Advocacy",
    type: "article",
    fileUrl: "/resources/community-engagement.html",
    thumbnail: "/resources/thumb-3.jpg",
    date: "January 2024",
  },
];

const categories = ["All", "Education", "Process", "Advocacy"];
const types = ["All", "pdf", "video", "article"];

const ResourceLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType =
      selectedType === "All" || resource.type === selectedType;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <section id="resources" className="bg-[#E9E9ED] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-[#2D6FAB] mb-10 text-center tracking-wide">
          Resource Library
        </h2>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#2D6FAB] text-white"
                      : "bg-white text-gray-700 hover:bg-[#2D6FAB] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedType === type
                      ? "bg-[#2D6FAB] text-white"
                      : "bg-white text-gray-700 hover:bg-[#2D6FAB] hover:text-white"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#2D6FAB] text-white px-3 py-1 rounded-full text-sm">
                    {resource.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>{resource.category}</span>
                  <span>•</span>
                  <span>{resource.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <a
                  href={resource.fileUrl}
                  download
                  className="inline-flex items-center gap-2 bg-[#2D6FAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4e7a] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let us know what resources would be helpful for you, and we'll work
            on creating them.
          </p>
          <button className="bg-[#2D6FAB] text-white px-8 py-3 rounded-lg hover:bg-[#1e4e7a] transition-colors">
            Request Resource
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourceLibrary;
