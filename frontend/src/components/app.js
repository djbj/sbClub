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
      storeList: [],
      // map default beginning is in Central Stockholm
      myLat: 59.334591,
      myLng: 18.063240,
      isLocationMarkerShown: false,
      storeLat: 0,
      storeLng: 0,
      isStoreChosen: false,
      chosenStore: 0,
      chosenTransport: "WALKING"
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

  getTransportTimes = () => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.state.myLat + "%2C" + this.state.myPosLng + "&destinations="
    // url = url + this.state.myLat + "%2C" + this.state.myPosLng
    // url += "&destinations="
    let destinationsCoords =""
    const urlStoresCoords = this.state.storeList.map(store => {
      console.log("urlAdd")
      destinationsCoords += store.Lat
      destinationsCoords += "%2C"
      destinationsCoords += store.Long
      destinationsCoords += "%7C"
    })
    url = url + urlStoresCoords + "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
    console.log(urlStoresCoords[0])
  }

  upDateStoreList = storeItems => {
    this.setState ({
      storeList:storeItems
    })
    console.log("StoreList updated in app")
  }

  upDateTransport = transport => {
    this.setState ({
      chosenTransport: transport
    })
  }

  render() {
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    this.getTransportTimes()
    return (

      <div>
        <Header />
        {this.state.isStoreChosen ? (
          <Map
            myLat={this.state.storeLat}
            myLng={this.state.storeLng}
            chosenStoreLat={this.state.storeLat}
            chosenStoreLng={this.state.storeLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown}
            storeList={this.state.storeList}
            chosenTransport={this.state.chosenTransport}/>
        ) : (
          <Map
            myLat={this.state.myLat}
            myLng={this.state.myLng}
            chosenStoreLat={this.state.storeLat}
            chosenStoreLng={this.state.storeLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown}
            storeList={this.state.storeList}
            chosenTransport={this.state.chosenTransport}/>
        )}
        <Transport
          sendToAppTransport={this.upDateTransport}
        />
        <StoreList
          callToApp={this.upDateCenter}
          setAppStoreList={this.upDateStoreList}/>
      </div>
    )
  }
}
export default App
