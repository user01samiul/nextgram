// import { Toaster } from "@/components/ui/toaster";
// import { Route, Routes } from "react-router-dom";
// import Layout from "./Layout";
// import PublicLayout from "./auth/PublicLayout";
// import SignIn from "./auth/SignIn";
// import SignUp from "./auth/SignUp";
// import People from "./components/pages/People";
// import { AuthProvider } from "./contexts/AuthContext";
// import Home from "./components/pages/Home";

// function App() {
//   return (
//     <>
//       <AuthProvider>
//         <main className="flex h-screen w-full">
//           <Routes>
//             {/* Public Routes */}
//             <Route element={<PublicLayout />}>
//               <Route path="/signin" element={<SignIn />} />
//               <Route path="/signup" element={<SignUp />} />
//             </Route>

//             {/* Private Routes */}
//             {/* <Route index element={<PrivateLayout> <Layout/> </PrivateLayout>}></Route> */}
//             <Route path="" element={<Layout />}>
//             <Route path="" element={<Home />} />
//               <Route path="/people" element={<People />} />
//             </Route>
//           </Routes>
//           <Toaster />
//         </main>
//       </AuthProvider>
//     </>
//   );
// }

// export default App;
