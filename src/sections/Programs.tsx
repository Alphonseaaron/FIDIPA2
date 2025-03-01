import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { programs } from '../data';
import ImageCarousel from '../components/ImageCarousel';

export default function Programs() {
  const [displayedPrograms, setDisplayedPrograms] = useState(programs.slice(0, 3));

  return (
    <section id="programs" className="py-20 relative bg-light dark:bg-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center opacity-50 dark:opacity-40" />
      <div className="absolute inset-0 bg-white/80 dark:bg-dark/60 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Our Programs
          </motion.h2>
          <Link 
            to="/programs"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Programs
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {displayedPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark-lighter/80 shadow-lg dark:shadow-none backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent/50 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <ImageCarousel 
                  images={program.images}
                  className="h-full"
                  interval={4000}
                  showControls={false}
                  showIndicators={false}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {program.description}
                </p>
                <Link 
                  to={`/programs/${program.slug}`}
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