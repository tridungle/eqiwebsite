import React, { Component } from "react";
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Modal from "react-modal";
import FadeIn from "react-fade-in";
import AlertBox from "./alertBox";
import { FaTimes } from "react-icons/fa";
import Lottie from "react-lottie";
import * as animationData from "../images/warning.json";
import citiesJson from "../images/cities";
import { MAP } from "react-google-maps/lib/constants";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.7)";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    maxHeight: "90vh",
    overflowY: "auto"
  }
};

var myMarkersTelAviv = [];
var myMarkersJerusalem = [];
var myMarkersHaifa = [];

myMarkersTelAviv.push({
  city: "Tel Aviv",
  id: "Tel Aviv 1",
  lat: 32.0853,
  lng: 34.7818
});

myMarkersJerusalem.push({
  city: "Jerusalem",
  id: "Tel Aviv 1",
  lat: 31.7683,
  lng: 35.2137
});

myMarkersHaifa.push({
  city: "Haifa",
  id: "Tel Aviv 1",
  lat: 32.794,
  lng: 34.9896
});

const refreshDataFromGeoJson = function(
  currentMap,
  hoveredCity,
  selectedCity,
  changeSelectedCityTitle
) {
  if (!currentMap) {
    return;
  }
  // Call the Data class in the initial google map API
  let newData = new window.google.maps.Data();

  // Define the GeoJson object
  let tempGeoJsonObj;
  try {
    tempGeoJsonObj = citiesJson;

    function processPoints(geometry, callback, thisArg) {
      if (geometry instanceof window.google.maps.LatLng) {
        callback.call(thisArg, geometry);
      } else if (geometry instanceof window.google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
      } else {
        geometry.getArray().forEach(function(g) {
          processPoints(g, callback, thisArg);
        });
      }
    }
    // Call the addGeoJson from the Data class
    let newFeatures = newData.addGeoJson(tempGeoJsonObj);
    newData.setStyle({
      fillColor: "transparent",
      strokeWeight: 1.5,
      strokeColor: "#c74740",
      strokeOpacity: 0.2
    });
    newData.addListener("mouseover", function(event) {
      hoveredCity(event.feature.l.SETL_NAME);
      newData.overrideStyle(event.feature, {
        strokeOpacity: 0.8,
        strokeWeight: 2.5
      });
    });
    newData.addListener("mouseout", function(event) {
      hoveredCity(undefined);
      newData.overrideStyle(event.feature, {
        strokeOpacity: 0.2,
        strokeWeight: 1.5
      });
    });
    newData.addListener("click", function(event) {
      selectedCity(event.feature.l.SETL_NAME);
      changeSelectedCityTitle(event.feature.l.SETL_NAME);
      var bounds = new window.google.maps.LatLngBounds();
      processPoints(event.feature.getGeometry(), bounds.extend, bounds);
      currentMap.fitBounds(bounds);
    });
  } catch (error) {
    newData.setMap(null);
    return;
  }

  // Set the data to the current map
  newData.setMap(currentMap.context[MAP]);
};

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCsaXHlxjGhr4z05t7A_mc7afLQIQU8oe4&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      const refs = { GoogleMap };
      this.setState({
        onMapWillMount: ref => {
          refs.map = ref;
          const currentMap = refs.map;
          window.googleMapsObject = currentMap.context[MAP];
          //load the GeoJson to the map
          refreshDataFromGeoJson(
            currentMap,
            currentMap.props.hoveredCity,
            currentMap.props.selectedCity,
            currentMap.props.changeSelectedCityTitle
          );
          //set props.currentMap
          this.setState({ currentMap: currentMap });
        }
      });
    },
    componentWillReceiveProps(newProps) {
      const refs = { GoogleMap };
      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
          const currentMap = refs.map;
          //window.googleMapsObject = currentMap.context[MAP];
          console.log(currentMap);
        }
      });
    }
  }),
  withStateHandlers(
    () => ({
      iconUrl: "http://maps.google.com/mapfiles/ms/icons/red.png",
      iconSize: new window.google.maps.Size(16, 16),
      anchor: new window.google.maps.Point(8, 8)
    }),
    {
      onMarkerClick: () => () => ({
        iconUrl: "http://maps.google.com/mapfiles/ms/icons/blue.png",
        iconSize: new window.google.maps.Size(16, 16),
        anchor: new window.google.maps.Point(8, 8)
      })
    }
  )
)(props => (
  <GoogleMap
    ref={props.onMapWillMount}
    hoveredCity={props.hoveredCity}
    selectedCity={props.selectedCity}
    changeSelectedCityTitle={props.changeSelectedCityTitle}
    newCity={props.newCity}
    mapTypeId={"terrain"}
    defaultZoom={9}
    defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
    defaultOptions={{ fullscreenControl: false }}
  >
    {props.isMarkerShown &&
      props.markers.map(marker => (
        <Marker
          key={marker.id}
          id={marker.id}
          icon={{
            url: require("./something.svg"),
            scaledSize: props.iconSize,
            anchor: props.anchor
          }}
          position={{ lat: marker.lat, lng: marker.lng }}
          center={{ lat: 32.0853, lng: 34.7818 }}
          onClick={props.onMarkerClick}
          radius={100}
          animation={window.google.maps.Animation.DROP}
        />
      ))}
  </GoogleMap>
));

