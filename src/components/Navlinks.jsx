import { NavLink } from "react-router-dom";
("react-router-dom");

function Navlinks() {
  return (
    <div className=" lg:px-4 navlink-conatiner flex flex-col justify-between">
      <ul>
        <li>
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex gap-3 md:text-base lg:text-lg py-3 navlink mt-2 mb-2 rounded-md px-4 bg-purple ${
                isActive ? "bg-[#ffc800] text-black" : "transparent"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            to="explore"
            className={({ isActive }) =>
              `flex gap-3 md:text-base lg:text-lg py-3 navlink mt-2 mb-2 rounded-md px-4 bg-purple ${
                isActive ? "bg-[#ffc800] text-black" : "transparent"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
              />
            </svg>
            Explore
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              `flex gap-3 md:text-base lg:text-lg py-3 navlink mt-2 mb-2 rounded-md px-4 bg-purple ${
                isActive ? "bg-[#ffc800] text-black" : "transparent"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            People
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            to="saved"
            className={({ isActive }) =>
              `flex gap-3 md:text-base lg:text-lg py-3 navlink mt-2 mb-2 rounded-md px-4 bg-purple ${
                isActive ? "bg-[#ffc800] text-black" : "transparent"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            Saved
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            to="create-post"
            className={({ isActive }) =>
              `flex gap-3 md:text-base lg:text-lg py-3 navlink mt-2 mb-2 rounded-md px-4 bg-purple ${
                isActive ? "bg-[#ffc800] text-black" : "transparent"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Create Post
          </NavLink>{" "}
        </li>
      </ul>
    </div>
  );
}

export default Navlinks;
