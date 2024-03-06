import type { DetailsLoaderResult } from "./detailsLoader";
import { useLoaderData } from "react-router-dom";

export default function DetailsPage() {
  const { details } = useLoaderData() as DetailsLoaderResult;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold my-4"> {details.name}</h1>
      <div>
        <h3 className="text-lg font-bold">Description</h3>
        <div className="p-3 bg-gray-200 rounded">{details.description}</div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Liscense</h3>
        <div className="p-3 bg-gray-200 rounded">{details.license}</div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Author</h3>
        <div className="p-3 bg-gray-200 rounded">{details.author?.name}</div>
      </div>
    </div>
  );
}
// This component will be displayed when user goes to route 'packages/react' where react is the name of package that we want to show to user
// when a user comes to this details page, we need to make a request off to the npm api and get some info about the React Package. Then, on the details page, we want to show some info about the package. Remember to get detials on specific package we make a request to registry.npmjs.org/<packagename>.
// It turns out that some packages have an author property of undefined! Because of this, referencing details.author.name in the DetailsPage JSX can result in an error.To fix this, find this line: {details.author.name} And change it to: {details.author?.name}
