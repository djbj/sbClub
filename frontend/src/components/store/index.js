import React from "react"
import "./index.css"

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreChosen: false,
      openingTimes: this.props.openingHrs,
      openFrom: "",
      openUntil: "",
      timeToClose: "",
      travelTime: ""
    }
  }

  getOpeningTimes = openingTimes => {
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
    // openingTimes.map(day => console.log("This is openingday" + day))
    // console.log("lengd" + openingTimes.length)
    // openingTimes.forEach((open)=>{ console.log(open) })
    // let i = 0;
    // for (let times of openingTimes) {
    for (let i = 0; i < openingTimes.length; i++) {
      if (todayDate.localeCompare(openingTimes[i][0]) === 0) {
      // if (todayDate === openingTimes[i][0]) {
        console.log("Open until:" + openingTimes[i][2])}
        return openingTimes[i][2]
      // this.setState({
      //   openFrom: openingTimes[i][1],
      //   openUntil: openingTimes[i][2]
      // })
      //   return openingTimes[i][2]
      // } else {
      //   return "Could not find opening times"
      // }
      // }
    }
  }

  getTimeToClose = () => {
    const d = new Date()
    // let closingTime = this.state.timeToClose
    let closingTime = this.state.openUntil
    closingTime = closingTime.split(":")
    const minutesToClosing = ((-d + d.setHours(closingTime[0], closingTime[1], 0, 0)) / 6e4)
    this.setState({
      timeToClose: minutesToClosing
    })
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
    // console.log("Rendering Store")
    // console.log(this.props.openingHrs)
    // this.getTimeToClose()
    const openTodayUntil = this.getOpeningTimes(this.props.openingHrs)
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name"><span className="systemet">Club</span></div>
            {/* <div className="store-nr"> {this.props.nr} </div> */}
            <span className="store-address">{this.props.name} {this.props.address1} </span>
            <span className="store-coords">Lat: {this.props.storeLat} Lng: {this.props.storeLng} </span>
            <span className="store-hrs">Open Today Until: {openTodayUntil} </span>
            {/* <span className="closes-in">Closes in: {this.state.timeToClose} </span> */}
            <span className="closes-in">Closes in: {this.props.timeToClose} </span>
            <span className="walking-time">Travel time: {this.state.travelTime} </span>
          </div>
        </a>
      </div>
    )
  }
}

export default Store
