import { getAllTopicImages } from '../lib/utils';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  status: 'ongoing' | 'completed';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  images: string[];
  author: string;
  authorPhoto?: string;
  authorBio?: string;
  status: 'draft' | 'published' | 'pending';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  sortOrder: number;
}

export interface SiteConfig {
  name: string;
  metaTitle: string;
  metaDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  sections: {
    home: boolean;
    about: boolean;
    programs: boolean;
    projects: boolean;
    team: boolean;
    blog: boolean;
    contact: boolean;
  };
}

// Site Configuration
export const siteConfig: SiteConfig = {
  name: 'FIDIPA',
  metaTitle: 'FIDIPA - Friendly Integrated Development Initiative in Poverty Alleviation',
  metaDescription: 'A holistic peaceful and democratic society with justice for all',
  socialLinks: {
    facebook: 'https://facebook.com/fidipa',
    twitter: 'https://twitter.com/fidipa'
  },
  sections: {
    home: true,
    about: true,
    programs: true,
    projects: true,
    team: true,
    blog: false,
    contact: true
  }
};

// Staff Members
export const staffMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ms Jayne A. I. Wasonga',
    role: 'Board Secretary and Chief Executive Officer',
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Ms Jesca Mitaya',
    role: 'Finance and Administration FAM Manager',
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Ms Linda Otieno',
    role: 'Project Lead (Volunteer)',
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Rev. Walter Ang\'ienda',
    role: 'Program Officer Peace Project (Volunteer)',
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Phillip Noel',
    role: 'Volunteer, Soft Skills (Water and Sanitation)',
    sortOrder: 5
  },
  {
    id: '6',
    name: 'Jackson Lesian',
    role: 'Office Assistant/Driver',
    sortOrder: 6
  },
  {
    id: '7',
    name: 'Jamima Mtuli',
    role: 'Administer/Programs Assistant',
    sortOrder: 7
  }
];

// Board Members
export const boardMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Mrs Rosemary Meyo',
    role: 'Chairperson - Governance and Administration Expert',
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Dr. Josephine Munthali',
    role: 'Vice Chairperson - Gender and Education Expert',
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Ms Jayne A. Wasonga',
    role: 'Chief Executive Officer and Board Secretary',
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Sr. Mildred Mayeye',
    role: 'Treasurer',
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Dr. Rev. Simon Oriedo',
    role: 'Committee Member',
    sortOrder: 5
  },
  {
    id: '6',
    name: 'Mr. Samwel Otieno',
    role: 'Committee Member',
    sortOrder: 6
  },
  {
    id: '7',
    name: 'Prof. Esther Mombo',
    role: 'Committee Member',
    sortOrder: 7
  },
  {
    id: '8',
    name: 'Ms Leah O. Wanaswa',
    role: 'Committee Member',
    sortOrder: 8
  }
];

// Programs data (previously from CSV)
export const programs: Program[] = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Gender Equality and Social Inclusion Program",
    slug: "gender-equality-and-social-inclusion",
    description: "Promoting gender equity and equality as fundamental Human Rights and democratic principles. We empower local communities to address gender inequality and social inclusion through comprehensive training and support programs.",
    content: "• Women Land and Property Rights: Strengthening land rights to build opportunity and improve outcomes for rural women and men, with a focus on widows and women with disabilities.\n\n• Women in and out of prisons: Supporting women affected by the justice system through socio-economic empowerment and rehabilitation services.\n\n• Girls Education and Mentorship: Empowering girls from rural and urban poor schools through career development and mentorship to reduce teenage pregnancy and school dropout rates.\n\n• Women in Leadership and Socio-economic Project: Promoting women's participation in leadership, politics, and environmental positions to address gender disparities in governance.",
    images: getAllTopicImages('women-land'),
    metaTitle: "Gender Equality Program - FIDIPA",
    metaDescription: "FIDIPA's comprehensive program promoting gender equality and social inclusion",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
    title: "Orphans/Vulnerable Children Project",
    slug: "orphans-vulnerable-children",
    description: "Supporting grandmothers caring for orphans and vulnerable children (OVC) affected by HIV/AIDS and post-COVID-19, focusing on improving food security, nutrition, health, and socio-economic status.",
    content: "• Health Support: Providing healthcare access and support for affected families.\n\n• Nutrition Programs: Ensuring proper nutrition for vulnerable children and their caregivers.\n\n• Economic Empowerment: Creating sustainable income opportunities for grandmother-led households.\n\n• Education Support: Facilitating access to education for orphans and vulnerable children.",
    images: getAllTopicImages('children'),
    metaTitle: "OVC Support Program - FIDIPA",
    metaDescription: "Supporting vulnerable children and their caregivers through comprehensive programs",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0853",
    title: "Environment, Food Security, Resilience and Livelihood Program",
    slug: "environment-food-security",
    description: "Increasing resilience to environmental threats and improving food security through sustainable farming methods and conservation agriculture.",
    content: "• Sustainable Land Management: Implementing sustainable farming practices and soil conservation techniques.\n\n• Income Generation: Developing stable sources of income through agricultural activities.\n\n• Natural Resource Management: Training communities in sustainable use of natural resources.\n\n• Climate Resilience: Building community resilience against climate change impacts.",
    images: getAllTopicImages('environment'),
    metaTitle: "Environmental Program - FIDIPA",
    metaDescription: "Promoting sustainable farming and environmental conservation",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0854",
    title: "Agriculture and Information Technology",
    slug: "agriculture-and-technology",
    description: "Enhancing technology adoption and promoting youth technical entrepreneurship in agriculture and infrastructure development.",
    content: "• Digital Agriculture: Implementing smart farming solutions and digital agricultural technologies.\n\n• Youth Empowerment: Supporting youth participation in agricultural entrepreneurship.\n\n• Online Networking: Improving livelihood through digital networking and online agribusiness.\n\n• Infrastructure Development: Enhancing agricultural infrastructure in schools and colleges.",
    images: getAllTopicImages('agriculture'),
    metaTitle: "AgriTech Program - FIDIPA",
    metaDescription: "Integrating technology with agriculture for sustainable development",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0855",
    title: "Soft Skills Training and Leadership",
    slug: "soft-skills-and-leadership",
    description: "Supporting TVET and NITA graduates through comprehensive skills development and leadership training programs.",
    content: "• Business Start-up Skills: Training in essential business development and management skills.\n\n• Entrepreneurial Mindset: Developing entrepreneurial thinking and opportunity recognition.\n\n• Creative Thinking: Fostering innovation and problem-solving abilities.\n\n• Visionary Leadership: Building leadership capabilities for community development.",
    images: getAllTopicImages('skills'),
    metaTitle: "Leadership Training - FIDIPA",
    metaDescription: "Comprehensive leadership and soft skills development program",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  }
];

