import React from "react"
import "./index.css"

class Transport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transport: "walking"
    }
  }

  handleClick = (event) => {
    this.setState({
      transport: event.target.value
    });
  }

  render() {
    console.log("Rendering Transport")
    return (
      <div className="transport-container">
        <button className="transport-walking" value={"walking"} onClick={this.handleClick}>
          WALK
        </button>
        <button className="transport-driving" value={"driving"} onClick={this.handleClick}>
          DRIVE
        </button>
        <button className="transport-train" value={"train"} onClick={console.log(this.state.transport)}>
          TRAIN
        </button>
      </div>
    )
  }
}

export default Transport
