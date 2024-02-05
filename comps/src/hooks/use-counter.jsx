import { useState, useEffect } from "react";


function useCounter(initialCount) {
    const [count, setCount] = useState(initialCount);
  
    useEffect(() => {
      console.log(count); // runs everytime count is updated.
    }, [count]);
  
    const increment = () => {
      setCount(count + 1);
    };
  
    return {
      count: count,
      increment: increment
    };
  }

  export default useCounter; 