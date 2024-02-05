import Table from "./Table"; // we eventually want Sortable table to render table

import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";
import useSort from "../hooks/use-sort";

function SortableTable(props) {
  // no destructruing {} bc we are taking the whole object
  const { config, data } = props;
  const { sortBy, sortOrder, sortedData, setSortColumn } = useSort(
    data,
    config
  ); // custom hook!

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      // if column doesnt has a sortValue, return it like regular
      return column;
    } // else return column with an added header property(function) to customize header that gets displayed

    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  return (
    <div>
      <Table {...props} data={sortedData} config={updatedConfig} />
    </div>
  );
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        {" "}
        <GoArrowSmallUp /> <GoArrowSmallDown />{" "}
      </div>
    );
  }
  if (sortOrder === null) {
    return (
      <div>
        {" "}
        <GoArrowSmallUp /> <GoArrowSmallDown />{" "}
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        {" "}
        <GoArrowSmallUp />{" "}
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        {" "}
        <GoArrowSmallDown />{" "}
      </div>
    );
  }
}

export default SortableTable;
/*  when we click sortable header, table should re render component so we will need a state 
    option 1:  state is the sorted version of 'data'. this is not the best idea 
                when user clicks a header, re sort data, pass it into Table
    option 2: states:
    
              sortOrder: null, 'asc' 'desc'-> state to keep track of sort order (keep track of what will next click do. what kind of sort? as well as what arrow to show)
              sortBy  null,'Name', 'Score' -> state to keep track which column we are sorting by


----------
Custom Hooks:
  Functions that contain some reusbale logic. For example if we had anoter table with different data that we would also sort, we would reuse alot of the same code we did for table
  custom hooks usually reuse built in hooks like useState and useEffect
  usually easiest to extract logic into a hook rather than making a hook first. 
  Plan: 
    Make a demo component with a tiny bit of logic
    learn a design process to extract that logic into a custom hook
    go back to SortableTable and repeat the design process
     
    
    We will make a counter component  that should console log the count every time it changes. (useEffect)
    it should accept an initialCount as a prop

SortableTable custom hook creation:
  sortOrder
  sortBy
  handleClick
  updatedConfig
  ~sortingLogic~
  JSX


*/
