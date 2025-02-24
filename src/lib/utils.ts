// Map of topic keywords to their corresponding image URLs from Supabase storage
const imageMap = {
  'women-land': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-4.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-5.jpg'
  ],
  'leadership': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-leadership-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-leadership-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-leadership-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-leadership-4.jpg'
  ],
  'children': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/orphans-children-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/orphans-children-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/orphans-children-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/orphans-children-4.jpg'
  ],
  'environment': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/environment-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/environment-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/environment-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/environment-4.jpg'
  ],
  'agriculture': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/agriculture-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/agriculture-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/agriculture-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/agriculture-4.jpg'
  ]
};

export function getRandomImage(topic: string): string {
  const defaultImage = 'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/default-hero.jpg';
  
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

  return matchingTopic ? matchingTopic[1] : [];
}