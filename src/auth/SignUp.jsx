import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { signupApi } from "@/lib/appwrite/signupApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { singinApi } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate("/");
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    thread: "user093473",
  });

  function handleChange(e) {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // 2. Form submit handler.
  async function handleSubmit(e, credentials) {
    e.preventDefault();
    setLoading(true);
    const doing_Signup = await signupApi(
      credentials.name,
      credentials.username,
      credentials.email,
      credentials.password
    );

    setLoading(false);
    if (doing_Signup.email) {
      // Account created successfully, proceed with login
      setIsSigningIn(true);
      const valuesToPass = {
        email: credentials.email,
        password: credentials.password,
      };
      const doing_Signin = await singinApi(valuesToPass);
      setIsSigningIn(false);
      navigate("/update-profile");
      toast({
        title: "Account created successfully.",
      });
    } else {
      // Failed to create an account
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to create an account.",
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center my-auto w-full">
      <div className="flex items-center gap-1 mb-4 text-2xl">
        <img
          className="h-[40px] w-[40px]"
          src="nextgram.png"
          alt="nextgram"
        />
        <h1>NextGram</h1>
      </div>
      <h2 className="text-lg">Sign up</h2>

      <form
        onSubmit={(e) => handleSubmit(e, credentials)}
        className="space-y-8 w-[70%]"
      >
        <InputField
          name="name"
          title="Name"
          placeholder="Enter your name"
          type="text"
          handleChange={(e) => handleChange(e)}
          value={credentials.name}
          required
        />
        <InputField
          name="username"
          title="Username"
          placeholder="Enter your username"
          type="text"
          handleChange={(e) => handleChange(e)}
          value={credentials.username}
          required
        />
        <InputField
          name="email"
          title="Email"
          placeholder="Enter your email"
          type="email"
          handleChange={(e) => handleChange(e)}
          value={credentials.email}
          required
        />
        <InputField
          name="password"
          title="Password"
          placeholder="Enter your password"
          type="password"
          handleChange={(e) => handleChange(e)}
          value={credentials.password}
          required
        />
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className={`bg-[#ffc800] mt-4 w-full text-md text-black uppercase active:scale-[0.999] active:bg-emerald-600 hover:bg-emerald-600 ${
              loading || isSigningIn ? "bg-emerald-600" : ""
            }`}
          >
            {loading === true ? (
              <div className="flex items-center gap-2">
                <img src="assets/icons/loader.svg" className="h-5 w-5" />
                Loading...
              </div>
            ) : isSigningIn === true ? (
              <div className="flex items-center gap-2">
                <img src="assets/icons/loader.svg" className="h-5 w-5" />
                Signing in...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-5">
        <p className="text-sm">
          Already have an account?{" "}
          <Link className="underline text-red-500 font-bold" to="/signin">
            Sign in
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
