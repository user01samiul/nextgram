import { ID, appwriteConfig, databases } from "@/lib/appwrite/config";

export default async function savePost(userId, postId) {
  try {
    const result = await databases.createDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.savesCollectionId, // collectionId
      ID.unique(), // documentId
      {
        users: userId,
        post: postId,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
