import React from 'react';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';
import Team from '../sections/Team';
import Gallery from '../sections/Gallery';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <About />
      <Programs />
      <Team />
      <Gallery />
      <Contact />
    </div>
  );
}