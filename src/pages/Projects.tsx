import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { projects } from '../data';
import ImageCarousel from '../components/ImageCarousel';

export default function Projects() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Our Projects
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:shadow-none transform transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageCarousel 
                  images={project.images}
                  className="h-full"
                  interval={4000}
                  showControls={false}
                  showIndicators={false}
                />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <Link 
                  to={`/projects/${project.slug}`}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Learn More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}