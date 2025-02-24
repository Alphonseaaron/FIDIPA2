import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';
import Team from '../sections/Team';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({
    home: true,
    about: true,
    programs: true,
    projects: true,
    team: true,
    blog: false, // Blog section hidden
    contact: true
  });

  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('sections')
          .single();
        
        if (error) {
          console.error('Error fetching site config:', error);
          return;
        }
        
        if (data?.sections) {
          // Override blog visibility to false
          setVisibleSections({
            ...data.sections,
            blog: false
          });
        }
      } catch (error) {
        console.error('Error in fetchSiteConfig:', error);
      }
    };

    fetchSiteConfig();
  }, []);

  return (
    <div>
      {visibleSections.home && <HomeHero />}
      {visibleSections.about && <About />}
      {visibleSections.programs && <Programs />}
      {visibleSections.projects && <Projects />}
      {visibleSections.team && <Team />}
      {visibleSections.contact && <Contact />}
    </div>
  );
}