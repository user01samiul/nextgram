import { useAuth } from "@/contexts/AuthContext.jsx";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { ID, appwriteConfig, databases } from "../../lib/appwrite/config.js";

function CreatePost() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [file, setfile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [post, setPost] = useState({
    creator: user.$id,
    caption: "",
    imageUrl: null,
    imageId: "",
    location: "",
    // tags: [],
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    setPost((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }

  // Do something with the files
  const onDrop = useCallback((acceptedFiles) => {
    setfile(acceptedFiles[0]);
    setFileURL(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    setLoading(true);
    if (file) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `/media/${file.name}`);
        const promise = await uploadBytes(storageRef, file);
        url = await getDownloadURL(storageRef);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const updatedPost = {
        //setPost will give stale data, using object instead
        ...post,
        imageUrl: url,
        imageId: ID.unique(),
      };

      const updatedDb = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        ID.unique(),
        updatedPost
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    navigate("/");
    window.location.reload(); 
  };
  return (
    <div className="post-container  py-8 md:px-8 px-3 flex-1 h-screen overflow-y-scroll">
      <h1 className="text-center text-2xl mb-8">Create a post</h1>
      <form action="/" onSubmit={handleSubmit} className="w-[100%] md:w-[90%] mx-auto">
        <label htmlFor="caption" className="flex flex-col mb-4">
          <span className="mb-1">Caption</span>
          <textarea
            onChange={(e) => handleChange(e)}
            type="textarea"
            name="caption"
            id="caption"
            placeholder="What's in your mind?"
            className=" text-white placeholder:text-[#575b61] bg-[#131313] p-2 focus:outline-none resize-none"
            rows="5"
          ></textarea>
        </label>
        <label htmlFor="files">
          <span className="mb-1 ">Add photos</span>
          <div
            {...getRootProps()}
            className="h-[240px] md:h-[300px] mt-1 lg:h-[400px] md:w-[90%] w-[100%] files bg-[#131313] mx-auto  flex justify-center items-center flex-col"
          >
            <input {...getInputProps()} />
            {!file ? (
              <div className="flex justify-center flex-col items-center h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-14 h-14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <p className="text-center text-sm my-2 text-[#6c7179] ">
                  Drag and drop some photos here, <br />
                  or click to select photos.
                </p>
              </div>
            ) : (
              <div className="h-[90%] w-[95%] flex flex-col justify-center items-center">
                <img
                  src={fileURL}
                  alt={file.name}
                  className="object-cover h-[inherit] w-[inherit] opacity-60 rounded-md"
                />
                <hr className="w-full mt-3 border-gray-800 opacity-50" />
                <p className="text-[#7b808a]">Click or drag to replace ...</p>
              </div>
            )}
          </div>
        </label>

        <label htmlFor="location" className="flex flex-col my-4">
          <span className="mb-1">Location</span>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            className=" text-white placeholder:text-[#575b61] bg-[#131313] p-2 focus:outline-none resize-none"
          />
        </label>
        <label htmlFor="tags" className="flex flex-col mb-4">
          <span className="mb-1">Tags</span>
          <input
            // onChange={(e) => handleChange(e)}
            type="text"
            name="tags"
            id="location"
            placeholder="Enter tags"
            className=" text-white placeholder:text-[#575b61] bg-[#131313] p-2 focus:outline-none resize-none"
          />
        </label>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className={`my-6 hover:bg-emerald-600 active:bg-emerald-600 uppercase text-black rounded-sm cursor-pointer py-2 w-[170px] text-lg font-bold ${
              loading ? "bg-emerald-600" : "bg-[#ffc800]"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2 w-full justify-center">
                <img src="assets/icons/loader.svg" className="h-5 w-5" />
                Loading...
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
