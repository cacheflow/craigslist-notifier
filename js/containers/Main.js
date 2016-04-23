import CitiesPage from './CitiesPage';
import ReactDOM from 'react-dom';
import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <CitiesPage>
      </CitiesPage>
    )
  }
}
ReactDOM.render(<Main />, document.getElementById('craigslist-container'));
