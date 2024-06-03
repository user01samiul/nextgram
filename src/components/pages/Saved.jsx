import SavePosts from "../SavePosts";

function Saved() {
  return (
    <div className=" flex-1 overflow-y-scroll h-screen flex flex-col items-center">
       <div className="people-heading text-center w-full flex justify-center items-center lg:my-4 my-2 text-xl">
        Saved Posts
      </div>
      <SavePosts />
    </div>
  );
}

export default Saved;
