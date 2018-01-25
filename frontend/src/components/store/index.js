import React from "react"
import "./index.css"

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosen: false
    }
  }

  handleClick = (event) => {
    this.setState({
      chosen: true
    });
    console.log("Store clicked is: ")
  }

  render() {
    console.log("Rendering Store")
    return (
      <div className="store">
        Storename: {this.props.name}
        Storenr: {this.props.nr}
      </div>
    )
  }
}

export default Store
