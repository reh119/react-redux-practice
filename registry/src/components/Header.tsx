import { Link } from "react-router-dom"; // to navigate user somewhere in our page with link
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 border-b h-15">
      <div className="flex items-center space-x-2 text-sm ">
        <Link className="text-lg font-bold" to="/">
          NPM Registry
        </Link>
      </div>
      <div className="w-full max-w-xl ml-4">
        <SearchInput />
      </div>
    </div>
  );
}
/* 
Displaying a link user can click on is one method of navigating that is more declaritively. This is navigating link

There is anoother form of navigating called programmatic navigation where some code is ran at specific point time that tries to navigate user off to some other page in our app. Like with a search input. (user types in search bar and code is ran to take us to a page)
 -  We need to figure out where to navigate user to when they click enter on their search. which is the search page
 - We will use useNavigate. A hook to naviaget user around our app uisng programmatic navigation. it will allow us to run some logic before user naviagtes around. PN is based on an event. 
 - Another option is navigating user around based on form submission event(short cut to above). 




*/
