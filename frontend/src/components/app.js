import React from "react"
import Map from "./map"
// import Prufa from "./prufa"
import MyFancyComponent from "./myFancyComponent"
class App extends React.Component {

  render() {
    return (
      <div>
        System Club!
        <Map />
        {/* <Prufa /> */}
        <MyFancyComponent />
      </div>
    )
  }

}

export default App
