import './App.css';
import { useState } from "react";
import Places from "./Places.js"

function App() {


  const [small, setSmall] = useState([
      {situation: "free", vehicle: null, id:1},
      {situation: "free", vehicle: null, id:2},
      {situation: "free", vehicle: null, id:3},
      {situation: "free", vehicle: null, id:4}, 
      {situation: "free", vehicle: null, id:5},      
  ])

  const [medium, setMedium] = useState([
      {situation: "free", vehicle: null, id:6},
      {situation: "free", vehicle: null, id:7},
      {situation: "free", vehicle: null, id:8},
      {situation: "free", vehicle: null, id:9}, 
      {situation: "free", vehicle: null, id:10},      
  ])

  const [large, setLarge] = useState([
      {situation: "free", vehicle: null, id:11},
      {situation: "free", vehicle: null, id:12},
      {situation: "free", vehicle: null, id:13},
      {situation: "free", vehicle: null, id:14}, 
      {situation: "free", vehicle: null, id:15},      
  ])

  const [queue, setQueue] = useState([]);

  const check = (arr) => {
    for(var i=0; i<arr.length; i++){
      if(arr[i].situation === "free"){
        return i;
      }
    }
    return -1;
  }

  const occupySmall = (vehicle, event) => {
  	console.log(event)
    var smallIndex = check(small);
    if(smallIndex >= 0){
      var newSmall = small;
      newSmall[smallIndex] = {situation: "occupied", vehicle: vehicle}
      setSmall(newSmall);
      console.log(small);
    } else {
      occupyMedium(vehicle, event);
    }
  }

  const occupyMedium = (vehicle, event) => {
  	console.log(event);
    event.preventDefault();
    var mediumIndex = check(medium);
    if(mediumIndex >= 0){
      var newMedium = medium;
      newMedium[mediumIndex] = {situation: "occupied", vehicle: vehicle, id: newMedium.id}
      setMedium(newMedium);
      console.log(medium)
    } else {
      occupyLarge(vehicle, event);
    }
  }

  const occupyLarge = (vehicle, event) => {
  	console.log(event);
    event.preventDefault();
    var largeIndex = check(large);
    if(largeIndex >= 0){
      var newLarge = large;
      newLarge[largeIndex] = {situation: "occupied", vehicle: vehicle}
      setLarge(newLarge);
      console.log(large)
    } else {
      alert("NO PLACE FREE!");
      console.log("LA QUEUE ES: ", queue)
      var newQueue = queue;
      newQueue.push(vehicle)
      console.log("LA NEWQUEUE ES: ", newQueue);
      setQueue(newQueue);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <p> PARKING EXERCISE </p>
        <button className="vehicleButton" value="Motorcycle" onClick={(event) => occupySmall("Motorcycle", event)} > MOTORCYCLE </button>
        <button className="vehicleButton" value="Sedan" onClick={(event) => occupyMedium("Sedan", event)} > SEDAN </button>
        <button className="vehicleButton" value="Truck" onClick={(event) => occupyLarge("Truck", event)} > TRUCK </button>                
      </header>
      {
        <>
        <div className="small">
          <h3 className="title">Small: </h3>
          {
            small.map(el => (
              /*el.situtation === "free" ?
              <div> VACIO </div>
              :*/
              <Places key={el.id} vehicle={el.vehicle} situation={el.situation} />
            ))
          }
        </div>

        <div className="medium">
          <h3 className="title">Medium: </h3>
          {
            medium.map(el => (
              <Places key={el.id} vehicle={el.vehicle} situation={el.situation} />
            ))
          }
        </div>


        <div className="large">
          <h3 className="title">Large: </h3>
          {
            large.map(el => (
              <Places key={el.id} vehicle={el.vehicle} situation={el.situation} />
            ))
          }
        </div>

        <h3> Queue: </h3>
        {
        	queue.length === 0 ? 
        		<h3> THE QUEUE IS EMPTY </h3> 
			     :        	
	        	<div>
	        		{
	        		queue.map(el => {
	        			return (<div> {el} </div>)
	        		})
	        		}
	        	</div>
        }
      </>
      }              
    </div>
  );
}

export default App;
