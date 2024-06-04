import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ID, appwriteConfig, databases } from "./appwrite/config";
export default async function coverPhotoUpload(userId, coverURL) {
  try {
    const result = await databases.createDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.coversCollectionId, // collectionId
      ID.unique(), // documentId
      {
        user: userId,
        coverURL: coverURL,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getCoverPhotoURL(user, file) {
  try {
    const id = user?.$id;
    const name = file?.name;
    const storage = getStorage();
    const storageRef = ref(storage, `user/${id}/CoverPhotos/${name}`);

    const uploaded = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.log(err);
  }
}

export async function updateCoverPhoto(documentId, coverURL, userId) {
  try {
    console.log(documentId);
    const result = await databases.deleteDocument(
      appwriteConfig.databaseId, // databaseId
      appwriteConfig.coversCollectionId, // collectionId
      documentId // documentId
    );
    const againUpload = await coverPhotoUpload(userId, coverURL);
    return result;
  } catch (error) {
    console.log(error);
  }
}
