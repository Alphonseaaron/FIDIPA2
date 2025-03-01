// Map of topic keywords to their corresponding image paths
const imageMap = {
  'women-land': [
    '/src/assets/images/Women Land and Property Rights 1.jpg',
    '/src/assets/images/Women Land and Property Rights 2.jpg',
    '/src/assets/images/Women Land and Property Rights 3.jpg',
    '/src/assets/images/Women Land and Property Rights 4.jpg',
    '/src/assets/images/Women Land and Property Rights 5.jpg'
  ],
  'prisons': [
    '/src/assets/images/Women in and out of prisons project 1.jpg',
    '/src/assets/images/Women in and out of prisons project 2.jpg',
    '/src/assets/images/Women in and out of prisons project 3.jpg',
    '/src/assets/images/Women in and out of prisons project 4.jpg'
  ],
  'education': [
    '/src/assets/images/Girls Education and Mentorship Project 1.jpg',
    '/src/assets/images/Girls Education and Mentorship Project 2.jpg',
    '/src/assets/images/Girls Education and Mentorship Project 3.jpg',
    '/src/assets/images/Girls Education and Mentorship Project 4.jpg'
  ],
  'leadership': [
    '/src/assets/images/Women in Leadership  and Socio-economic Project 1.jpg',
    '/src/assets/images/Women in Leadership  and Socio-economic Project 2.jpg',
    '/src/assets/images/Women in Leadership  and Socio-economic Project 3.jpg',
    '/src/assets/images/Women in Leadership  and Socio-economic Project 4.jpg'
  ],
  'children': [
    '/src/assets/images/Orphans or Vulnerable Children Project 1.jpg',
    '/src/assets/images/Orphans or Vulnerable Children Project 2.jpg',
    '/src/assets/images/Orphans or Vulnerable Children Project 3.jpg',
    '/src/assets/images/Orphans or Vulnerable Children Project 4.jpg'
  ],
  'environment': [
    '/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
    '/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 2.jpg',
    '/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 3.jpg',
    '/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 4.jpg'
  ],
  'agriculture': [
    '/src/assets/images/Agriculture and Information Technology 1.jpg',
    '/src/assets/images/Agriculture and Information Technology 2.jpg',
    '/src/assets/images/Agriculture and Information Technology 3.jpg',
    '/src/assets/images/Agriculture and Information Technology 4.jpg'
  ],
  'skills': [
    '/src/assets/images/Soft Skills Training and Leadership training 1.jpg',
    '/src/assets/images/Soft Skills Training and Leadership training 2.jpg',
    '/src/assets/images/Soft Skills Training and Leadership training 3.jpg',
    '/src/assets/images/Soft Skills Training and Leadership training 4.jpg'
  ],
  'community': [
    '/src/assets/images/Women Land and Property Rights 1.jpg',
    '/src/assets/images/Environment, Food Security, Resilience and Livelihood Program 1.jpg',
    '/src/assets/images/Girls Education and Mentorship Project 1.jpg',
    '/src/assets/images/Agriculture and Information Technology 1.jpg'
  ]
};

const defaultImage = '/src/assets/images/Women Land and Property Rights 1.jpg';

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