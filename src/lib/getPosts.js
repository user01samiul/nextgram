import { Query } from "appwrite";
import { appwriteConfig, databases } from "./appwrite/config";

export default async function getPosts() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.limit(25), Query.orderDesc("$createdAt")]
    );
    return promise;
  } catch (err) {
    console.log(err);
  }
}
