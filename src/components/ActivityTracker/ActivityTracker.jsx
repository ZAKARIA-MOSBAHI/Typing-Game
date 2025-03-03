import { useState, useRef, useEffect } from "react";

export default function ActivityTracker() {
  const [isInactive, setIsInactive] = useState(false); // To track if the user is inactive

  const activityTimeoutRef = useRef(null);
  // Function to reset the inactivity timer
  const resetTimer = () => {
    // Clear if the timeout exists
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    // Set a new timeout
    activityTimeoutRef.current = setTimeout(() => {
      alert("You are AFK , Return To The Game ?");
      // app.current.classList.add("blur");
      setIsInactive(true); // Mark as inactive after timeout
    }, 10000);
    // app.current.classList.remove("blur");
    setIsInactive(false); // User is active, so set inactive state to false
  };

  // Set up event listeners for activity events (e.g., mousemove, keydown)
  useEffect(() => {
    // Add event listeners
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Initialize the timer when the component mounts
    resetTimer();

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(activityTimeoutRef.current);
    };
  }, []);
}
