import React, { useEffect, useState } from 'react'
import { Spinner, Heading, Pane, majorScale } from 'evergreen-ui'
import FilmSelector from './component/FilmSelector'
import FilmDetails from './component/FilmDetails'
import fetchFilms from './action/fetchFilms'
import keyBy from 'lodash/keyBy'

function Film() {
  const [isLoading, setIsLoading] = useState(false)
  const [films, setFilms] = useState(null)
  const [currentFilm, setCurrentFilm] = useState(null)

  useEffect(
    () => {
      setIsLoading(true)
        fetchFilms()
          .then(({ data }) => {
            setFilms(keyBy(data, d => d.id))
            setIsLoading(false)
          })
          .catch(() => setIsLoading(false))
    },
    []
  )

  return (
    <Pane>
      <Pane
        is="header"
        elevation={1}
        paddingLeft={majorScale(2)}
        paddingRight={majorScale(2)}
        height={72}
        display="flex"
        alignItems="center"
      >
        <Pane
          width={960}
          display="flex"
          alignItems="center"
          marginLeft="auto"
          marginRight="auto"
        >
          <Heading size={500} letterSpacing="2px" fontWeight={700}>
            Studio Ghibli Movies
          </Heading>
          <Pane marginLeft={majorScale(3)}>
            <FilmSelector
              films={films != null ? Object.values(films) : null}
              onSelect={filmId => setCurrentFilm(films[filmId])}
            />
          </Pane>
        </Pane>
      </Pane>

      <Pane
        is="main"
        marginTop={majorScale(3)}
        width={960}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginLeft="auto"
        marginRight="auto"
      >
        {isLoading ? <Spinner /> : <FilmDetails film={currentFilm} />}
      </Pane>
    </Pane>
  )
}

export default Film;
