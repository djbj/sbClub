import React from "react"
import Store from "../store"
import "./index.css"
const storeListJson = require("./storesInStockholm.json")


class StoreList extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        storeList: storeListJson
    }
  }
  //
  // componentDidMount() {
  //     fetch("http://localhost:8080/stores").then(response => (
  //       response.json()
  //     )).then(json => {
  //       this.setState({ storeList: json })
  //     })
  //   }
  //
  storeListItemClick = (storeLat, storeLng) => {
    console.log("StoreListItemClicked " + storeLat + " " + storeLng)
    this.props.setAppStateCoords(storeLat, storeLng)
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
              callToParent={this.storeListItemClick}
            />
          ))}
      </div>
    )
  }
}

export default StoreList
