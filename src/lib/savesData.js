import { appwriteConfig, databases } from "./appwrite/config";

export default async function savesPageData() {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.savesCollectionId, // collectionId
      [] // queries (optional)
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
