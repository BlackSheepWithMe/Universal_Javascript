import express from 'express'
import http from 'http'
var api = require('instagram-node').instagram();

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { routes } from './routes'

api.use({
  client_id: '32e96646dc874052ba0f1bb7e093226d',
  client_secret: '7a0b21b3fe90411e855ec4fb0c340bef'
})

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

const redirect_uri = 'http://localhost:3000/handleauth'
 
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }))
}
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body)
      res.send("Didn't work")
    } else {
      console.log('Yay! Access token is ' + result.access_token)
      exports.token = result.access_token
      res.redirect('/about')
    }
  })
}
 
// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);

app.get('*', (req, res) => {
  // routes is our object of react routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    // handle error
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
       // we matched a ReactRouter redirect, so redirect from the server
       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (props) {
      // if we got props, that means we found a valid component to render for the given route
      // Note the {...props}, JSX syntax that spreads out our object into key value properties
      const markup = renderToString(<RouterContext {...props} />)
      // render `index.ejs`, but pass in the markup we want it to display
      res.render('index', { markup })
    } else {
      // 404
      res.sendStatus(404)
    }
  })
})

const server = http.createServer(app)
const port = 3000

server.listen(port)
server.on('listening', () => {
  console.log(`Listening on ${port}!`)
})