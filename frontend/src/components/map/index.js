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
    defaultZoom={13}
    onZoomChanged={() => (console.log("ZoomChanged"))}
    onClick={() => (console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.myPosLat, lng: props.myPosLng }}
    center={{ lat: props.myPosLat, lng: props.myPosLng }}
    clickableIcons={false}>
    {props.allStores.map(store => (
      console.log(store),
      // console.log(store.Lat, store.Long)
      <Marker
        key={store.Nr}
        position={{ lat: parseFloat(store.Lat), lng: parseFloat(store.Long)}}
        title={`SB ${store.Address1}`}
        onClick={() => (console.log(`Store number ${store.Nr} clicked`))}
        label={"SB"}
        // color={"0B7B3E"}
        // icon={icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_AZURE))}
      />
    ))}
    {props.isMarkerShown && <Marker
      position={{ lat: props.myPosLat, lng: props.myPosLng }}
      title={"Current position"}
      // label={""}
      onClick={props.onMarkerClick} />}
  </GoogleMap>)

const MapWithADirectionsRenderer = compose(withProps({
  // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: "100%" }} />,
  containerElement: <div style={{ height: "400px" }} />,
  mapElement: <div style={{ height: "100%" }} />
}), withScriptjs, withGoogleMap,
lifecycle({
  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService()
    // const DistanceService = new google.maps.DistanceMatrixService()
    console.log(this.props.originLat, this.props.originLng)
    DirectionsService.route({
      origin: new google.maps.LatLng(41.8507300, -87.6512600),
      // origin: new google.maps.LatLng(this.props.originLat, this.props.originLng),
      destination: new google.maps.LatLng(41.8525800, -87.6514100),
      travelMode: google.maps.TravelMode.WALKING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(`Results ${result}`)
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

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    onZoomChanged={() => (console.log("ZoomChanged"))}
    onClick={() => (console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315 }}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
    clickableIcons={false}>
    <Marker
      position={{ lat: -34.397, lng: 150.644 }} />
    <Marker
      position={{ lat: -35, lng: 150 }} />
  </GoogleMap>)

export default class Map extends React.PureComponent {

  componentDidMount() {
    // this.delayedShowMarker()

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      // this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    // console.log(`State coords  ${this.state.lat}  ${this.state.lng}`)
    // console.log("Hide marker")
    // this.setState({
    //   isMarkerShown: false
    // })
    console.log("HandleMarkerClick")
    this.delayedShowMarker()
  }

  render() {
    console.log("Rendering MyMap")
    return (
      <div>
        <MyMapComponent
          // muna ad nota parseFloat
          myPosLat={parseFloat(this.props.myLat)}
          myPosLng={parseFloat(this.props.myLng)}
          isMarkerShown={this.props.isLocationMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          allStores={this.props.storeList}/>
        {/* <MapWithADirectionsRenderer
          originLat={this.props.myLat}
          originLng={this.props.myLng} /> */}
        {/* <MapWithAMarker
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          lat={parseFloat(this.props.myLat)}
          lng={parseFloat(this.props.myLng)}
          isMarkerShown={this.props.isLocationMarkerShown}
          onMarkerClick={this.handleMarkerClick} /> */}
      </div>
    )
  }
}
