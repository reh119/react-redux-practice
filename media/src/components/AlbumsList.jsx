import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user); //  hook. try to fetch data, returns object. when called, we need to specify which users albums we are looking for so we pass in 'user' to hook.
  // the user argument is passed to 'query' function back where we define endpoints (query function). this is so we can specify ehich albums we are looking for. this is done often

  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user); // calling what returned from our hook, user is user we want to tie album to
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div> Error Loading Albums</div>;
  } else {
    // map over array of data(album objects). for each one, we will create one expandable panel with header of albums title
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold"> Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          {" "}
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
/* Notes
useFetchAlbumsQuery(user): 
  When this component is rendered on the screen, we want to fetch all the different albums for tied to the particular user passed in as a prop into this comp
  we will use hook here 

  So when a user clicks the drop down on a name, this AlbumsList component will be rendered, causing our hook useFetchAlbumsQuery(user); to run and make a request to fetch list of albums for that user!
  Now we can map over this data  (list of albums), and print out / render info about it to our screen 

  Here, this component may be rendered many times but the api request is only made once 
useAddAlbumMutation(user): 


*/
