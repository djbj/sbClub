import React from "react"
import "./index.css"

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreChosen: false
    }
  }

  handleClick = () => {
    console.clear()
    this.setState({
      isStoreChosen: !this.state.isStoreChosen
    })
    console.log(`Store clicked is: ${this.props.name} with coords ${this.props.storeLat} ${this.props.storeLng}`)
    this.props.callToStoreList(this.props.storeLat, this.props.storeLng, this.state.isStoreChosen)
  }

  render() {
    console.log("Rendering Store")
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name"><span className="systemet">Systemet</span></div>
            {/* <div className="store-nr"> {this.props.nr} </div> */}
            <span className="store-address">{this.props.name}{this.props.address1}, {this.props.address3}, {this.props.address4} </span>
            <span className="store-coords">Lat: {this.props.storeLat} Lng: {this.props.storeLng} </span>
          </div>
        </a>
      </div>
    )
  }
}

export default Store
