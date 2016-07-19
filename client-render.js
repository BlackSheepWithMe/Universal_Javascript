import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { routes } from './routes'

// Use HTML5 history API rather than hashbang(#!)
import createBrowserHistory from 'history/lib/createBrowserHistory'

ReactDOM.render(
  <Router routes={ routes } history={ browserHistory } />,
  document.getElementById('app')
)