
import { Fragment } from "react"; // simple component when we want to provide a key prop but dont want anything to show up in the dom

function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map((columnConfig) => {
    // columnConfig is going to be each of the objects we created in TablePage

    if (columnConfig.header) {
      // if oen of the objects in config has a header function/property, we will invoke its arrow function, if not we return the folllowing label
      return <Fragment key={columnConfig.label}>{columnConfig.header()}</Fragment>; // allows us to add a key without changing the dom
    }

    return <th key={columnConfig.label}>{columnConfig.label} </th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      // column is each config object
      return (
        // this will allow us to have a list of td elements equal to the number of config objects
        <td className="p-2" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });
    // content inside td is decided by render functions back in TablePage
    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table-auto border-spacing-2">
      <thead>
        <tr className="border-b-2">{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default Table;

/* Table Notes
    Goal is to show some data to user. so we need to make sure our table actually recieves some data.
        - we can use an array of objects for data we want to share
        - every object will represent one row in our table, where each object will have a couple of properties 
        - this data will be defined in a parent component (TablePage)
        - this list of rowDatas(array of objects) will be passed donw into Table as a prop
        - our table component will display this list 
    HTML Table Notes:
        no divs can be wrapped 
        thead -> header of table, tr-> one row of headers, th-> each individual header column name
        tbody -> collection of different rows, tr-> each individual row, td-> a single cell /coulmn within row left-right
            We want to show a sperate row for every object inside our data array ... mapping function!
            we want to make sure the color shows in a little square 
            we are pretty much done but.. its not reusable!

        How can we make the table component reusable? 
            only works with rowData objects, what if its vehicles? 
            Requirments:
                variable number of rows
                variable number of cols
                # columns doenst have to match # of properties in each object
                some columns are sortable
                sortable columns can sort different kind of values
                cells can be calculated using multiple properties 
                cells can display arbitrary data
            1.) we will focus on generating table header elements on fly using a new array of objects called config... mapping!
            2.) now we want to focus on rendering individual cells 
                we will add another property to config called render(function). each object will have a render function. these render functions will describe how we will produce all the content 
                    displayed in one column
                we need to make sure that the number of Tds in table that we show is equal to number of config objects inisde our config prop. this is because there may be tables with 1 column, or 2 , or 3 and we should write code that works for most cases
                solution for this is making a nested mao function that will be inside renderedRows. here we will produce jsx using a mapping function that maos over config array,
                and for every object ibside the config array, we will call the render function and pass in the current rowData we are iterating over, and use that to produce a new td element 
                in short, we are replacing this:    
        <td className="p-3">{config[0].render(rowData)}</td>{" "}
       // taking the rowData object we are currently mapping, and pass it into render function and get back the rowDatas name. then we display in first TD 
        <td className="p-3">{config[1].render(rowData)}</td>
        <td className="p-3">{config[2].render(rowData)}</td>
            this is because this code is assuming there will only ever be 3 columns
        Another issue arising is we still have the reference 'fruit' in this code. implying it will only work for fruit. how can we fix this? 
            now that we changed these references from fruit to rowData, we now have a problem where the key being chose implies that our different records being recieved are gonna have a name prop 
            that is suitable to use as a key. work sometimes  but what about when there is no name prop? (.name) ?
                we will put the burden of choosing a key on the developer using our table component. that way, no matter whatdata they want to show in a table, they can choose a suitable key
                this will be done with keyFn function prop being passed in from TablePage
                we have successfully changed our code here to not make any assumptions on the data being passed into our Table component (other than it has to be array of objects). so data can be anything making it more resubale 
*/
/*Table Sorting Notes/plan 
    1.) Understand how table is supposed to work
    2.) review sorting in JS
    3.) look at options for adding sort to the table
    **Remember the table component is supposed to be reusable
    Will add ascending and descending order, remeber we are not just sorting the value but the whole row. 
        user clicks on sort 
        unsorted -> ascend order -> descending
        can be interrupted by sorting column by another criteria
    Sorting in JS: ( i didnt spend alot of time here, can look at docs when needed)
        went over .sort function in java and comparator functions for sorting array of ints
        went over sorting strings, localeCompare returns -1, 0 , 1
        went over sorting array of objects;
            here we have many options in sorting objects based on different properties in array of object
            first we have to do a calculation on each object, then used that transformed value as basis of sorting criteria 
            went over typeof
            to flip from ascend to descend, multiply by -1
            ternary expressions
    Review of code in Table Component right now:
        rendering header cells
        rendering rows
        assemble and return the table
    Code in Table when Sorting added
        state to track sorting stuff
        function to handle click on a header
        rendering headers + sort direction icons
        sorting logic
        rendering rows
        assemble and return the table
    Code in Table when sorting added with --OPTIONAL-- sorting added
        state to track sorting stuff
        function to handle click on a header
            only handle click if sorting enabled
        rendering headers
            if sorting enabled, add icons
        if sorting enabled
            sorting logic
        rendering rows
        assemble and return the table
    we will think of a better way to do this^^: 
    

    
Solution: we will add an optional property in our config array of objects called header(dont see why)
    header will be an optional function to decide what to show in the table header of our tables
        ultimatley we will always show the label, but is there anything else we should show? 
        inside table component when we go to render out the headers, if there is a header function provided on a given config object, we will use that header function to decide what to show, otherwisr
        well just show the label
            basically we are trying to give the option of making a custom header cells this way
                at first glance, this seems unimportant, but this feature will now allow us to control exactly what is being displayed inside of all the headers
                why is this important???
        
        We want to be able to sort data 
            config will now have a sortValue property which is a function telling how to extract values from  data objects in data. aka how do we want to sort? 
        SortableTabple component (will receive data, config from tablePage)
            - look at each object in the config array
            - does the object have a sort value? 
            - if so this column must be sortable
            - add a 'header' property that will show a clickable header cell (THIS IS WHY PREVIOS section was important)
            - when user clicks this, sort data and pass the sorted data down to the table (sortedTable ,config)

                    

*/
