/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "../../../lib";

const DirectionsExampleGoogleMap = withGoogleMap(props =>{
  debugger;
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={props.center}
    >
   
    
    {props.markers.map((marker, index) => {
      debugger;
      return(
        <Marker
          key={index}
          position={{ lat: marker.location.lat, lng: marker.location.lng }}
          onClick={() => props.onMarkerClick(marker)}
        >
          {/*
            Show info window only if the 'showInfo' key of the marker is true.
            That is, when the Marker pin has been clicked and 'onCloseClick' has been
            Successfully fired.
          */}
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
              <div>{marker.formatted_address}</div>
            </InfoWindow>
          )}
        </Marker>
      )})
    
    }
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
})
  

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class DirectionsExample extends Component {

  state = {
    origin: new google.maps.LatLng(41.8507300, -87.6512600),
    destination: new google.maps.LatLng(41.8525800, -87.6514100),
    directions: null,
    markers:[{
      "showInfo": false,
      "formatted_address": `3818 Sunset Blvd, Los Angeles, CA 90026, USA`,
      "userType": `TS`,
      "name": `Flore Vegan`,
      "rating": 4.6,
      "location": {
        "lat": 34.091158,
        "lng": -118.2795188,
      },
    },
    {
      "showInfo": false,
      "formatted_address": `1700 Sunset Blvd, Los Angeles, CA 90026, USA`,
      "userType": `TS`,
      "name": `Sage Plant Based Bistro and Brewery Echo Park`,
      "rating": 4.6,
      "location": {
        "lat": 34.0771192,
        "lng": -118.2587199,
      },
    },
    {
      "showInfo": false,
      "formatted_address": `8284 Melrose Ave, Los Angeles, CA 90046, USA`,
      "userType": `S`,
      "name": `Sage Plant Based Bistro and Brewery Echo Park`,
      "rating": 4.6,
      "location": {
        "lat": 34.083527,
        "lng": -118.370157,
      },
    },
    {
      "showInfo": false,
      "formatted_address": `4319 Sunset Blvd, Los Angeles, CA 90029, USA`,
      "userType": `S`,
      "name": `Sage Plant Based Bistro and Brewery Echo Park`,
      "rating": 4.6,
      "location": {
        "lat": 34.0951843,
        "lng": -118.283107,
      },
    }],
  }

  // componentDidMount() {

  //   const DirectionsService = new google.maps.DirectionsService();

  //   DirectionsService.route({
  //     origin: this.state.origin,
  //     destination: this.state.destination,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   }, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.setState({
  //         directions: result,
  //       });
  //     } else {
  //       console.error(`error fetching directions ${result}`);
  //     }
  //   });
  // }
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    debugger;
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
    
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin:{lat:targetMarker.location.lat ,lng:targetMarker.location.lng},
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
        markers={this.state.markers}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    );
  }
}
