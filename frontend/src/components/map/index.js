import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps"

const google = window.google;
// const FaAnchor = require("react-icons/lib/fa/anchor")
const FaAnchor = <p></p>

const MyMapComponent = compose(
  // withProps({
  // myApiKey = "AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc",
  // googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places",
    // loadingElement: <div style={{ height: "100%" }} />,
    // containerElement: <div style={{ height: "400px" }} />,
    // mapElement: <div style={{ height: "100%" }} />
  // }),
  withStateHandlers(() => ({
    isOpen: false
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen
    })
  }),
  withScriptjs, withGoogleMap, lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(59.317242400000005, 18.028239),
        destination: new google.maps.LatLng(59.3340599, 18.0628982),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      })
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={13}
    onZoomChanged={() => (console.log("ZoomChanged"))}
    onClick={() => (console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.myPosLat, lng: props.myPosLng }}
    center={{ lat: props.myPosLat, lng: props.myPosLng }}
    clickableIcons={false}>
    {props.allStores.map(store => (
      // console.log(store),
      // console.log(store.Lat, store.Long)
      <Marker
        key={store.Nr}
        position={{ lat: parseFloat(store.Lat), lng: parseFloat(store.Long) }}
        title={
          `SB ${store.Address1}
        Open today until ${store.Oppetider}`}
        onClick={() => (console.log(`Store number ${store.Nr} clicked`))}
        // label="SB"
        // icon="sbBottle.png"
        // icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        icon={"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0B7B3E"}
        // color={"0B7B3E"}
      >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <FaAnchor />
          TextHere </InfoWindow>}
      </Marker>
    ))}
    {props.isMarkerShown && <Marker
      position={{ lat: props.myPosLat, lng: props.myPosLng }}
      title="Current position"
      snippet="Population: 4,137,400"
      // label={""}
      // icon={"https://static.systembolaget.se/content/assets/images/sb-logotype.svg"}
      // icon="./sbBottle.png"
      onClick={props.onMarkerClick} />}
      {props.directions && <DirectionsRenderer directions={props.directions} />}
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
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          // muna ad nota parseFloat
          myPosLat={parseFloat(this.props.myLat)}
          myPosLng={parseFloat(this.props.myLng)}
          // isMarkerShown={this.props.isLocationMarkerShown}
          isMarkerShown={true}
          onMarkerClick={this.handleMarkerClick}
          allStores={this.props.storeList}
          myStoreLat={this.props.chosenStoreLat}
          myStoreLng={this.props.chosenStoreLat} />
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
