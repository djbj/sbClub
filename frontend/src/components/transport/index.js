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
    console.log("Transport changed to: " + event.target.value)
  }

  render() {
    console.log("Rendering Transport")
    return (
      <div className="transport-container">
        <button className={this.state.transport === "walking" ? "transport-chosen" : "transport-not-chosen"} value={"walking"} onClick={this.handleClick}>
          WALK
        </button>
        <button className={this.state.transport === "driving" ? "transport-chosen" : "transport-not-chosen"} value={"driving"} onClick={this.handleClick}>
          DRIVE
        </button>
        <button className="transport-not-available" value={"train"} >
          TRAIN
        </button>
      </div>
    )
  }
}

export default Transport
