import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"

class App extends React.Component {
  constructor (props) {
    super(props)
      this.state = {
        appLat: 0,
        appLng: 0,
        isMarkerShown: false
      }
  }

  upDateCenter = (storeLat, storeLng) => {
    console.log("UpdateAppCenter to: " + storeLat + storeLng)
    this.setState({
      appLat: storeLat,
      appLng: storeLng
    })
  }

  render() {
    // navigator.geolocation.getCurrentPosition(this.mapSuccess, this.mapError)
    return (
      <div>
        <Header />
        <Map appLat={this.state.appLat} appLng={this.state.appLng}/>
        {/* <Map /> */}
        <Transport />
        <StoreList setAppStateCoords={this.upDateCenter}/>
      </div>
    )
  }

}

export default App
