import React from "react"
import Store from "../store"
import "./index.css"

const polyline = require("google-polyline")

// const storeListJson = require("./storesInStockholm.json")

class StoreList extends React.Component {

  getPolyLineCoords = () => {
    console.log(polyline.encode([
      // [38.5, -120.2],
      // [40.7, -120.95],
      // [43.252, -126.453]
    ]))
  }

  getTransportTimes = () => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.props.myLat + "%2C" + this.props.myLng + "&destinations="

    const urlStoresCoords = this.props.storeList.map(store => {
      let destinationsCoords;
      destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
      url += destinationsCoords
      return destinationsCoords
    })
    url += "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
    console.log(url)
    setTimeout(()=>{ console.log(url); }, 3000)

  }

  // getTransportTimes = () => {
  //   let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.props.myLat + "%2C" + this.props.myLng + "&destinations="
  //
  //   const urlStoresCoords = this.props.storeList.map(store => {
  //     let destinationsCoords;
  //     destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
  //     url += destinationsCoords
  //     return destinationsCoords
  //   })
  //   url += "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
  //   console.log(url)
  // }

  storeListItemClick = (storeLat, storeLng, isChosen, chosenStoreNr) => {
    // console.log(`StoreListItemClicked ${storeLat} and ${storeLng}`)
    this.props.callToApp(storeLat, storeLng, isChosen, chosenStoreNr)
  }

  render() {
    // this.getTransportTimes()
    return (
      <div className="list-of-stores">
        {this.props.storeList.map(store => (
          <Store
            key={store.Nr}
            nr={store.Nr}
            name={store.Namn}
            address1={store.Address1}
            address3={store.Address3}
            address4={store.Address4}
            keywords={store.SokOrd}
            openingHrs={store.Oppettider}
            storeLat={store.Lat}
            storeLng={store.Lng}
            callToStoreList={this.storeListItemClick} />
        ))}
      </div>
    )
  }
}

export default StoreList
