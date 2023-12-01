import React from 'react'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { defaultTheme } from './theme.js'
import styles from './contacsUs.module.scss'
import iconMarker from './avionLogo.svg'

export default function contactUs() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  })

  const containerStyle = {
    width: '100%',
    height: '700px',
  }

  const center = {
    lat: 40.74833333336077601,
    lng: -73.985277777805777077,
  }

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortCuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles: defaultTheme,
  }

  const onLoad = (marker) => {
    console.log('marker: ', marker)
    console.dir('marker: ', marker)
  }

  if (!isLoaded) {
    return <div>Error loading Google Maps</div>
  }

  return (
    <>
      <div className={styles['contacts-container']}>
        <h3>Contacts</h3>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          options={defaultOptions}
        >
          {/* <MarkerF onLoad={onLoad} position={center} options={{ icon: iconMarker, }} /> */}
          <MarkerF
            onLoad={onLoad}
            position={center}
            icon={{
              url: iconMarker,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(17, 17),
            }}
          />
        </GoogleMap>
        <div className={styles['contacts-info']}>
          <p className={styles['info-phone']}>
            <div className={styles['phone']}>
              <span className={styles['loader']}></span>
              <span className={styles['text']}>
                Phone Number: +380638302732
              </span>
            </div>
          </p>
          <div className={styles['info-work-hours']}>
            <div className={styles['info-work-hours-center']}>
              <p className={styles['info-work-hours-header']}>Work Hours:</p>
              <div className={styles['cloader']}>
                <div className={styles['clface']}>
                  <div className={styles['clsface']}>
                    <div id={styles['h2']} className={styles['hand']}></div>
                  </div>
                  <div className={styles['top']}></div>
                  <div className={styles['bottom']}></div>
                  <div className={styles['left']}></div>
                  <div className={styles['right']}></div>
                  <div id={styles['sub']} className={styles['pin']}></div>
                  <div id={styles['h1']} className={styles['hand']}></div>
                  <div id={styles['main']} className={styles['pin']}></div>
                </div>
              </div>
            </div>

            <div className={styles['info-time-table']}>
              Monday: 10:00 AM - 5:00 PM Tuesday: 10:00 AM - 5:00 PM Wednesday:
              10:00 AM - 5:00 PM Thursday: 10:00 AM - 5:00 PM Friday: 10:00 AM -
              5:00 PM
            </div>
          </div>
          <div className={styles['info-work-location']}>
            <p className={styles['info-work-location-header']}>Location:</p>
            <div className={styles['loader-main']}>
              <div className={styles['loader-location']}></div>
              <p className={styles['info-location']}>
                34th Street Herald Square
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
