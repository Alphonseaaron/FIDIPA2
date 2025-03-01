import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { programs } from '../data';
import ImageCarousel from '../components/ImageCarousel';

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find(p => p.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Program Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The program you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px]">
            <ImageCarousel 
              images={program.images}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{program.title}</h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {program.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Key Components</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {program.content.split('•').slice(1).map((point, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-dark-lighter p-4 rounded-lg flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{point.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Program Impact</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">
                    5,000+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">People Reached</div>
                </div>
                <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">
                    20+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Communities Served</div>
                </div>
                <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg text-center shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">
                    90%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}