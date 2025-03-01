<<<<<<< HEAD
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
=======
import { supabase } from './supabase';

// Map of topic keywords to their corresponding image URLs from Supabase storage
const imageMap = {
  'women-land': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20Land%20and%20Property%20Rights%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20Land%20and%20Property%20Rights%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20Land%20and%20Property%20Rights%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20Land%20and%20Property%20Rights%204.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20Land%20and%20Property%20Rights%205.jpg'
  ],
  'prisons': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20and%20out%20of%20prisons%20project%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20and%20out%20of%20prisons%20project%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20and%20out%20of%20prisons%20project%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20and%20out%20of%20prisons%20project%204.jpg'
  ],
  'education': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Girls%20Education%20and%20Mentorship%20Project%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Girls%20Education%20and%20Mentorship%20Project%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Girls%20Education%20and%20Mentorship%20Project%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Girls%20Education%20and%20Mentorship%20Project%204.jpg'
  ],
  'leadership': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20Leadership%20and%20Socio-economic%20Project%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20Leadership%20and%20Socio-economic%20Project%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20Leadership%20and%20Socio-economic%20Project%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Women%20in%20Leadership%20and%20Socio-economic%20Project%204.jpg'
  ],
  'children': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Orphans%20or%20Vulnerable%20Children%20Project%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Orphans%20or%20Vulnerable%20Children%20Project%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Orphans%20or%20Vulnerable%20Children%20Project%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Orphans%20or%20Vulnerable%20Children%20Project%204.jpg'
  ],
  'environment': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Environment%2C%20Food%20Security%2C%20Resilience%20and%20Livelihood%20Program%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Environment%2C%20Food%20Security%2C%20Resilience%20and%20Livelihood%20Program%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Environment%2C%20Food%20Security%2C%20Resilience%20and%20Livelihood%20Program%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Environment%2C%20Food%20Security%2C%20Resilience%20and%20Livelihood%20Program%204.jpg'
  ],
  'agriculture': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Agriculture%20and%20Information%20Technology%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Agriculture%20and%20Information%20Technology%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Agriculture%20and%20Information%20Technology%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Agriculture%20and%20Information%20Technology%204.jpg'
  ],
  'skills': [
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Soft%20Skills%20Training%20and%20Leadership%20training%201.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Soft%20Skills%20Training%20and%20Leadership%20training%202.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Soft%20Skills%20Training%20and%20Leadership%20training%203.jpg',
    'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/programs/Soft%20Skills%20Training%20and%20Leadership%20training%204.jpg'
  ]
};

const defaultImage = 'https://bwvkubhcicqtirckhvpk.supabase.co/storage/v1/object/public/media/default/hero.jpg';
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b

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

<<<<<<< HEAD
export function getImageUrl(path: string): string {
  if (!path) return defaultImage;
  return path;
=======
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
>>>>>>> 2235afba310fc26825bf3948de2acd839cb7377b
}