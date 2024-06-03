import { appwriteConfig, databases } from "@/lib/appwrite/config";

export default async function giveLike(documentId, updatedPost) {
    
 try {
    const result = await databases.updateDocument(
        appwriteConfig.databaseId, // databaseId
        appwriteConfig.postsCollectionId, // collectionId
        documentId, // documentId
        {
            likes : updatedPost.likes
        } // data (optional)
      );
      return result
 } catch (error) {
    console.log(error);
 }
}
