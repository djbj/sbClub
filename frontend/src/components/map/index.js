import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoBox } from "react-google-maps"

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
    onZoomChanged={()=>(console.log("ZoomChanged"))}
    defaultZoom={14}
    onClick={()=>(console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.lat, lng: props.lng}}
    center={{lat: props.lat, lng: props.lng}}
    clickableIcons={false}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}

  </GoogleMap>
)

export default class Map extends React.PureComponent {
  constructor(props){
    super(props)
      this.state = {
        isMarkerShown: false,
        lat: 40.730610,
        lng: -73.935242
        // lat: this.props.appLat,
        // lng: this.props.appLng
      }
  }

  mapSuccess = (pos) => {
    const crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log("")
    this.setState({
      lat: crd.latitude,
      lng: crd.longitude
    })
  }

  mapError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  };

  componentDidMount() {
    this.delayedShowMarker()
    console.log("Component did mount")
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    console.log("State coords" + this.state.lat + this.state.lng)
    console.log("Hide marker")
    // console.log(map.getCenter())
    this.setState({
      isMarkerShown: false,
      // lat: this.props.appLat,
      // lng: this.props.appLng
    })
    this.delayedShowMarker()
  }

  handleAppStateChange = (lat, lng) => {
    console.log(`Coords changed to ${lat} and ${lng}`)
  }

  render() {
    console.log("Rendering MyMap")
    navigator.geolocation.getCurrentPosition(this.mapSuccess, this.mapError)
    // this.handleAppStateChange = (this.props.appLat, this.props.appLng)
    return (
      <MyMapComponent
        // lat={59.3170826}
        // lng={18.0275315}
        // onAppStateChange={this.handleAppStateChange}
        lat={parseFloat(this.props.appLat)}
        lng={parseFloat(this.props.appLng)}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}
