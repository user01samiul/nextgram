import { useAuth } from "@/contexts/AuthContext";
import getImageURL from "@/lib/getImageURL";
import updateProfileAPI from "@/lib/updateProfileAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailShow from "../EmailShow";
import Input from "../FormInput";
import SelectDp from "../SelectDp";

function UpdateProfile() {
  const { user } = useAuth();
  const [updatedProfileInfo, setUpdateProfileInfo] = useState({
    name: "",
    username: "",
    thread: "",
    bio: "",
    imageURL: "",
    email: "",
  });
  const [photoFile, setPhotoFile] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUpdateProfileInfo({
      name: user.name,
      username: user.username,
      thread: user.thread,
      bio: user.bio,
      email: user.email,
    });
  }, []);



  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateProfileInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handlePhotoFile(e) {
    const file = e.target.files && e.target.files[0];
    setPhotoFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const imageURL = photoFile && (await getImageURL(user, photoFile));
    const updatedObject = {
      ...updatedProfileInfo,
      imageURL: imageURL ? imageURL : updatedProfileInfo.imageURL,
    };
    if (updatedProfileInfo === updatedObject) {
      return;
    }
    const updatedProfile = await updateProfileAPI(user.$id, updatedObject);
    setLoading(false);
    navigate("/");
  }
  return (
    <section className="flex-1 h-screeen p-4">
      <h1 className="text-center text-2xl">Update profile</h1>
      <form onSubmit={handleSubmit}>
        <Input
          title="Name"
          type="text"
          name="name"
          handleChange={handleChange}
          value={updatedProfileInfo.name}
        />
        <Input
          title="Username"
          type="text"
          name="username"
          handleChange={handleChange}
          value={updatedProfileInfo.username}
        />
        <Input
          title="Thread"
          type="text"
          name="thread"
          handleChange={handleChange}
          value={updatedProfileInfo.thread}
        />
        <Input
          title="Bio"
          type="text"
          name="bio"
          handleChange={handleChange}
          value={updatedProfileInfo.bio}
        />
        <EmailShow
          title="Email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={updatedProfileInfo.email}
        />
        <SelectDp
          name="photoFile"
          handleChange={handlePhotoFile} // Pass the handleChange function here
          value={updatedProfileInfo.photoFile}
        />

        <div className="w-full flex justify-center items-center">
          <button
            className={`w-full active:scale-[0.995] active:bg-emerald-600 ${
              loading && "bg-emerald-600"
            } py-2 bg-[#ffc800] text-black my-4 font-bold `}
          >
            {loading ? (
              <div className="flex items-center gap-2 w-full justify-center">
                <img src="public/assets/icons/loader.svg" className="h-5 w-5" />
                Loading...
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UpdateProfile;
