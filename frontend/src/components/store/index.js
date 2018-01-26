import React from "react"
import "./index.css"

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosen: false
    }
  }

  handleClick = (event) => {
    this.setState({
      chosen: true
    });
    console.log("Store clicked is: " + this.props.name + " with coords " + this.props.storeLat + " " + this.props.storeLng)
    this.props.callToParent(this.props.storeLat, this.props.storeLng)
  }

  render() {
    console.log("Rendering Store")
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name">Systemet {this.props.name}</div>
            {/* <div className="store-nr"> {this.props.nr} </div> */}
            <span className="store-address">{this.props.address1}, {this.props.address3}, {this.props.address4} </span>
            <span className="store-coords">Lat: {this.props.storeLat} Lng: {this.props.storeLng} </span>
          </div>
        </a>
      </div>
    )
  }
}

export default Store
