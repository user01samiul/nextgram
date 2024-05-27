import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, singinApi } = useAuth(); // Corrected typo in function name
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // Define a submit handler.
  async function handleSubmit(e, values) {
    e.preventDefault();
    setLoading(true);
    const newSession = await singinApi(values);
    setLoading(false);
    // navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center my-auto w-full formFrame">
      <div className="flex items-center gap-1 mb-28 text-2xl">
        <img
          className="h-[40px] w-[40px]"
          src="nextgram.png"
          alt="nextgram"
        />
        <h1>NextGram</h1>
      </div>
      <h2 className="text-lg">Sign in</h2>

      <form
        onSubmit={(e) => handleSubmit(e, values)}
        className="space-y-8 w-[70%]"
        action="/"
      >
        <InputField
          name="email"
          title="Email"
          placeholder="Enter your email"
          type="text"
          handleChange={(e) => handleChange(e)}
          value={values.email}
          required
        />
        <InputField
          name="password"
          title="Password"
          placeholder="Enter your password"
          type="password"
          handleChange={(e) => handleChange(e)}
          value={values.password}
          required
        />
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className={`bg-[#ffc800] mt-4 w-full hover:bg-emerald-600 text-md text-black uppercase active:scale-[0.999] active:bg-emerald-600 ${
              loading ? "bg-emerald-600" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <img src="assets/icons/loader.svg" className="h-5 w-5" />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-5">
        <p className="text-sm">
          Or you can just {""}
          <Link className="underline text-red-500 font-bold" to="/signup">
            Sign up
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
