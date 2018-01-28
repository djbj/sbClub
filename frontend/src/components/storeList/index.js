import React from "react"
import Store from "../store"
import "./index.css"

const polyline = require("google-polyline")

// const storeListJson = require("./storesInStockholm.json")

class StoreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // storeList: storeListJson
      storeList: []
    }
  }

  getPolyLineCoords = () => {
    console.log(polyline.encode([
      // [38.5, -120.2],
      // [40.7, -120.95],
      // [43.252, -126.453]
    ]))
  }

  componentDidMount() {
    fetch("http://localhost:8080/stores").then(response => (
      response.json()
    )).then(json => {
      this.setState({ storeList: json })
    })
  }

  storeListItemClick = (storeLat, storeLng,isChosen) => {
    console.log(`StoreListItemClicked ${storeLat} and ${storeLng}`)
    this.props.callToApp(storeLat, storeLng, isChosen)
  }

  render() {
    console.log("Rendering List of Stores")
    return (
      <div className="list-of-stores">
        {this.state.storeList.map(store => (
          <Store
            key={store.Nr}
            nr={store.Nr}
            name={store.Namn}
            address1={store.Address1}
            address3={store.Address3}
            address4={store.Address4}
            keywords={store.SokOrd}
            openingHrs={store.Oppetider}
            storeLat={store.Lat}
            storeLng={store.Long}
            callToStoreList={this.storeListItemClick} />
        ))}
      </div>
    )
  }
}

export default StoreList
