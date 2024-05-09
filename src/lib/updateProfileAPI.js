import { appwriteConfig, databases } from "./appwrite/config";

export default async function updateProfileAPI(documentId, object) {
  try {
    const update = await databases.updateDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.usersCollectionId, // collectionId
      documentId, // documentId
      { ...object } // data
    );
    return update;
  } catch (error) {
    console.log(error);
  }
}
