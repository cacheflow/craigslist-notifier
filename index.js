import {render} from 'react-dom';
import App from './js/containers/App';
import {Router, Route, browserHistory} from 'react-router';

render((
  <Router history = {browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('container'));
