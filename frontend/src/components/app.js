import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"
// import MapWithMarker from "./map-with-marker"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // map default beginning is in Central Stockholm
      myLat: 59.334591,
      myLng: 18.063240,
      isLocationMarkerShown: false,
      storeLat: 0,
      storeLng: 0,
      isStoreChosen: false,
      chosenStore: 0,
      storeList: []
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
      myLng: crd.longitude,
      isLocationMarkerShown: true
    })
  }

  getMyLocationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  upDateCenter = (latitude, longitude, isChosen, storeNr) => {
    console.log(`UpdateApp to: ${latitude} and ${longitude}`)
    this.setState({
      myLat: this.state.myLat,
      myLng: this.state.myLng,
      storeLat: latitude,
      storeLng: longitude,
      isStoreChosen: true,
      chosenStore: storeNr
    })
  }

  upDateStoreList = storeItems => {
    this.setState ({
      storeList:storeItems
    })
    console.log("StoreList updated in app")
  }

  render() {
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    return (

      <div>
        <Header />
        {this.state.isStoreChosen ? (
          <Map
            myLat={this.state.storeLat}
            myLng={this.state.storeLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown} />
        ) : (
          <Map
            myLat={this.state.myLat}
            myLng={this.state.myLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown} />
        )}
        {/* <Transport /> */}
        <StoreList
          callToApp={this.upDateCenter}
          setAppStoreList={this.upDateStoreList}/>
      </div>
    )
  }
}
export default App
