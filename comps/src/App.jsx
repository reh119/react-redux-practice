import Route from "./components/Route";
import AccordionPage from "./pages/AccrodionPage";
import DropdownPage from "./pages/DropdownPage";
import SideBar from "./components/Sidebar";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
import TablePage from './pages/TablePage'
import CounterPage from "./pages/CounterPage";

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <SideBar />
      <div className="col-span-5">
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/">
          <DropdownPage />
        </Route>
        <Route path="/buttons">
          <ButtonPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/counter">
          <CounterPage initialCount={10} />
        </Route>
      </div>
    </div>
  );
}

export default App;

/* Notes on navigation in React(2 scenarios)
    User types in our address
        always send back the index.html file -> CRA already does this 
        when app loads up, look at address bar and use it to decide what content to show. -> how do we look at address bar? what part of it do we care about? 
    user clicks a link or presses back button
        stop the browsers defualt page switching behaviour -> how do we detect a user clicking a link? back button?
        figure out where the user was trying to go
        update content on the screen to trick the user into thinking they swapped pages -> how do we update content on screen? 
        update address bar to trick user into thinking they swapped pages -> how to update address bar?

*/
