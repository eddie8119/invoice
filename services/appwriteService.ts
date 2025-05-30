// services/appwriteService.ts
import type { InvoiceFields } from '@/types';
import { Client, Databases, ID, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://[YOUR-ENDPOINT]')
  .setProject('[YOUR-PROJECT-ID]');
const storage = new Storage(client);
const database = new Databases(client);

export const uploadInvoiceToAppwrite = async (
  imageUri: string,
  data: InvoiceFields
) => {
  const file = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `invoice-${Date.now()}.jpg`,
  };

  const uploadedFile = await storage.createFile(
    '[BUCKET_ID]',
    ID.unique(),
    file
  );
  const fileId = uploadedFile.$id;

  await database.createDocument('[DB_ID]', '[COLLECTION_ID]', ID.unique(), {
    ...data,
    imageId: fileId,
  });
};
