import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoBox } from "react-google-maps"

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
  constructor(props) {
    super(props)
    this.state = {
      isMarkerShown: false
    }
  }

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
    console.log(`State coords  ${this.state.lat}  ${this.state.lng}`)
    console.log("Hide marker")
    this.setState({
      isMarkerShown: false
    })
    this.delayedShowMarker()
  }

  render() {
    console.log("Rendering MyMap")
    return (
      <div>
        <MyMapComponent
          // muna ad nota parseFloat
          lat={parseFloat(this.props.myLat)}
          lng={parseFloat(this.props.myLng)}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick} />
        {/* <MapWithAMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />} /> */}
      </div>
    )
  }
}
