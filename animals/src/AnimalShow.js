import { useState } from "react";
import "./AnimalShow.css";
import bird from "./svg/bird.svg";
import dog from "./svg/dog.svg";
import cat from "./svg/cat.svg";
import horse from "./svg/horse.svg";
import gator from "./svg/gator.svg";
import heart from "./svg/heart.svg";
import cow from "./svg/cow.svg";

const svgMap = {
  // object where key is identical to value
  // bird : bird, etc etc  OR
  bird,
  cat,
  cow,
  horse,
  gator,
  dog,
};

function AnimalShow({ type }) {
  // prop of type that is a lowercase string telling us the name of the animal we want to render

  const [clicks, setClicks] = useState(0);
  const handleClick = () => {
    // we want to increase heart size on each click of the animal using a piece of state

    setClicks(clicks + 1);
  };
  return (
    <div className="animal-show" onClick={handleClick}>
      <img className="animal" alt="animal" src={svgMap[type]} />
      <img className = "heart" alt="heart" src={heart} style={{ width: 10 + 10 * clicks + "px" }} />
    </div>
  );
}

export default AnimalShow;
// our goal is to show a different animal each time show animal is clicked. we will have a list of different components. the animals are stored inside a string.
// we want to transform each element in our array of animals into a component where the type prop is the name of the animal.
// we can use the .map array function from javascript
