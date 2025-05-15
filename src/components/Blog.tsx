import { useState } from "react";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Advancing Health Equity Through Community Engagement",
    excerpt:
      "Exploring the critical role of community engagement in addressing healthcare disparities and promoting health equity...",
    category: "Health Equity",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog-1.jpg",
  },
  {
    id: 2,
    title: "The Impact of Living Kidney Donation Programs",
    excerpt:
      "A deep dive into how living kidney donation programs are transforming lives and communities...",
    category: "Kidney Health",
    date: "March 10, 2024",
    readTime: "7 min read",
    image: "/blog-2.jpg",
  },
  {
    id: 3,
    title: "Cultural Humility in Healthcare: A Personal Journey",
    excerpt:
      "Reflections on the importance of cultural humility in healthcare delivery and patient advocacy...",
    category: "Healthcare",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/blog-3.jpg",
  },
];

const categories = [
  "All",
  "Health Equity",
  "Kidney Health",
  "Healthcare",
  "Advocacy",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="bg-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-[#2D6FAB] mb-10 text-center tracking-wide">
          Latest Insights
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#2D6FAB] text-white"
                  : "bg-[#E9E9ED] text-gray-700 hover:bg-[#2D6FAB] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#2D6FAB] text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-[#2D6FAB] font-medium hover:text-[#1e4e7a] transition-colors">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-[#E9E9ED] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to receive the latest insights on health equity, kidney
            health, and advocacy.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#2D6FAB]"
            />
            <button
              type="submit"
              className="bg-[#2D6FAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4e7a] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Blog;
