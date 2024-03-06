import { useState } from "react"; // keep track of what user types
import { useNavigate } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate(); // hook we call to programmtically naviaget user to other page in our app

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?term=${term}`); // will navigate user and update url to whatever user has typed in
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center pl-3">
          <VscSearch className="h-5 w-5 text-gray-500" />
        </div>

        <input
          className="pl-10 py-2 w-full border-0 shadow-none"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Packages"
        />
      </div>
    </form>
  );
}
/*
 We will take this search term, and then reach out to our api, do a search, and display some packages in SearchPage.tsx

 Get details on a specific packages -> registry.npmjs.org/<packagename> (make GET request here, response in json)

 Search for packages -> registry.npmjs.org/-/v1/search?text=react ()

 */
