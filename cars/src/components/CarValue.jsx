import { useSelector } from "react-redux";
function CarValue() {
  const totalCost = useSelector(({ cars: { data, searchTerm } }) => { // logic for getting total cost of cars 
    const filteredCars = data.filter((car) => { 
      return car.name.toLowerCase().includes(searchTerm.toLowerCase()); 
    });
    let cost =0; 
    for(let car of filteredCars){
      cost += car.cost;
    }
    return cost;
  });

  return <div className="car-value">Total Cost: ${totalCost}</div>;
}
export default CarValue;
/* Note: 
we dont want to change our data model just to suit the needs of the UI

*/