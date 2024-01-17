// code related to contacting unsplash api

// location of api:  https://api.unsplash.com/
import axios from "axios";

const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      // needs auth from unsplash api
      Authorization: "Client-ID e8nSgp1SGYO-w13t3LLgLex87GyJ2KvOcAjQeiwWrG0",
    },
    params: {
      query: term, // what user types into search bar
    },
  });
  //console.log(response.data.results); // array of images 

  return response.data.results;
};
export default searchImages; 



/* Async/Await Notes:
    await -> tells js to wait for request we are making to respond back, once we get it we can move forward.
    aysnc -> keyword used with await. if we use await we must mark the enclosing function with async keyword. 

*/ 