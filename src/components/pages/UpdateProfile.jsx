import { useAuth } from "@/contexts/AuthContext";
import coverPhotoUpload, { getCoverPhotoURL } from "@/lib/coverPhoto";
import getImageURL from "@/lib/getImageURL";
import updateProfileAPI from "@/lib/updateProfileAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [coverFile, setCoverFile] = useState();
  const [coverURL, setCoverURL] = useState(null);
  const [photoFile, setPhotoFile] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profileId } = useParams();

  useEffect(() => {
    console.log("effect ")
    setUpdateProfileInfo({
      name: user?.name,
      username: user?.username,
      thread: user?.thread,
      bio: user?.bio,
      email: user?.email,
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

  const { mutate } = useMutation({
    mutationFn: async (updatedObject) => {
      return await updateProfileAPI(user.$id, updatedObject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profileId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userMain", user?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: ["userMainMobile", user?.$id],
      });
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const imageURL = photoFile && (await getImageURL(user, photoFile));
    const coverURL = coverFile && (await getCoverPhotoURL(user, coverFile));

    const updatedObject = {
      ...updatedProfileInfo,
      imageURL: imageURL ? imageURL : updatedProfileInfo.imageURL,
    };

    if (!user.coverPhotos?.length === 0) {
      const documentId = user.coverPhotos.$id;
      console.log(documentId);
      // const updatingCoverPhoto = await updateCoverPhoto(
      //   documentId,
      //   coverURL,
      //   user.$id
      // );
    }
    {
      const creatingCoverDocument = await coverPhotoUpload(user.$id, coverURL);
    }

    if (
      updatedProfileInfo === updatedObject &&
      user.coverPhotos.coverURL === coverURL
    ) {
      setLoading(false);
      return;
    }
    const updatedProfile = mutate(updatedObject);
    setLoading(false);
    navigate(`/profile/${user.$id}`);
  }

  //dynamic things

  const handleCoverPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    setCoverFile(file);
  };

  return (
    <section className="flex-1 pb-[140px] h-screeen p-4">
      <h1 className="text-center text-2xl">Update profile</h1>
      <form onSubmit={handleSubmit}>
        <Input
          title="Name"
          type="text"
          name="name"
          handleChange={handleChange}
          value={updatedProfileInfo.name}
          placeholder="Enter your name"
          required
        />
        <Input
          title="Username"
          type="text"
          name="username"
          handleChange={handleChange}
          value={updatedProfileInfo.username}
          placeholder="Enter your username"
          required
        />
        <Input
          title="Thread"
          type="text"
          name="thread"
          handleChange={handleChange}
          value={updatedProfileInfo.thread}
          placeholder="@user123"
          required
        />
        <Input
          title="Bio"
          type="text"
          name="bio"
          handleChange={handleChange}
          value={updatedProfileInfo.bio}
          placeholder="Enter your bio"
          required
        />
        <EmailShow
          title="Email"
          type="email"
          name="email"
          handleChange={handleChange}
          value={updatedProfileInfo.email}
          placeholder="Enter your email address"
          required
        />
        <SelectDp
          name="photoFile"
          handleChange={handlePhotoFile} // Pass the handleChange function here
          value={updatedProfileInfo.photoFile}
          title={"Select profile picture"}
        />
        {/* cover photo */}
        <SelectDp
          name="coverPhoto"
          handleChange={handleCoverPhoto} // Pass the handleChange function here
          title={"Select cover photo"}
        />
        {/* --------------- */}

        <div className="w-full flex justify-center items-center">
          <button
            className={`w-full active:scale-[0.995] active:bg-emerald-600 ${
              loading && "bg-emerald-600"
            } py-2 bg-[#ffc800] text-black my-4 font-bold `}
          >
            {loading ? (
              <div className="flex items-center gap-2 w-full justify-center">
                <img src="/assets/icons/loader.svg" className="h-5 w-5" />
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
