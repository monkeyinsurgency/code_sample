import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as Url from 'utils/url';
import { tracker } from 'utils/GiftFinder';

class Suggestions extends Component {
  onSuggestionClick = (datumId, datumVal, analyticsValue) => {
    const pathHack = location.pathname.split('/');
    const paramAmal = datumId + ',' + datumVal;

    if (analyticsValue) {
      tracker('Suggestion Selected', analyticsValue, 1);
    }

    if (pathHack[3] !== paramAmal) {
      browserHistory.push(
        Url.getAnswerUrl(location.pathname, datumId, datumVal)
      );
    }
    this.props.scrollToElement('#GiftFinderHeader');
  };

  render() {
    return (
      <div className="row">
        <div className="suggestions-container">
          <div className="suggestions-header-container col-md-6 col-sm-9">
            <div className="suggestions-header">
              <a onClick={() => this.onSuggestionClick(0, 4, 'Tasting Sets')}>
                <div className="copy-box">
                  <h2>Our top tasting sets</h2>
                  <p>
                    Specially curated whisky, gin and rum sets, complete with
                    full tasting notes.
                  </p>
                </div>

                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a href="/gift-vouchers/">
                <div className="suggestion">Gift vouchers</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a href="/search/#search=gift&page=1&sort=_score&direction=desc&targettemplates=1759,1902,1761,1903,1906,1760,1905,2187,1762,2242,2277,1904,1932,1952,2238,2244,1923">
                <div className="suggestion">Gift sets</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a onClick={() => this.onSuggestionClick(0, 5, 'Cocktails')}>
                <div className="suggestion">Cocktails</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a onClick={() => this.onSuggestionClick(0, 1, 'Whisky')}>
                <div className="suggestion">Whisky</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a onClick={() => this.onSuggestionClick(0, 2, 'Gin')}>
                <div className="suggestion">Gin</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-2">
            <div className="suggestion-container">
              <a onClick={() => this.onSuggestionClick(0, 3, 'Rum')}>
                <div className="suggestion">Rum</div>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="32"
                  viewBox="0 0 11 32"
                >
                  <title>angle-right</title>
                  <path d="M10.624 17.152q0 0.224-0.16 0.384l-8.352 8.352q-0.16 0.16-0.384 0.16t-0.416-0.16l-0.896-0.896q-0.192-0.192-0.192-0.416t0.192-0.416l7.008-7.008-7.008-7.040q-0.192-0.16-0.192-0.384t0.192-0.416l0.896-0.896q0.16-0.192 0.416-0.192t0.384 0.192l8.352 8.32q0.16 0.16 0.16 0.416z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Suggestions;