export default class Predicamentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      modalIsOpen: true,
      showModal: false,
      hoveredCity: undefined,
      selectedCity: undefined,
      myMarkers: myMarkersTelAviv
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hoveredCity = this.hoveredCity.bind(this);
    this.selectedCity = this.selectedCity.bind(this);
    this.changeSelectedCityTitle = this.changeSelectedCityTitle.bind(this);
    this.changeNewCity = this.changeNewCity.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  }

  hoveredCity(city) {
    this.setState({ hoveredCity: city });
  }

  selectedCity(city) {
    this.setState({ selectedCity: city });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ showModal: true });
    }, 1000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  changeSelectedCityTitle(city) {
    this.props.changeSelectedCityTitle(city);
  }
  changeNewCity(city) {
    this.props.changeNewCity(city);
  }

  hideModal(city) {
    let myMarkersNew;
    city === "Tel Aviv"
      ? (myMarkersNew = myMarkersTelAviv)
      : city === "Jerusalem"
      ? (myMarkersNew = myMarkersJerusalem)
      : (myMarkersNew = myMarkersHaifa);
    this.setState({
      modalIsOpen: false,
      isMarkerShown: true,
      myMarkers: myMarkersNew
    });
  }

  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markers={this.state.myMarkers}
          hoveredCity={this.hoveredCity}
          selectedCity={this.selectedCity}
          changeSelectedCityTitle={this.changeSelectedCityTitle}
          newCity={this.props.newCity}
        />
        {!this.state.modalIsOpen ? (
          <div
            onClick={() => this.setState({ modalIsOpen: true })}
            style={{
              position: "absolute",
              top: "25px",
              right: "-10px",
              cursor: "pointer"
            }}
          >
            <Lottie options={defaultOptions} width={70} />
          </div>
        ) : null}
        {this.state.showModal ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Alert"
          >
            <FaTimes
              onClick={() => this.setState({ modalIsOpen: false })}
              style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                color: "#5b5c68",
                cursor: "pointer"
              }}
            />
            <FadeIn>
              <div class="text-center">
                <Lottie options={defaultOptions} width={70} />
                <AlertBox
                  changeNewCity={this.changeNewCity}
                  hideModal={this.hideModal}
                  amount={3}
                  city={"Tel Aviv"}
                  desc={"No Signal"}
                />
                <AlertBox
                  changeNewCity={this.changeNewCity}
                  hideModal={this.hideModal}
                  amount={5}
                  city={"Jerusalem"}
                  desc={"Needs Repair"}
                />
                <AlertBox
                  changeNewCity={this.changeNewCity}
                  hideModal={this.hideModal}
                  amount={1}
                  city={"Haifa"}
                  desc={"Low Battery"}
                />
              </div>
            </FadeIn>
          </Modal>
        ) : null}
      </div>
    );
  }
}
