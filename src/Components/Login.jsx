import Header from "./Header";
import { Text, useBreakpointValue } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Validate } from "../utils/validate";

import { addUser } from "../utils/userData";
import { useDispatch } from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const [isSignIn, setSignIn] = useState("true");
  const [errorMsg, setErrorMsg] = useState(null);

  ///ref variable provided by React which refers to specific field lik input or button
  const namee = useRef(null);
  const emailIDD = useRef(null);
  const passworddd = useRef(null);

  const handleToggle = () => {
    setSignIn(!isSignIn);
  };

  const handleValidation = () => {
    ///form validation :::
    const msg = Validate(emailIDD?.current?.value, passworddd?.current?.value);
    setErrorMsg(msg);

    if (msg) return;

    if (!isSignIn) {
      //Sign UP form

      createUserWithEmailAndPassword(
        auth,
        emailIDD?.current?.value,
        passworddd?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: namee?.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred

              setErrorMsg(error.message);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMsg(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      ///sign in logic

      signInWithEmailAndPassword(
        auth,
        emailIDD?.current?.value,
        passworddd?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMsg(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div className="LoginForm">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="bg"
        className={`absolute object-cover  ${isMobile ? "h-screen" : ""}`}
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className={`absolute mx-auto right-0 left-0 ${
          isMobile ? "w-[60%]" : "w-[28%]"
        } mt-40 bg-black p-10 md:p-12 flex flex-col text-white bg-opacity-80 rounded-lg`}
      >
        <h1 className="color-white text-3xl  font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn ? (
          <input
            ref={namee}
            type="text"
            name=""
            id=""
            className="p-3 mt-8 w-full bg-gray-700 rounded-md"
            placeholder="Name"
          />
        ) : null}

        <input
          ref={emailIDD}
          type="text"
          name=""
          id=""
          className="p-3 mt-8 w-full bg-gray-700 rounded-md"
          placeholder="Email or phone number"
        />

        <input
          type="password"
          ref={passworddd}
          className="p-3 my-6 w-full bg-gray-700 rounded-md "
          placeholder="Password"
        />

        <Text className="text-red-500 font-semibold py-1 px-1">{errorMsg}</Text>
        <button
          className="bg-red-700 p-3 w-full mt-4 rounded-md font-bold"
          onClick={handleValidation}
        >
          {" "}
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {isSignIn ? (
          <Text marginTop={"2em"}>
            New to Netflix?{" "}
            <Text
              as={"span"}
              className="font-bold no-underline hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              Sign Up
            </Text>{" "}
            Now
          </Text>
        ) : (
          <Text marginTop={"2em"}>
            Already a user?{" "}
            <Text
              as={"span"}
              className="font-bold no-underline hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              Sign In
            </Text>{" "}
          </Text>
        )}
      </form>
    </div>
  );
};

export default Login;
