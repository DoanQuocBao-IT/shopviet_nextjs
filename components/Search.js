import axios from 'axios'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  const fetchSearchResults = (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    if (query.length > 0) {
      axios.get(searchUrl).then((res) => {
        if (res.data.results.length > 0) {
          setResults(res.data.results)
        }
      })
    }
  }
  const debouncedSearch = debounce(fetchSearchResults, 500)
  useEffect(() => {
    if (search.length > 0) {
      debouncedSearch(search)
    }
  }, [search])
  useEffect(() => {
    window.addEventListener('resize', function () {
      const searchEl = document.getElementById('search')
      const width = window.innerWidth

      if (searchEl.style.width >'25rem') {
        searchEl.style.width = '1rem'
        searchEl.style.padding = '0 2rem'
        searchEl.style.transition = 'width 0.03s ease-in-out'
      } else {
        searchEl.style.width = '25rem'
      }
    })
  }, [])
  return (
    <div id='search-container'>
      <i
        className={`pi pi-search search-icon ${isFocused ? 'hidden' : ''}`}
      ></i>
      <input
        id='search'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
