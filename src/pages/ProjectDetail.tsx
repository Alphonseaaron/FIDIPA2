import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { projects } from '../data';
import ImageCarousel from '../components/ImageCarousel';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Project details for the specific project
  const projectDetails = {
    timeline: {
      start: "January 2024",
      end: "December 2024"
    },
    objectives: [
      "Enhance community leadership skills",
      "Promote sustainable development practices",
      "Build local capacity for project management",
      "Establish long-term community development frameworks"
    ],
    impact: {
      beneficiaries: "1,000+",
      communities: "15",
      workshops: "25",
      trainedLeaders: "100"
    },
    achievements: [
      "Conducted 25 leadership workshops",
      "Trained 100 community leaders",
      "Implemented 15 community projects",
      "Established 5 sustainable programs"
    ]
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <ImageCarousel 
              images={project.images}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full text-sm font-medium text-white">
              {project.status}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>
              <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
                <span>Start: {projectDetails.timeline.start}</span>
                <span>•</span>
                <span>End: {projectDetails.timeline.end}</span>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Objectives</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projectDetails.objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-dark-lighter p-4 rounded-lg flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Impact</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(projectDetails.impact).map(([key, value]) => (
                  <div key={key} className="bg-white dark:bg-dark-lighter p-6 rounded-lg text-center shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Key Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projectDetails.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-dark-lighter p-4 rounded-lg flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}