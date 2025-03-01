import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data';
import ImageCarousel from '../components/ImageCarousel';

export default function Projects() {
  const [displayedProjects, setDisplayedProjects] = useState(projects.slice(0, 3));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Our Projects
          </motion.h2>
          <Link 
            to="/projects"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Projects
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark shadow-lg dark:shadow-none rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300"
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
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
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
    </section>
  );
}