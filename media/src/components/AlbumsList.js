import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); //  hook. try to fetch data, returns object. when called, we need to specify which users albums we are looking for so we pass in 'user' to hook
  console.log(data, error, isLoading);
  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
/* Notes
  When this component is rendered on the screen, we want to fetch all the different albums for tied to the particular user passed in as a prop into this comp
  we will use hook here 

*/
