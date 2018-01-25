import React from "react"
import Store from "../store"
import "./index.css"

class ListStores extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        storeList: []
    }
  }

  componentDidMount() {
      fetch("http://localhost:8080/stores").then(response => (
        response.json()
      )).then(json => {
        this.setState({ storeList: json })
      })
    }

  render() {
    console.log("Rendering List of Stores")
    return (
      <div className="list-of-stores">
          {this.state.storeList.map(store => (
            <Store
              nr={store.Nr}
              name={this.Namn}
            />
          ))}
      </div>
    )
  }
}

export default ListStores
