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
      isStoreChosen: !this.state.isStoreChosen,
      chosenStore: this.props.nr
    })
    console.log(`Store clicked is: ${this.props.name} with coords ${this.props.storeLat} ${this.props.storeLng}`)
    console.log(`StoreChosen is ${this.state.chosenStore}`)
    this.props.callToStoreList(
      this.props.storeLat,
      this.props.storeLng,
      this.state.isStoreChosen,
      this.state.chosenStore
    )
  }

  render() {
    console.log("Rendering Store")
    console.log(this.props.openingHrs)
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name"><span className="systemet">Club</span></div>
            {/* <div className="store-nr"> {this.props.nr} </div> */}
            <span className="store-address">{this.props.name} {this.props.address1}</span>
            <span className="store-coords">Lat: {this.props.storeLat} Lng: {this.props.storeLng} </span>
            <span className="store-hrs">Open Today Until: {this.props.openingHrs}</span>
          </div>
        </a>
      </div>
    )
  }
}

export default Store
