import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { BASE_URL, START_URL } from 'Constants';
import AppWithRouter from 'components/App';
import { tracker } from 'utils/GiftFinder';

const start = () =>
  render(
    <div className="gift-finder">
      <Router history={browserHistory}>
        <Route path={BASE_URL} component={AppWithRouter}>
          <Route path={START_URL} />
          <Route path={`${START_URL}:q1,:a1`} />
          <Route path={`${START_URL}:q1,:a1/:q2,:a2`} />
          <Route path={`${START_URL}:q1,:a1/:q2,:a2/:q3,:a3`} />
        </Route>
      </Router>
    </div>,
    document.getElementById('GiftFinderTarget')
  );

start();

// scrollTo for hero button
$(() => {
  // disables Chrome's scroll history
  history.scrollRestoration = 'manual';
  $('#GiftFinderHeroButton').on('click', (e) => {
    e.preventDefault();
    tracker('Use our Gift Finder button', 'start', 1);
    window.TweenLite.to(window, 1, { scrollTo: '#GiftFinderHeader' });
  });
});
