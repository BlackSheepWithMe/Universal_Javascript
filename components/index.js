import React from 'react'
import { Link } from 'react-router'

export default class IndexComponent extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><a href="/authorize_user">API TEST</a></li>
        </ul>
      </div>
    );
  }
}