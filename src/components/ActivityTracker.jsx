import React , {useState , useRef , useEffect} from 'react';

export default function ActivityTracker({gameContainer , userInput}) {
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
        setIsInactive(true); // Mark as inactive after timeout
        alert("are you afk ?")
        //  gameContainer.current.classList.add("blur");
        //  userInput.current.blur();

      }, 10000);
      setIsInactive(false); // User is active, so set inactive state to false
    };
  
    // Set up event listeners for activity events (e.g., mousemove, keydown)
    useEffect(() => {
      const handleUserActivity = () => {
        resetTimer(); // Reset the timer whenever there is activity
      };
  
      // Add event listeners
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
  
      // Initialize the timer when the component mounts
      resetTimer();
  
      // Cleanup event listeners when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
        clearTimeout(activityTimeoutRef.current);
      };
    }, []);
  
     
}
