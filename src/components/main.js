import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FadeIn from "react-fade-in";
import Topbar from "./topbar";
import Login from "./login";
import Predicamentor from "./predicamentor";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      loader: undefined,
      selectedCityTitle: "Predicamentor",
      newCity: undefined
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.changeLoader = this.changeLoader.bind(this);
    this.changeStatusAndLoader = this.changeStatusAndLoader.bind(this);
    this.changeSelectedCityTitle = this.changeSelectedCityTitle.bind(this);
    this.changeNewCity = this.changeNewCity.bind(this);
  }
  changeStatus(status) {
    this.setState({ status: status });
  }
  changeLoader(loader) {
    this.setState({ loader: loader });
  }
  changeStatusAndLoader(status, loader) {
    this.setState({ status: status, loader: loader });
  }
  changeSelectedCityTitle(city) {
    this.setState({ selectedCityTitle: city });
  }
  changeNewCity(city) {
    this.setState({ newCity: city });
  }
  render() {
    return (
      <div>
        {this.state.loader || this.state.status === "map" ? (
          <FadeIn>
            <Topbar
              changeStatusAndLoader={this.changeStatusAndLoader}
              opacity={1}
              selectedCityTitle={this.state.selectedCityTitle}
            />
          </FadeIn>
        ) : (
          <Topbar opacity={0} />
        )}
        {this.state.status !== "map" ? (
          <Login
            status={this.state.status}
            loader={this.state.loader}
            changeStatusAndLoader={this.changeStatusAndLoader}
            changeLoader={this.changeLoader}
          />
        ) : (
          <Predicamentor
            changeSelectedCityTitle={this.changeSelectedCityTitle}
            changeNewCity={this.changeNewCity}
            newCity={this.state.newCity}
          />
        )}
      </div>
    );
  }
}
