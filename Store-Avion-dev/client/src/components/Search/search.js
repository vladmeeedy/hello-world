import React, { useRef, useState } from 'react'
import './search.scss'
import axios from 'axios'
import { HOST } from '../Token'
import { NavLink } from 'react-router-dom'
const DEBOUNCE_THRESHOLD = 500

export default function Search() {
  const [searchList, setSearchList] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [noItems, setNoItems] = useState(false)
  async function sendSearchRequest(query) {
    const searchPhrases = {
      query: query,
    }

    axios
      .post(HOST + '/products/search', searchPhrases)
      .then((response) => {
        if (response.data.length === 0) {
          setNoItems(true)
          setSearchList([])
        } else {
          setNoItems(false)
          setSearchList(response.data)
        }
        console.log('ServerResponse', response)
      })
      .catch((err) => {
        console.log('Create request', err)
      })
  }

  const timeoutHandler = useRef(null)

  const handleChange = (event) => {
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current)
    }
    timeoutHandler.current = setTimeout(() => {
      if (event.target.value === '') {
        setNoItems(false)
        setSearchList([])
      } else {
        sendSearchRequest(event.target.value)
      }
    }, DEBOUNCE_THRESHOLD)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const [removeDelay, setRemoveDelay] = useState(null)

  const handleBlur = () => {
    if (removeDelay) {
      clearTimeout(removeDelay)
    }

    const delay = setTimeout(() => {
      setIsFocused(false)
    }, 100)

    setRemoveDelay(delay)
  }

  return (
    <form className="search-container">
      <input
        id="search-box"
        data-testid="search-box"
        className="search-box"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
      />

      {noItems && (
        <div
          className={`no-item-search-container ${isFocused ? 'visible' : ''}`}
          data-testid="no-items-found-container"
        >
          <p className="no-item-search">No Items Found</p>
        </div>
      )}

      <div
        className={`search-list-container ${
          isFocused && searchList.length > 0 ? 'visible' : ''
        }`}
        data-testid="search-list-container"
      >
        {searchList.map((e) => {
          return (
            <NavLink
              to={`/products/${e.id}`}
              className="search-result-item"
              key={e.id}
              data-testid={`search-result-item-${e.id}`}
            >
              <img src={e.imageUrls} />
              <div className="search-item-description-container">
                <p>{e.name}</p>
                <p>{e.currentPrice}$</p>
              </div>
            </NavLink>
          )
        })}
      </div>
    </form>
  )
}
