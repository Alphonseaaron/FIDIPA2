import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const staffMembers = [
  {
    id: "1",
    name: "Ms Jayne A. I. Wasonga",
    role: "Board Secretary and Chief Executive Officer"
  },
  {
    id: "2",
    name: "Ms Jesca Mitaya",
    role: "Finance and Administration FAM Manager"
  },
  {
    id: "3",
    name: "Ms Linda Otieno",
    role: "Project Lead (Volunteer)"
  },
  {
    id: "4",
    name: "Rev. Walter Ang'ienda",
    role: "Program Officer Peace Project (Volunteer)"
  },
  {
    id: "5",
    name: "Phillip Noel",
    role: "Volunteer, Soft Skills (Water and Sanitation)"
  },
  {
    id: "6",
    name: "Jackson Lesian",
    role: "Office Assistant/Driver"
  },
  {
    id: "7",
    name: "Jamima Mtuli",
    role: "Administer/Programs Assistant"
  }
];

const boardMembers = [
  {
    id: "1",
    name: "Mrs Rosemary Meyo",
    role: "Chairperson - Governance and Administration Expert"
  },
  {
    id: "2",
    name: "Dr. Josephine Munthali",
    role: "Vice Chairperson - Gender and Education Expert"
  },
  {
    id: "3",
    name: "Ms Jayne A. Wasonga",
    role: "Chief Executive Officer and Board Secretary"
  },
  {
    id: "4",
    name: "Sr. Mildred Mayeye",
    role: "Treasurer"
  },
  {
    id: "5",
    name: "Dr. Rev. Simon Oriedo",
    role: "Committee Member"
  },
  {
    id: "6",
    name: "Mr. Samwel Otieno",
    role: "Committee Member"
  },
  {
    id: "7",
    name: "Prof. Esther Mombo",
    role: "Committee Member"
  },
  {
    id: "8",
    name: "Ms Leah O. Wanaswa",
    role: "Committee Member"
  }
];

function TeamCarousel({ members }: { members: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= members.length ? 0 : prev + itemsPerPage
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev - itemsPerPage < 0 ? Math.max(0, members.length - itemsPerPage) : prev - itemsPerPage
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleMembers = members.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col h-full items-center text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary" />
                </div>
                <div className="flex-1 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated individuals who work tirelessly to make our mission a reality.
          </p>
        </motion.div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Staff Members</h3>
            <TeamCarousel members={staffMembers} />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Board of Advisory</h3>
            <TeamCarousel members={boardMembers} />
          </div>
        </div>
      </div>
    </section>
  );
}