import React, { useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
//https://www.npmjs.com/package/@changey/react-leaflet-markercluster

import http from '../common/http-common'
import iconSVG from '../icons/camera-cctv.svg'

const getIcon = new L.Icon ({
    iconUrl: iconSVG,
    iconSize: [30,30]
  })

const popupCamera = {
  width: "200px",
  height: "175px"
}

const TrafficCamera = () => {

  const [trafficCamera, setTrafficCamera] = useState([])

  useEffect(
    async () => {
      try {
        const res = await http.get('/trafficcamera')
        setTrafficCamera(res.data['image-list'].image)
      } catch (err) {
        console.log(err)
      }
    }, [])

  return (
    <>
      <MarkerClusterGroup>
      {trafficCamera && trafficCamera.map(camera => (
        <Marker
          icon={getIcon}
          key={camera.key}
          position={[camera.latitude, camera.longitude]}>
          <Popup>
            <div style={popupCamera}>
              Key: {camera.key}<br />
              <img src={camera.url} width="205" />
            </div>
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </>
  )
}

export default TrafficCamera