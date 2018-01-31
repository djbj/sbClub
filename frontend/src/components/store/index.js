import React from "react"
import "./index.css"

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreChosen: false,
      // openHrs: ""
    }
  }

  componentDidMount() {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // January is 0!
    const yyyy = today.getFullYear()
    // const currentTime = today.getHours() + ":" + today.getMinutes()
    // const currentTime = `${today.getHours()}:${today.getMinutes()}`
    // console.log(currentTime)
    if (dd < 10) { dd = `0${dd}` }
    if (mm < 10) { mm = `0${mm}` }
    const todayDate = `${yyyy}-${mm}-${dd}`
    // if(openHrs) { console.log("openHrs" + openHrs[0][0]) }
    // const openHrs.map(day => console.log("This is openingday" + day))
    // console.log("lengd"+openHrs.length)
    const openHrs = this.props.openingHrs
    console.log("OpeningHrsLength" + openHrs.length)
    // for (var i = 0; i < openHrs.length; i++) {
    //   console.log("inArrey")
    // }
  }

//   getOpeningTimes = openHrs => {
//     const today = new Date()
//     let dd = today.getDate()
//     let mm = today.getMonth() + 1 // January is 0!
//     const yyyy = today.getFullYear()
//     // const currentTime = today.getHours() + ":" + today.getMinutes()
//     // const currentTime = `${today.getHours()}:${today.getMinutes()}`
//     // console.log(currentTime)
//     if (dd < 10) { dd = `0${dd}` }
//     if (mm < 10) { mm = `0${mm}` }
//     const todayDate = `${yyyy}-${mm}-${dd}`
//     // if(openHrs) { console.log("openHrs" + openHrs[0][0]) }
//     // const openHrs.map(day => console.log("This is openingday" + day))
//     // console.log("lengd"+openHrs.length)
//     for (var i = 0; i < openHrs.length; i++) {
//       console.log("inArrey")
//     }
// }

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
    // console.log("Rendering Store")
    // console.log(this.props.openingHrs)
    // this.getOpeningTimes(this.props.openingHrs)
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
