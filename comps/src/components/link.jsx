import useNavigation from "../hooks/use-navigation";
import classNames from "classnames";

// to -> path we want to naviagte to when user clicks on this link
// children -> some text we want to show in anchor element

function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation(); // only want access to function for now

  const classes = classNames(
    "text-blue-500",
    className,
    currentPath === to && activeClassName // fancy syntax, will only end up with activeClassName if currentPath is equal to 'to' 
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlkey) {
      return; // when command is held while clicking link, do defautl browser actions
    }
    event.preventDefault(); // stops total page refresh that is default by browser
    // we will instead programmatically navigate to some other path (navigate function inside NavigationProvider)
    navigate(to);
  };
  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
