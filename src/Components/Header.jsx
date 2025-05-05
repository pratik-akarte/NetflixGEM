
import { Button, Text, useBreakpointValue, Image } from "@chakra-ui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userData";
import { PiHandWavingDuotone } from "react-icons/pi";

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
          user && !isMobile ? "mt-2" : "mt-0"
        }`}
      >
        <div className={`${!user ? "mx-auto" : "mx-0"}`}>
          <Image
            src="/logo.png"
            alt="logo"
            loading="lazy"
            width={{base:'3em', md:'4em', lg:'4em'}}
            height={'auto'}
            ml={user ? { base: '3em', md: '4em', lg: '4em' } : 0}
            mt={!user ? {base: '1em', md: '2em', lg: '2em' } : 0}
           
          />
        </div>

        {user && (
          <div className="mr-[1.5em] flex flex-row   ">
            
            
              {user?.email === null ? (
                <Text  className="p-1 px-3 mt-1 md:mt-5 mr-1 text-slate-100  "
                fontSize={["sm", "md"]}>  <PiHandWavingDuotone className="inline-block" /> Guest</Text>
              ) : (
                <Text  className="p-1 px-3 mt-1 md:mt-5 mr-1 text-slate-100  "
                fontSize={["sm", "md"]}><PiHandWavingDuotone className="inline-block" /> {user?.displayName}</Text>
              )}
            
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
