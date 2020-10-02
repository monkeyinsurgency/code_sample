import React from 'react';
import Questions from 'components/Questions';
import Results from 'components/Results';
import Suggestions from 'components/Suggestions';
import { START_URL } from 'Constants';
import { cdnUrl } from 'common/utils/url';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myInputValue: '',
      dropdownSelect: 'Auto',
    };
  }

  onSubmitButtonClick = (e) => {
    e.preventDefault();
    if (this.state.myInputValue && !isNaN(this.state.myInputValue)) {
      this.state.dropdownSelect
        ? this.props.addOrRemoveProduct(
            this.state.myInputValue,
            this.state.dropdownSelect
          )
        : this.props.addOrRemoveProduct(this.state.myInputValue);
    } else {
      vex.dialog.alert(
        "Either you didn't enter something or that wasn't a Product ID. <b>Please try again?</b>"
      );
    }
  };

  render() {
    const {
      location,
      scrollToElement,
      products,
      loading,
      scrolling,
      isDesktop,
      questions,
      setStaffPick,
      addOrRemoveProduct,
      scrollWhenLoaded,
    } = this.props;

    return (
      <section>
        <Suggestions scrollToElement={scrollToElement} />
        <div className="row">
          <div className="col-sm-6">
            <div className="promo-hero">
              <a href={window.mom.globals.fathersDay.LeftBanner.Url}>
                <img
                  src={cdnUrl(
                    window.mom.globals.fathersDay.LeftBanner.ImageUrl
                  )}
                  alt={window.mom.globals.fathersDay.LeftBanner.AltText}
                />
              </a>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="promo-hero">
              <a href={window.mom.globals.fathersDay.RightBanner.Url}>
                <img
                  src={cdnUrl(
                    window.mom.globals.fathersDay.RightBanner.ImageUrl
                  )}
                  alt={window.mom.globals.fathersDay.RightBanner.AltText}
                />
              </a>
            </div>
          </div>
        </div>
        {document.cookie.includes('MOM_ADMIN') &&
        this.props.location.pathname != START_URL ? (
          <div className="row">
            <div id="product-addBox" className="product-add-box">
              <select
                value={this.state.dropdownSelect}
                onChange={(e) =>
                  this.setState({ dropdownSelect: e.target.value })
                }
              >
                <option>Auto</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
              <input
                type="text"
                ref="myInput"
                value={this.state.myInputValue}
                onChange={(e) =>
                  this.setState({ myInputValue: e.target.value })
                }
              />
              <input
                type="button"
                value="Submit"
                onClick={this.onSubmitButtonClick}
              />
            </div>
          </div>
        ) : null}
        <div className="row" id="GiftFinderHeader">
          <div className="col-xs-12">
            <h3 className={`gift-finder-title`}>
              <span>{`Father's Day Gift Finder`}</span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Questions
              questions={questions}
              currentUrl={location.pathname}
              scrollToElement={scrollToElement}
              isDesktop={isDesktop}
            />
          </div>
          <div className="col-md-12">
            <Results
              addOrRemoveProduct={addOrRemoveProduct}
              setStaffPick={setStaffPick}
              products={products}
              scrolling={scrolling}
              loading={loading}
              isDesktop={isDesktop}
            />
          </div>

          <div className="promo-tiles">
            <div className="row">
              <div className="h-gutter col-sm-4 col-sm-offset-2 col-lg-offset-0">
                <a href="/dram-club/">
                  <img
                    src={cdnUrl('/Images/dnp/gift_ideas/2017/Dramclub.jpg')}
                    alt="Dram Club"
                  />
                  <div className="tile-banner">Dram Club</div>
                </a>
              </div>
              <div className="h-gutter col-sm-4 hidden-xs hidden-sm hidden-md">
                <a href="/personalised-whisky/">
                  <img
                    src={cdnUrl(
                      '/Images/dnp/gift_ideas/2017/Personalised-Whisky.jpg'
                    )}
                    alt="Personalised Whisky"
                  />
                  <div className="tile-banner">Personalised Whisky</div>
                </a>
              </div>
              <div className="h-gutter col-sm-4">
                <a href="/distilleries/mature-your-own/">
                  <img
                    src={cdnUrl(
                      '/Images/dnp/gift_ideas/2017/Mature-Your-Own.jpg'
                    )}
                    alt="Mature Your Own Kits"
                    onLoad={scrollWhenLoaded}
                  />
                  <div className="tile-banner">Mature Your Own Kits</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Layout;
