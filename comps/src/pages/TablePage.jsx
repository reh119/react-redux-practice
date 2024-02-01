import SortableTable from "../components/SortableTable";

function TablePage(){


    const data = [
        {name: 'Orange', color: 'bg-orange-500', score: '5'}, 
        {name: 'Apple', color: 'bg-red-300', score: '3'}, 
        {name: 'Banana', color: 'bg-yellow-500', score: '1'}, 
        {name: 'Lime', color: 'bg-green-500', score: '4'}, 
    ];


    const config = [ // how to display different columns inside table
        {label: 'Name', render: (fruit) => fruit.name, sortValue: (fruit) => fruit.name}, // values/functions we are passing down into table of components
        {label: 'Color', render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />}, 
        {label: 'Score', render: (fruit) => fruit.score, sortValue: (fruit) => fruit.score},
        // if we ever want to add a column, all we do is add a brand new object with some label, render, 
    ]

    const keyFn = (fruit) => {
        return fruit.name // developer can change this depedning on what they want as a key (depending on what data they want to see in table)
    }

return(
    <div>
        <SortableTable keyFn={keyFn} config ={config} data = {data}/>
    </div>
)
}



export default TablePage;
/* 
We can changed config to make our table appear different without changing table itself
    object by object (fruit) , we move through each render function(config). eg, first fruit, goes through first render function, then we move the next render, then next render function
    repeat until all properties of first fruit done. then move on to next object(fruit)

     We want to be able to sort data 
            config will now have a sortValue property which is a function telling how to extract values from  data objects in data. aka how do we want to sort? 
        SortableTabple component (will receive data, config from tablePage)
            - look at each object in the config array
            - does the object have a sort value? 
            - if so this column must be sortable
            - add a 'header' property that will show a clickable header cell (THIS IS WHY PREVIOS section was important)
            - when user clicks this, sort data and pass the sorted data down to the table (sortedTable ,config)

            Steps: 
            1.) create SortableTable. For now, take all the props and pass them through to Table
            2.) make sure TablePage shows SortableTable
            3.) add 'sortValue' functions to column config in TablePage
            4.) SortableTable should find column objects with 'sortValue' and add a 'header' function to them
            5.) TH returned by the 'header' function should woatch for click events 
            6.) when user clicks the TH sort data and pass result table

*/ 