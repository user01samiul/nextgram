//signup funciton #appwrite
import { ID, account, appwriteConfig, avatars, databases } from "./config";


export async function signupApi(name, username, email, password) {
  try {
    const newUser = await account.create(
      ID.unique(), //mandatory
      email,
      password,
      name
    );

    if (!newUser) throw Error;

    //creating user in database
    const Avatars = avatars.getInitials(name); //creating name avatar
    const newUserInDB = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      newUser.$id,    //id from created user
      {
        name: name,
        username: username,
        email: email,
        accountId: newUser.$id,
        imageURL: Avatars,
      }
    );
    return newUser;
  } catch (err) {
    console.log(err);
    return err;
  }
}
