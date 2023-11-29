import Header from "./Header";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [isSignIn, setSignIn] = useState("true");

  const handleToggle = () => {
    setSignIn(!isSignIn);
  };

  return (
    <div className="LoginForm">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="bg"
        className="absolute"
      />

      <form
        action=""
        className="absolute mx-auto right-0 left-0 w-[28%] mt-40 bg-black p-12 flex flex-col text-white bg-opacity-80 rounded-lg"
      >
        <h1 className="color-white text-3xl  font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn ? (
          <input
            type="text"
            name=""
            id=""
            className="p-3 mt-8 w-full bg-gray-700 rounded-md"
            placeholder="Name"
          />
        ) : null}

        <input
          type="text"
          name=""
          id=""
          className="p-3 mt-8 w-full bg-gray-700 rounded-md"
          placeholder="Email or phone number"
        />

        <input
          type="text"
          className="p-3 my-6 w-full bg-gray-700 rounded-md "
          placeholder="Password"
        />

        <button className="bg-red-700 p-3 w-full mt-4 rounded-md font-bold">
          {" "}
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {isSignIn ? (
          <Text marginTop={"2em"}>
            New to Netflix? {" "}
            <Text
              as={"span"}
              className="font-bold no-underline hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              Sign Up Now !
            </Text>{" "}
          </Text>
        ) : (
          <Text marginTop={"2em"}>
            Already a user?  {" "}
            <Text
              as={"span"}
              className="font-bold no-underline hover:underline cursor-pointer"
              onClick={handleToggle}
            >
               Sign In .
            </Text>{" "}
          </Text>
        )}
      </form>
    </div>
  );
};

export default Login;
