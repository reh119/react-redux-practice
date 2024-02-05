import { useState } from "react";

function useSort(data, config) {
  const [sortOrder, setSortOrder] = useState(null); //
  const [sortBy, setSortBy] = useState(null); // what column lable we are currently sorting by
  // goal is to take the name/label of some column and use it as new sorting column
  const setSortColumn = (label) => {
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
  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  };
}

export default useSort;
