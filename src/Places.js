import "./Places.css";


function Places(props) {

	const misterio = (props) => {
		console.log(props)
	}

	return (
		<div className="container" >
			<h1> Situation: </h1>
			<h2> {props.situation && props.situation} </h2>
			<h1> Vehicle: </h1>
			<h2> {props.vehicle && props.vehicle} </h2>
		</div>
	)
}

export default Places;