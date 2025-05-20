import React from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const images = [
  '/images/Women Land and Property Rights 1.jpg',
  '/images/Women Land and Property Rights 2.jpg',
  '/images/Women Land and Property Rights 3.jpg',
  '/images/Women Land and Property Rights 4.jpg',
  '/images/Women in and out of prisons project 1.jpg',
  '/images/Women in and out of prisons project 2.jpg',
  '/images/Women in and out of prisons project 3.jpg',
  '/images/Girls Education and Mentorship Project 1.jpg',
  '/images/Girls Education and Mentorship Project 2.jpg',
  '/images/Girls Education and Mentorship Project 3.jpg',
  '/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
  '/images/Environment, Food Security, Resilience and Livelihood Program 2.jpg',
  '/images/Environment, Food Security, Resilience and Livelihood Program 3.jpg',
  '/images/Agriculture and Information Technology 1.jpg',
  '/images/Agriculture and Information Technology 2.jpg',
  '/images/Agriculture and Information Technology 3.jpg',
  '/images/Soft Skills Training and Leadership training 1.jpg',
  '/images/Soft Skills Training and Leadership training 2.jpg',
  '/images/Soft Skills Training and Leadership training 3.jpg',
  '/images/Women in Leadership  and Socio-economic Project 1.jpg',
  '/images/Women in Leadership  and Socio-economic Project 2.jpg',
  '/images/Women in Leadership  and Socio-economic Project 3.jpg',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Photo Gallery
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">Click to view</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedImage}
                alt="Selected gallery image"
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}