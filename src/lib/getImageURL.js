import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default async function getImageURL(user, file) {
  try {
    const id = user.$id;
    const name = file.name;
    const storage = getStorage();
    const storageRef = ref(storage, `user/${id}/profilePictures/${name}`);

    const uploaded = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.log(err);
  }
}
