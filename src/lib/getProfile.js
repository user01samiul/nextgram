import { appwriteConfig, databases } from "./appwrite/config";

export default async function getProfile (userId) {
  try {
    const userData = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    );
    return userData;
  } catch (error) {
    return (error.message)
  }
}
