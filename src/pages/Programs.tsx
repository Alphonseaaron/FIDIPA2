import React from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const programs = [
  {
    title: "Gender Equality and Social Inclusion Program",
    description: "Promoting gender equity and equality as fundamental Human Rights and democratic principles. We empower local communities to address gender inequality and social inclusion through comprehensive training and support programs.",
    image: "/src/assets/images/Women Land and Property Rights 1.jpg",
    subPrograms: [
      {
        name: "Women Land and Property Rights",
        description: "Strengthening land rights to build opportunity and improve outcomes for rural women and men, with a focus on widows and women with disabilities."
      },
      {
        name: "Women in and out of prisons",
        description: "Supporting women affected by the justice system through socio-economic empowerment and rehabilitation services."
      },
      {
        name: "Girls Education and Mentorship",
        description: "Empowering girls from rural and urban poor schools through career development and mentorship to reduce teenage pregnancy and school dropout rates."
      },
      {
        name: "Women in Leadership and Socio-economic Project",
        description: "Promoting women's participation in leadership, politics, and environmental positions to address gender disparities in governance."
      }
    ]
  },
  {
    title: "Orphans/Vulnerable Children Project",
    description: "Supporting grandmothers caring for orphans and vulnerable children (OVC) affected by HIV/AIDS and post-COVID-19, focusing on improving food security, nutrition, health, and socio-economic status.",
    image: "/src/assets/images/Orphans or Vulnerable Children Project 1.jpg",
    subPrograms: [
      {
        name: "Health Support",
        description: "Providing healthcare access and support for affected families."
      },
      {
        name: "Nutrition Programs",
        description: "Ensuring proper nutrition for vulnerable children and their caregivers."
      },
      {
        name: "Economic Empowerment",
        description: "Creating sustainable income opportunities for grandmother-led households."
      },
      {
        name: "Education Support",
        description: "Facilitating access to education for orphans and vulnerable children."
      }
    ]
  },
  {
    title: "Environment, Food Security, Resilience and Livelihood Program",
    description: "Increasing resilience to environmental threats and improving food security through sustainable farming methods and conservation agriculture.",
    image: "/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg",
    subPrograms: [
      {
        name: "Sustainable Land Management",
        description: "Implementing sustainable farming practices and soil conservation techniques."
      },
      {
        name: "Income Generation",
        description: "Developing stable sources of income through agricultural activities."
      },
      {
        name: "Natural Resource Management",
        description: "Training communities in sustainable use of natural resources."
      },
      {
        name: "Climate Resilience",
        description: "Building community resilience against climate change impacts."
      }
    ]
  },
  {
    title: "Agriculture and Information Technology",
    description: "Enhancing technology adoption and promoting youth technical entrepreneurship in agriculture and infrastructure development.",
    image: "/src/assets/images/Agriculture and Information Technology 1.jpg",
    subPrograms: [
      {
        name: "Digital Agriculture",
        description: "Implementing smart farming solutions and digital agricultural technologies."
      },
      {
        name: "Youth Empowerment",
        description: "Supporting youth participation in agricultural entrepreneurship."
      },
      {
        name: "Online Networking",
        description: "Improving livelihood through digital networking and online agribusiness."
      },
      {
        name: "Infrastructure Development",
        description: "Enhancing agricultural infrastructure in schools and colleges."
      }
    ]
  },
  {
    title: "Soft Skills Training and Leadership",
    description: "Supporting TVET and NITA graduates through comprehensive skills development and leadership training programs.",
    image: "/src/assets/images/Soft Skills Training and Leadership training 1.jpg",
    subPrograms: [
      {
        name: "Business Start-up Skills",
        description: "Training in essential business development and management skills."
      },
      {
        name: "Entrepreneurial Mindset",
        description: "Developing entrepreneurial thinking and opportunity recognition."
      },
      {
        name: "Creative Thinking",
        description: "Fostering innovation and problem-solving abilities."
      },
      {
        name: "Visionary Leadership",
        description: "Building leadership capabilities for community development."
      }
    ]
  }
];

export default function Programs() {
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
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg dark:shadow-none"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{program.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{program.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.subPrograms.map((subProgram, idx) => (
                      <div 
                        key={idx}
                        className="bg-light-darker dark:bg-dark p-4 rounded-lg"
                      >
                        <h3 className="text-lg font-semibold mb-2 text-primary">
                          {subProgram.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {subProgram.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}