import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
  '/images/Women Land and Property Rights 1.jpg',
  '/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
  '/images/Girls Education and Mentorship Project 1.jpg',
  '/images/Agriculture and Information Technology 1.jpg',
  '/images/Soft Skills Training and Leadership training 1.jpg',
  '/images/Women in Leadership  and Socio-economic Project 1.jpg',
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Photo Gallery
          </motion.h2>
          <Link 
            to="/gallery"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Photos
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-square">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link
                  to="/gallery"
                  className="text-white hover:text-primary transition-colors"
                >
                  View Gallery
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}