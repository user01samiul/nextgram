import Home from "./Home";
import People from "./People";

function Explore() {
  return (
    <div className="bottomSection  flex-1 h-screen">
      <div className=" w-full h-[30%]  overflow-y-scroll  border-b border-[#c9c5c525] ">
        <People />
      </div>
      <div className=" w-full h-[75%]   overflow-y-scroll">
        <div className="people-heading   text-center w-full flex justify-center items-center my-2 text-xl">
          Discover Posts
        </div>
        <Home />
      </div>
    </div>
  );
}

export default Explore;
