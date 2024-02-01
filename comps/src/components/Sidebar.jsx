import Link from "./link";

function SideBar() {
  const links = [
    { label: "Dropdown", path: "/" },
    { label: "Accordion", path: "/accordion" },
    { label: "Buttons", path: "/buttons" },
    {label: 'Modal', path: '/modal'}, 
    {label: 'Table', path: '/table'}

    
  ];
  // we will map over this array of objects, and for every object we produce a link component using the label to specify what we want to show and path to specofy address user is going to when link clicked
  const renderedLinks = links.map((link) => {
    return (
      <Link
        activeClassName="font-bold border-l-4 border-blue-500 pl-2"
        className="mb-3"
        key={link.label}
        to={link.path}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
      {renderedLinks}
    </div>
  );
}

export default SideBar;
