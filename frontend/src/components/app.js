import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appLat: 40.730610,
      appLng: -73.935242,
      isMarkerShown: false
    }
  }

  upDateCenter = (storeLat, storeLng) => {
    console.log(`UpdateApp to: ${storeLat} and ${storeLng}`)
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
        <Map
          appLat={this.state.appLat}
          appLng={this.state.appLng}
          appState={this.upDateCenter} />
        {/* <Map /> */}
        <Transport />
        <StoreList setAppStateCoords={this.upDateCenter} />
      </div>
    )
  }

}

export default App
