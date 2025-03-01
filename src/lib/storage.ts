import { nanoid } from 'nanoid';

interface UploadResponse {
  url: string;
  path: string;
}

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResponse> {
  try {
    // Create a local URL for the file
    const url = URL.createObjectURL(file);
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${nanoid()}.${fileExtension}`;
    const path = `${folder}/${uniqueFilename}`;
    
    return {
      url,
      path
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    // In a real app, you would delete the file here
    console.log('Deleting file:', path);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}