import React from "react"
import "./index.css"

class Transport extends React.Component {

  render() {
    console.log("Rendering Transport")
    return (
      <div className="transport-container">
        <div className="transport-walking">
          WALK
        </div>
        <div className="transport-driving">
          DRIVE
        </div>
        <div className="transport-train">
          TRAIN
        </div>
      </div>
    )
  }
}

export default Transport
