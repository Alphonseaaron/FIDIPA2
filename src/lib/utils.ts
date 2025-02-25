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