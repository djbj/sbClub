import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Map />
        <Transport />
      </div>
    )
  }

}

export default App
