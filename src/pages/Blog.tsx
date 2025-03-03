import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const blogPosts = [
  {
    title: "Empowering Communities Through Sustainable Development",
    content: "Our sustainable development initiatives are transforming rural communities through innovative approaches to poverty alleviation, environmental conservation, and economic empowerment...",
    author: "Jayne Wasonga",
    date: "2024-02-15",
    imageUrl: "/images/Women Land and Property Rights 1.jpg"
  },
  {
    title: "The Impact of Gender Equality Programs",
    content: "Our gender equality initiatives have shown remarkable success in transforming communities and individual lives...",
    author: "Jayne Wasonga",
    date: "2024-02-10",
    imageUrl: "/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg"
  },
  {
    title: "Innovation in Rural Healthcare Delivery",
    content: "We're revolutionizing healthcare delivery in remote and underserved areas through innovative approaches and community partnerships...",
    author: "Jayne Wasonga",
    date: "2024-02-05",
    imageUrl: "/images/Girls Education and Mentorship Project 1.jpg"
  }
];

export default function Blog() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Blog
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:shadow-none transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link 
                  to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Read More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}