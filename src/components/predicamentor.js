import React, { Component } from "react";
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon
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
    width: "50vw"
  }
};

var myMarkers = [];
/*for (var i = 0; i < 100; i++) {
  myMarkers.push({
    id: `marker${i}`,
    lat: 32.0853 + 0.02 * i,
    lng: 34.7818 + 0.02 * i
  });
}*/

const refreshDataFromGeoJson = function(currentMap) {
  if (!currentMap) {
    return;
  }
  // Call the Data class in the initial google map API
  let newData = new window.google.maps.Data();

  // Define the GeoJson object
  let tempGeoJsonObj;
  try {
    tempGeoJsonObj = citiesJson;

    // Call the addGeoJson from the Data class
    let newFeatures = newData.addGeoJson(tempGeoJsonObj);
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
          refreshDataFromGeoJson(currentMap);
          //set props.currentMap
          this.setState({ currentMap: currentMap });
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
        />
      ))}
  </GoogleMap>
));

export default class Predicamentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: true,
      modalIsOpen: true,
      showModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
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

  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markers={myMarkers}
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
                <AlertBox amount={3} desc={"No Signal"} />
                <AlertBox amount={5} desc={"Needs Repair"} />
                <AlertBox amount={10} desc={"Low Battery"} />
              </div>
            </FadeIn>
          </Modal>
        ) : null}
      </div>
    );
  }
}
