import Header from "./Header";
import { Text, Button, useBreakpointValue, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Validate } from "../utils/validate";
import { addUser } from "../utils/userData";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInAnonymously
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const [isSignIn, setSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const namee = useRef(null);
  const emailIDD = useRef(null);
  const passworddd = useRef(null);

  const handleToggle = () => {
    setSignIn(!isSignIn);
  };

  const handleGuestLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      dispatch(
        addUser({
          uid: user.uid,
          email: null,
          displayName: "Guest",
          photoURL: null,
        })
      );
      
    } catch (error) {
      setErrorMsg("Guest login failed: " + error.message);
    }
  };

  const handleValidation = () => {
    const msg = Validate(emailIDD?.current?.value, passworddd?.current?.value);
    setErrorMsg(msg);
    if (msg) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        emailIDD?.current?.value,
        passworddd?.current?.value
      )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: namee?.current?.value,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
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
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        setErrorMsg(error.code + " " + error.message);
      });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailIDD?.current?.value,
        passworddd?.current?.value
      )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        setErrorMsg(error.code + " " + error.message);
      });
    }
  };

  return (
    <div className="LoginForm">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="bg"
        className={`absolute object-cover ${isMobile ? "h-screen" : ""}`}
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className={`absolute mx-auto right-0 left-0 ${
          isMobile ? "w-[60%]" : "w-[28%]"
        } mt-40 bg-black p-10 md:p-12 flex flex-col text-white bg-opacity-[85%] rounded-lg`}
      >
        <h1 className="color-white text-3xl font-bold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={namee}
            type="text"
            className="p-3 mt-8 w-full bg-gray-700 rounded-md"
            placeholder="Name"
          />
        )}

        <input
          ref={emailIDD}
          type="text"
          className="p-3 mt-8 w-full bg-gray-700 rounded-md"
          placeholder="Email or phone number"
        />

        <input
          ref={passworddd}
          type="password"
          className="p-3 my-6 w-full bg-gray-700 rounded-md"
          placeholder="Password"
        />

        <Text className="text-red-500 font-semibold py-1 px-1">{errorMsg}</Text>
        
        <button
          className="bg-red-700 p-3 w-full mt-4 rounded-md font-bold"
          onClick={handleValidation}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <Flex direction="column" mt={4} gap={2}>
          <Text textAlign="center" color="gray.400" pb={1}>OR</Text>
          
          <Button
        className="w-full"
      variant="outline"
      color="white"
      borderColor="white"
      onClick={handleGuestLogin}
      _hover={{
        bg: "white",
        color: "black",
      }}
    >
      Continue as Guest
    </Button>
        </Flex>

        {isSignIn ? (
          <Text marginTop={"2em"}>
            New to Netflix?{" "}
            <Text
              as="span"
              className="font-bold hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              Sign Up 
            </Text>
          </Text>
        ) : (
          <Text marginTop={"2em"}>
            Already a user?{" "}
            <Text
              as="span"
              className="font-bold hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              Sign In
            </Text>
          </Text>
        )}
      </form>
    </div>
  );
};

export default Login;