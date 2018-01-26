import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // map default beginning is in Central Stockholm
      myLat: 59.334591,
      myLng: 18.063240,
      isMyMarkerLocationShown: false,
      storeLat: 0,
      storeLng: 0
    }
  }
  getLocationSuccess = pos => {
    const crd = pos.coords
    console.log("Your current position is:")
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log("")
    this.setState({
      myLat: crd.latitude,
      myLng: crd.longitude
    })
  }

  getMyLocationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  upDateCenter = (latitude, longitude) => {
    console.log(`UpdateApp to: ${latitude} and ${longitude}`)
    this.setState({
      myLat: this.state.myLat,
      myLng: this.state.myLng,
      storeLat: latitude,
      storeLng: longitude
    })
  }

  render() {
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    return (

      <div>
        <Header />
        <Map
          myLat={this.state.myLat}
          myLng={this.state.myLng}
          appState={this.upDateCenter} />
        <Transport />
        {/* <MapWithMarker /> */}
        <StoreList callToApp={this.upDateCenter} />

      </div>
    )
  }

}

export default App
