import { supabase } from './supabase';

// Map of topic keywords to their corresponding image URLs from Supabase storage
const imageMap = {
  'women-land': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-4.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-land-rights-5.jpg'
  ],
  'prisons': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-prisons-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-prisons-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-prisons-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/women-prisons-4.jpg'
  ],
  'education': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/girls-education-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/girls-education-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/girls-education-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/girls-education-4.jpg'
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
  ],
  'skills': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/soft-skills-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/soft-skills-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/soft-skills-3.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/soft-skills-4.jpg'
  ],
  'community': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/community-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/community-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/community-3.jpg'
  ],
  'youth': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/youth-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/youth-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/youth-3.jpg'
  ],
  'school': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/school-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/school-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/school-3.jpg'
  ],
  'water': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/water-1.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/water-2.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/projects/water-3.jpg'
  ]
};

const defaultImage = 'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/default-hero.jpg';

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

export async function getImagesByTopic(topic: string): Promise<string[]> {
  try {
    const { data: files, error } = await supabase.storage
      .from('media')
      .list(`programs/${topic}`);

    if (error) throw error;

    return files
      ? files.map(file => supabase.storage
          .from('media')
          .getPublicUrl(`programs/${topic}/${file.name}`).data.publicUrl)
      : [defaultImage];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [defaultImage];
  }
}

export function getImageUrl(path: string): string {
  if (!path) return defaultImage;
  
  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(path);
  
  return publicUrl;
}