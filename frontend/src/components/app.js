import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import ListStores from "./list-stores"

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Map />
        <Transport />
        <ListStores />
      </div>
    )
  }

}

export default App
