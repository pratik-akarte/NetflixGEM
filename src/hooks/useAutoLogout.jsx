// utils/useAutoLogout.js
import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const useAutoLogout = () => {
  const timerRef = useRef();

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      signOut(auth).catch((err) => console.error("Auto logout error:", err));
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Initial call

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);
};

// User loads the page:

// setTimeout runs → assigns ID (e.g., 42) to timerRef.current.

// Now, timerRef.current === 42.

// User moves the mouse:

// resetTimer() is called.

// clearTimeout(42) cancels the previous timeout.

// A new setTimeout runs → assigns a new ID (e.g., 43) to timerRef.current.

// User stays idle for 2 minutes:

// The timeout callback fires → triggers signOut(auth).

// timerRef.current still holds the last ID (43), but it’s no longer needed.

// User leaves the page:

// React’s cleanup runs clearTimeout(43) (defensive programming).