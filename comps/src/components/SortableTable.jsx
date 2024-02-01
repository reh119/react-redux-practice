import Table from "./Table"; // we eventually want Sortable table to render table
import { useState } from "react";
import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";

function SortableTable(props) {
  // no destructruing {} bc we are taking the whole object
  const { config, data } = props;

  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null); // what column lable we are currently sorting by

  const handleClick = (label) => {
    // function called with label of column that user clicked on
    // console.log(label);

    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  };

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
          onClick={() => handleClick(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  // Only sort data if sortOrder  && sortBy are not null
  // make a copy of the data prop.. (never modify array if its part of prop or state system), then sort that new array
  // find correct sort Value function and use it for sorting..

  let sortedData = data;
  if (sortOrder && sortBy) {
    // if not null, we need to sort
    // find correct sort value function to use
    const { sortValue } = config.find((column) => column.label === sortBy); // for everyone of those column objects, we will try to find a column object with a label equal to our current sortBy piece of state
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;
      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

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


*/
