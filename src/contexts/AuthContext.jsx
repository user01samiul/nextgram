import { account, appwriteConfig, databases } from "@/lib/appwrite/config";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [error, setError] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  //mandatory = navigator.onLine

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const currentUserSession = await account.get();
        // getting user from database
        const userData = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          currentUserSession.$id
        );
        setUser(userData);

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchUserData();

    // Clean-up function for useEffect
    return () => {
      fetchUserData();
    };
  }, []);

  //signin
  async function singinApi(values) {
    try {
      const signedinUser = await account.createEmailPasswordSession(
        values.email,
        values.password
      );
      const currentUserSession = await account.get();

      // getting user from database
      const userData = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        currentUserSession.$id
      );
      setUser(userData);
      return signedinUser;
    } catch (err) {
      console.log(err);
    }
  }

  //signout
  async function signoutApi() {
    try {
      const promise = await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    loading,
    error,
    user,
    singinApi,
    signoutApi,
    isOnline,
    setIsOnline,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? ( // Render loading state
        <div className="h-screen w-full flex flex-col items-center gap-2 justify-center">
          <img
            src="/infinite-spinner.svg"
            className="h-10 w-10 md:h-20 md:w-20"
          />
          <p className="text-xs absolute bottom-4">Version 1.0</p>
        </div>
      ) : (
        children // Render children once loading is false
      )}
    </AuthContext.Provider>
  );
}