// Projects data (previously from CSV)
export const projects: Project[] = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0861",
    title: "Community Training Initiative",
    slug: "community-training-initiative",
    description: "Implementing comprehensive training programs and workshops to build capacity within communities.",
    content: "Our Community Training Initiative focuses on building sustainable capacity within communities through structured workshops and hands-on training programs. We emphasize practical skills development and knowledge transfer that enables communities to address their own challenges effectively.",
    images: getAllTopicImages('community'),
    status: "ongoing",
    metaTitle: "Community Training - FIDIPA",
    metaDescription: "Building community capacity through comprehensive training programs",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0862",
    title: "Youth Development Program",
    slug: "youth-development-program",
    description: "Supporting youth through education and outdoor activities to build life skills and community engagement.",
    content: "The Youth Development Program combines educational support with experiential learning activities to foster leadership, teamwork, and community engagement among young people. Through mentorship and practical experience, we help youth develop the skills needed for future success.",
    images: getAllTopicImages('education'),
    status: "ongoing",
    metaTitle: "Youth Development - FIDIPA",
    metaDescription: "Empowering youth through education and experiential learning",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0863",
    title: "School Infrastructure Support",
    slug: "school-infrastructure-support",
    description: "Improving school facilities and infrastructure to enhance the learning environment for students.",
    content: "Our School Infrastructure Support project focuses on creating conducive learning environments by upgrading and maintaining school facilities. This includes classroom renovation, sanitation facilities, and essential educational resources to support quality education.",
    images: getAllTopicImages('education'),
    status: "ongoing",
    metaTitle: "School Infrastructure - FIDIPA",
    metaDescription: "Enhancing educational facilities for better learning outcomes",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0864",
    title: "Water Access Program",
    slug: "water-access-program",
    description: "Improving access to clean water through infrastructure development and community management.",
    content: "The Water Access Program implements sustainable water solutions in communities, combining infrastructure development with community-based management systems. We focus on both immediate access and long-term sustainability through community ownership.",
    images: getAllTopicImages('environment'),
    status: "ongoing",
    metaTitle: "Water Access - FIDIPA",
    metaDescription: "Sustainable water solutions for communities",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  },
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0865",
    title: "Agricultural Skills Development",
    slug: "agricultural-skills-development",
    description: "Training students and community members in sustainable agricultural practices.",
    content: "Our Agricultural Skills Development project provides comprehensive training in modern, sustainable farming techniques. We combine traditional knowledge with innovative practices to enhance food security and create economic opportunities through agriculture.",
    images: getAllTopicImages('agriculture'),
    status: "ongoing",
    metaTitle: "Agricultural Training - FIDIPA",
    metaDescription: "Developing sustainable agricultural skills in communities",
    createdAt: "2024-02-24T00:00:00Z",
    updatedAt: "2024-02-24T00:00:00Z"
  }
];

// Blog Posts
export const blogPosts = [
  {
    id: 'empowering-communities',
    title: 'Empowering Communities Through Sustainable Development',
    slug: 'empowering-communities-through-sustainable-development',
    content: `Our sustainable development initiatives are transforming rural communities through innovative approaches to poverty alleviation, environmental conservation, and economic empowerment...`,
    images: getAllTopicImages('community'),
    author: 'Jayne Wasonga',
    authorBio: 'Chief Executive Officer at FIDIPA',
    status: 'published',
    metaTitle: 'Empowering Communities - FIDIPA Blog',
    metaDescription: 'Learn about FIDIPA\'s sustainable development initiatives',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  }
];