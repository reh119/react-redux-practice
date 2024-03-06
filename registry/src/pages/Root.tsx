// for common elements/components we want to display on all of our pages like header
import Header from "../components/Header";
import { Outlet } from "react-router-dom"; // component for browser router to select component to currently display
export default function Root() {
  return (
    <div className="container mx-auto px-20">
      <Header />
      <Outlet />
    </div>
  );
}
