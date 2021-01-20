import './App.css';
import { useState } from "react";
import Places from "./Places.js"

function App() {

  const [chosen, setChosen] = useState("");

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

  const occupySmall = (vehicle) => {
    var smallIndex = check(small);
    if(smallIndex >= 0){
      var newSmall = small;
      newSmall[smallIndex] = {situation: "occupied", vehicle: vehicle, id: small[smallIndex].id}
      setSmall(newSmall);
    } else {
      occupyMedium(vehicle);
    }
  }

  const occupyMedium = (vehicle) => {
    var mediumIndex = check(medium);
    if(mediumIndex >= 0){
      var newMedium = medium;
      newMedium[mediumIndex] = {situation: "occupied", vehicle: vehicle, id: medium[mediumIndex].id}
      setMedium(newMedium);
    } else {
      occupyLarge(vehicle);
    }
  }

  const occupyLarge = (vehicle) => {
    var largeIndex = check(large);
    if(largeIndex >= 0){
      var newLarge = large;
      newLarge[largeIndex] = {situation: "occupied", vehicle: vehicle, id: large[largeIndex].id}
      setLarge(newLarge);
    } else {
      var newQueue = queue;
      newQueue.push(vehicle)
      setQueue(newQueue);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    switch(chosen){
      case "Motorcycle":
        occupySmall(chosen, e);
        break;
      case "Sedan":
        occupyMedium(chosen, e);
        break;
      case "Truck":
        occupyLarge(chosen, e);
        break;
      default:
        alert("NOT A VALID VEHICLE")      
    }
    setChosen("");
  }

  const handleChange = (e) => {
    e.preventDefault();
    setChosen(e.target.value);
  }

  const freeSpace = (i) => {
    if(i <= 5){
      let spot = [...small];
      for(let j=0; j<spot.length; j++){
        if(spot[j].id === i){
          spot[j] = {situation: "free", vehicle: null, id: i}
          setSmall(spot);
        }
      }
    }
    if(i >5 && i <= 10){
      let spot = [...medium];
      for(let j=0; j<spot.length; j++){
        if(spot[j].id === i){
          spot[j] = {situation: "free", vehicle: null, id: i}
          setMedium(spot)
        }
      }
    }
    if(i >10){
      let spot = [...large];
      for(let j=0; j<spot.length; j++){
        if(spot[j].id === i){
          spot[j] = {situation: "free", vehicle: null, id: i}
          setLarge(spot)
        }
      }
    }
  }

  const handleNext = () => {
  	switch(queue[0]){
  		case "Motorcycle":
  			if(check(small) !== -1 || check(medium) !== -1 || check(large) !== -1){
  				var newQueue1 = [...queue];
  				var vehicle1 = newQueue1.shift();
  				occupySmall(vehicle1);
  				setQueue(newQueue1)
  			} else {
  				alert("NO AVAILABLE SPACE");
  			}
  			break;
  		case "Sedan":
  			if(check(medium) !== -1 || check(large) !== -1){
  				var newQueue2 = [...queue];
  				var vehicle2 = newQueue2.shift();
  				occupyMedium(vehicle2);
  				setQueue(newQueue2)
  			} else {
  				alert("NO AVAILABLE SPACE");
  			}
  			break;
  		case "Truck":
  			if(check(large) !== -1){
  				var newQueue3 = [...queue];
  				var vehicle3 = newQueue3.shift();
  				occupyLarge(vehicle3);
  				setQueue(newQueue3)
  			} else {
  				alert("NO AVAILABLE SPACE")
  			}
  			break;
  		default:
  			alert("THE QUEUE IS EMPTY!!!")	 				
  	}
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src="https://seeklogo.com/images/T/traffic-signs-logo-7823141A70-seeklogo.com.png" alt="No hay logo" className="logo" />
        <div>
          <p> PARKING EXERCISE </p>             
          <form onSubmit={handleSubmit} >
            <select name="vehicle" onChange={handleChange} value={chosen}>
              <option value="">Choose one...</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Sedan">Sedan</option>
              <option value="Truck">Truck</option>
            </select>
            <button>
              PARK
            </button>  
          </form>
        </div>
      </header>
      {
        <>
        <div className="small">
          {
            small.map(el => (
              <div key={el.id} className="parkSpace"> 
                <Places  key={el.id} vehicle={el.vehicle} situation={el.situation} />
                {el.situation === "occupied"?
                  <button onClick={() => freeSpace(el.id)}> FREE SPACE </button>
                  :
                  <div> EMPTY SMALL PLACE </div>
                }
              </div>
            ))
          }
        </div>
        <div className="medium">
          {
            medium.map(el => (
              <div key={el.id} className="parkSpace"> 
                <Places  key={el.id} vehicle={el.vehicle} situation={el.situation} />
                {el.situation === "occupied"?
                  <button onClick={() => freeSpace(el.id)}> FREE SPACE </button>
                  :
                  <div> EMPTY MEDIUM PLACE </div>
                }
              </div>
            ))
          }
        </div>
        <div className="large">
          {
            large.map(el => (
              <div key={el.id} className="parkSpace"> 
                <Places  key={el.id} vehicle={el.vehicle} situation={el.situation} />
                {el.situation === "occupied"?
                  <button onClick={() => freeSpace(el.id)}> FREE SPACE </button>
                  :
                  <div> EMPTY LARGE PLACE </div>
                }
              </div>
            ))
          }
        </div>

        <h3> Queue: </h3>
        {
        	queue.length === 0 ? 
        		<h3> THE QUEUE IS EMPTY </h3> 
			     :        	
	        	<div>
              <button onClick={handleNext}> NEXT!!! </button>
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
