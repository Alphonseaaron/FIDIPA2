import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import BackButton from '../components/BackButton';
import { Loader2 } from 'lucide-react';

type Program = Database['public']['Tables']['programs']['Row'];

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrograms();

    const channel = supabase
      .channel('programs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'programs' },
        () => {
          fetchPrograms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Our Programs
        </motion.h1>
        
        <div className="space-y-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg dark:shadow-none"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={program.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600'} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {program.description}
                  </p>
                  
                  {program.content && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {program.content.split('•').slice(1).map((point, idx) => (
                        <div 
                          key={idx}
                          className="bg-light-darker dark:bg-dark p-4 rounded-lg"
                        >
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {point.trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Link
                    to={`/programs/${program.slug}`}
                    className="mt-6 inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}