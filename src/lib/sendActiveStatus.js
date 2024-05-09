import { appwriteConfig, databases } from "./appwrite/config";

export default async function sendActiveStatus(id, status) {

  try {
    // Update the isActive property in the user object
    const object = { isActive: status };
 
    const update = await databases.updateDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.usersCollectionId, // collectionId
      id, // documentId
      object // Pass the updated user object directly
    );

    return update;
  } catch (error) {
    console.log(error);
  }
}
