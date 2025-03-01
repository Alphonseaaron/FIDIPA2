// Map of topic keywords to their corresponding image paths
const imageMap = {
  'women-land': [
    '/images/Women Land and Property Rights 1.jpg',
    '/images/Women Land and Property Rights 2.jpg',
    '/images/Women Land and Property Rights 3.jpg',
    '/images/Women Land and Property Rights 4.jpg',
    '/images/Women Land and Property Rights 5.jpg'
  ],
  'prisons': [
    '/images/Women in and out of prisons project 1.jpg',
    '/images/Women in and out of prisons project 2.jpg',
    '/images/Women in and out of prisons project 3.jpg',
    '/images/Women in and out of prisons project 4.jpg'
  ],
  'education': [
    '/images/Girls Education and Mentorship Project 1.jpg',
    '/images/Girls Education and Mentorship Project 2.jpg',
    '/images/Girls Education and Mentorship Project 3.jpg',
    '/images/Girls Education and Mentorship Project 4.jpg'
  ],
  'leadership': [
    '/images/Women in Leadership  and Socio-economic Project 1.jpg',
    '/images/Women in Leadership  and Socio-economic Project 2.jpg',
    '/images/Women in Leadership  and Socio-economic Project 3.jpg',
    '/images/Women in Leadership  and Socio-economic Project 4.jpg'
  ],
  'children': [
    '/images/Orphans or Vulnerable Children Project 1.jpg',
    '/images/Orphans or Vulnerable Children Project 2.jpg',
    '/images/Orphans or Vulnerable Children Project 3.jpg',
    '/images/Orphans or Vulnerable Children Project 4.jpg'
  ],
  'environment': [
    '/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
    '/images/Environment, Food Security, Resilience and Livelihood Program 2.jpg',
    '/images/Environment, Food Security, Resilience and Livelihood Program 3.jpg',
    '/images/Environment, Food Security, Resilience and Livelihood Program 4.jpg'
  ],
  'agriculture': [
    '/images/Agriculture and Information Technology 1.jpg',
    '/images/Agriculture and Information Technology 2.jpg',
    '/images/Agriculture and Information Technology 3.jpg',
    '/images/Agriculture and Information Technology 4.jpg'
  ],
  'skills': [
    '/images/Soft Skills Training and Leadership training 1.jpg',
    '/images/Soft Skills Training and Leadership training 2.jpg',
    '/images/Soft Skills Training and Leadership training 3.jpg',
    '/images/Soft Skills Training and Leadership training 4.jpg'
  ],
  'community': [
    '/images/Women Land and Property Rights 1.jpg',
    '/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
    '/images/Girls Education and Mentorship Project 1.jpg',
    '/images/Agriculture and Information Technology 1.jpg'
  ]
};

const defaultImage = '/images/Women Land and Property Rights 1.jpg';

export function getRandomImage(topic: string): string {
  // Find matching topic images
  const matchingTopic = Object.entries(imageMap).find(([key]) => 
    topic.toLowerCase().includes(key.toLowerCase())
  );

  if (!matchingTopic) return defaultImage;

  const images = matchingTopic[1];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export function getAllTopicImages(topic: string): string[] {
  const matchingTopic = Object.entries(imageMap).find(([key]) => 
    topic.toLowerCase().includes(key.toLowerCase())
  );

  return matchingTopic ? matchingTopic[1] : [defaultImage];
}

export function getImageUrl(path: string): string {
  if (!path) return defaultImage;
  return path;
}