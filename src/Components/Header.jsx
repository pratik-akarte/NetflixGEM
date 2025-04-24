import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userData";

function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  /// onAuthStateChanged  -> is an observable provided by firebase which calls itself only when authentication is modified for ex .. sign in , sign up or sign in.

  // we can also dispatch an action everytime the auth state changes i.e user sign in /sign out but this is more optimised approach for this .

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in / signed Up (block)
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        navigate("/browse");
      } else {
        // User is signed out (block)

        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.

        console.error(error);
      });
  };

  /// we are doing this in Header beaciuse it is commoon to both login and browse page which we want to afect by login or log out

  return (
    <>
      <div
        className={`w-full absolute py-12 md:py-2 px-0 md:px-2 bg-gradient-to-b from-black z-10  flex  justify-between backdrop-blur-xs ${
          user && !isMobile ? "mt-12" : ""
        }`}
      >
        <div className={`${!user ? "mx-auto" : "mx-0"}`}>
          <img
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
            className={`w-[6em] md:w-40  
              `}
          />
        </div>

        {user && (
          <div className="mr-[1.5em] flex flex-row   ">
            <Text
              className="p-1 px-3 mt-1 md:mt-5 mr-1 text-slate-100  "
              fontSize={["sm", "md"]}
            >
              {" "}
              <ChevronDownIcon w={6} h={6} />
              {user?.displayName}
            </Text>

            <Button
              className=" rounded-md font-bold mt-2 md:mt-5"
              onClick={handleSignOut}
              color={"black"}
              bg="#E50914"
              w={["5em", "5.5em"]}
              h={["1.8em", "2em"]}
              _hover={{ bg: "#E50914" }}
              paddingTop={"-2"}
              fontSize={["sm", "md"]}
            >
              Sign Out
            </Button>
          </div>
        )}
        
      </div>
    </>
  );
}

export default Header;
