// basic simple component and export it

function ProfileCard({ title, handle, image,description }) {
  // use when you only care about 2 properties instead of all of them.
  // const title = props.title;
  // const handle = props.handle;  // cleaner code, destructuring, pulls off property from object and creates varible with same name at same time
  // const {title, handle} = props; // same as above
  // or we can remove 'props' from the parameter in function above and use the names above ^^ , all achieve the same.
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={image} alt="whoops" />
        </figure>
      </div>

      <div className="card-content">
        <div className="media-conent">
          <p className="title is-4">{title} </p>
          <p className="subtitle is-6">{handle}</p>
        </div>
        <div className="content" >{description}</div> 
      </div>
    </div>
  );
}
// we can use
export default ProfileCard;
