import React from 'react';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';
import Team from '../sections/Team';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <About />
      <Programs />
      <Projects />
      <Team />
      <Contact />
    </div>
  );
}