import { Toaster } from "@/components/ui/toaster.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import PublicLayout from "./auth/PublicLayout.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import CreatePost from "./components/pages/CreatePost.jsx";
import Explore from "./components/pages/Explore.jsx";
import Home from "./components/pages/Home.jsx";
import People from "./components/pages/People.jsx";
import PrivateLayout from "./components/pages/PrivateLayout.jsx";
import Profile from "./components/pages/Profile.jsx";
import Saved from "./components/pages/Saved.jsx";
import UpdateProfile from "./components/pages/UpdateProfile.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./globals.css";
import "./lib/firebase/firebase.js";

const queryClient = new QueryClient({});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}

      <Route
        path="/signin"
        element={
          <PublicLayout>
            <SignIn />
          </PublicLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <SignUp />
          </PublicLayout>
        }
      />

      {/* --------------------***Page with Layout***------------------ */}
      <Route
        path="/"
        element={
          <PrivateLayout>
            <Layout />
          </PrivateLayout>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="profile/:profileId/*" element={<Profile />} />
        <Route path="people" element={<People />} />
        <Route path="saved" element={<Saved />} />
        <Route path="explore" element={<Explore />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="update-profile/:profileId/*" element={<UpdateProfile />}></Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} /> {/*receives router props*/}
      <Toaster />
    </QueryClientProvider>
  </AuthProvider>
);
