/* global google */
import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

const google = window.google;

const MyMapComponent = compose(withProps({
  // myApiKey = "AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc",
  // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "400px" }} />,
  mapElement: <div style={{ height: "100%" }} />
}), withScriptjs, withGoogleMap)(props =>
  <GoogleMap
    onZoomChanged={() => (console.log("ZoomChanged"))}
    defaultZoom={14}
    onClick={() => (console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
    clickableIcons={false}>
    {props.isMarkerShown && <Marker
      position={{ lat: props.lat, lng: props.lng }}
      onClick={props.onMarkerClick} />}
  </GoogleMap>)

const MapWithADirectionsRenderer = compose(
  withProps({
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "400px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService()
      const DistanceService = new google.maps.DistanceMatrixService()
      DirectionsService.route({
        origin: new google.maps.LatLng(41.8507300, -87.6512600),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      })
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>)

// const MapWithAMarker = withGoogleMap(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     <Marker
//       position={{ lat: -34.397, lng: 150.644 }} />
//     <Marker
//       position={{ lat: -35, lng: 150 }} />
//   </GoogleMap>)

export default class Map extends React.PureComponent {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isMarkerShown: false
  //   }
  // }

  componentDidMount() {
    // this.delayedShowMarker()

  }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }

  // handleMarkerClick = () => {
  //   console.log(`State coords  ${this.state.lat}  ${this.state.lng}`)
  //   console.log("Hide marker")
  //   this.setState({
  //     isMarkerShown: false
  //   })
  //   this.delayedShowMarker()
  // }

  render() {
    console.log("Rendering MyMap")
    return (
      <div>
        <MyMapComponent
          // muna ad nota parseFloat
          lat={parseFloat(this.props.myLat)}
          lng={parseFloat(this.props.myLng)}
          isMarkerShown={this.props.isLocationMarkerShown}
          onMarkerClick={this.handleMarkerClick} />
        {/* <MapWithAMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />} /> */}
        <MapWithADirectionsRenderer />
      </div>
    )
  }
}
