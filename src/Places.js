import "./Places.css";


function Places(props) {

	return (
		<div className="container" >
			<div className={props.situation}>
				<h1 className="title"> Situation: </h1>
				<h2 className="prop"> {props.situation && props.situation} </h2>
				<h1 className="title"> Vehicle: </h1>
				<h2 className="prop"> {props.vehicle && props.vehicle} </h2>
			</div>
		</div>
	)
}

export default Places;