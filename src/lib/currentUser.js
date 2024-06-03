import { account, appwriteConfig, databases } from "./appwrite/config";

export default async function currentUser() {
  try {
    const currentUserSession = await account.get();
    // getting user from database
    const userData = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      currentUserSession.$id
    );
    return userData;
  } catch (error) {
    console.log(error);
  }
}
