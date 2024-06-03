import { appwriteConfig, databases } from "./appwrite/config";

export default async function deleteSave(documentId) {
  try {
    const result = await databases.deleteDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.savesCollectionId, // collectionId
      documentId // documentId
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
