import classNames from "classnames";

function Panel({ children, className, ...rest }) {
// childten is content we want to diplsay // check this again
// className that we have to merge with default class names, 
//...rest is additional props we might have to deal with and pass through to underlying div.
// benefit of panel if we have consistent stlying acrros this app. any time we want to show element with this styling, we dont need to make it from scratch.

  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className
  );


  return <div {...rest} className={finalClassNames}> {children}</div>
}
export default Panel;
