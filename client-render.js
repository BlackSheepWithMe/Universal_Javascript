import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'

import { Routes } from './routes'

// Use HTML5 history API rather than hashbang(#!)
import createBrowserHistory from 'history/lib/createBrowserHistory'

ReactDOM.render(
  <Router routes={ routes } history={ createBrowserHistory() } />,
  document.getElementById('app')
)