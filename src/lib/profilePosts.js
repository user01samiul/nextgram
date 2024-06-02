import { appwriteConfig, databases } from "./appwrite/config";

export default async function profilePosts(userId) {
  try {
    const result = await databases.getDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.usersCollectionId, // collectionId
      userId, // documentId
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
