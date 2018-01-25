import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    // myApiKey = "AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc",
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }), withScriptjs, withGoogleMap)((props) =>
  <GoogleMap
    defaultZoom={14}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.lat, lng: props.lng}}
    clickableIcons={false}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

export default class Map extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }
  mapSuccess = (pos) => {
    const crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
  }

  mapError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  };

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log("Rendering Map")
    navigator.geolocation.getCurrentPosition(this.mapSuccess, this.mapError)
      // navigator.geolocation.getCurrentPosition(this.mapSuccess, this.mapError, this.options)
      // if ("geolocation" in navigator) {console.log("geolocation is available")}
      // else {console.log("gelocation is not available")}
    return (
      <MyMapComponent
        lat={59.3170826}
        lng={18.0275315}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}
