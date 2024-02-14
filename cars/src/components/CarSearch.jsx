import { useDispatch, useSelector} from "react-redux";
import {changeSearchTerm} from '../store'

function CarSearch() {

  const dispatch = useDispatch(); 
  const searchTerm = useSelector((state) => { // access state
    return state.cars.searchTerm
  })

  const handleSearchTermChange= (event) => {
    dispatch(changeSearchTerm(event.target.value))

  }
  return (
    <div className="list-header">
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <input
          className="input"
          value={searchTerm} // access state 
          onChange={handleSearchTermChange} // update state 
        ></input>
      </div>
    </div>
  );
}
export default CarSearch;
