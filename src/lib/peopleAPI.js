import { Query } from "appwrite";
import { appwriteConfig, databases } from "./appwrite/config";

export default async function getUsers () {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.usersCollectionId, // collectionId
      [ Query.orderDesc("$createdAt")] // queries (optional)
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
