import React from 'react';
import { withRouter, browserHistory } from 'react-router';
import { GetGiftFinderProducts } from 'api/giftfinder/GiftFinder';
import Layout from 'components/Layout';
import { BASE_URL, START_URL } from 'Constants';
import { getAnswersQuery, buildQuestions } from 'utils/GiftFinder';

// A little hacky
let isDesktop = mom.utilities.isDesktop();

$(window).on('resizedToDesktop', () => (isDesktop = mom.utilities.isDesktop()));
$(window).on('resizedToTablet', () => (isDesktop = mom.utilities.isDesktop()));
$(window).on('resizedToMobile', () => (isDesktop = mom.utilities.isDesktop()));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrolling: false,
      loading: false,
      query: null,
      additionalQuery: null,
      products: [],
      additionalProducts: [],
    };

    $(window).scrollTop(0);
  }

  setScrolling(scrolling) {
    this.setState({ scrolling });
  }

  onScrollComplete(newUrl) {
    if (typeof newUrl === 'string') {
      browserHistory.push(newUrl);
    }

    this.setScrolling(false);
  }

  scrollTo = (scrollTo, newUrl) => {
    this.setScrolling(true);

    const onComplete = () => this.onScrollComplete(newUrl);

    TweenLite.to(window, 0.7, {
      scrollTo: {
        y: scrollTo,
        onAutoKill: onComplete,
      },
      onComplete,
    }).delay(0.3);
  };

  scrollToElement = (element, newUrl) => {
    let scrollTo = element;

    if (typeof scrollTo === 'object') {
      scrollTo = element.offset().top - 76;
    }

    this.scrollTo(scrollTo, newUrl);
  };

  updateProducts = (imFeelingLucky = false, force = false) => {
    let query;

    if (imFeelingLucky) {
      query = {
        isVATableCountry: mom.cookie.IsVATableCountry === '1',
        deliveryCountryID: mom.cookie.CountryID,
      };
    } else {
      query = getAnswersQuery(this.props.params, this.state.query);
    }

    if (query === this.state.query && !force) {
      return;
    }

    if (typeof query === 'undefined' || query === null) {
      this.setState({ products: [], query: null });

      return;
    }

    this.setState({ loading: true, query });

    GetGiftFinderProducts(
      query,
      data => {
        if (data.products.length > 0) {
          this.setState({
            products: data.products,
            loading: false,
          });
        } else {
          this.setState({
            products: [],
            loading: false,
          });

          vex.dialog.alert(
            'Ooops, it seems to our brains in the cloud have nothing to recommend for this selection. Please try other price ranges or other delicious drinks.',
          );
        }
      },
      error => {
        if (!userAborted(error)) {
          vex.dialog.alert(
            'Ooops, Something seems to have gone wrong while contacting the cloud.',
          );
        }
      },
    );
  };

  

  scrollWhenLoaded = () => {
    if (
      this.props.location.pathname !== START_URL &&
      this.props.location.pathname !== BASE_URL &&
      this.props.location.pathname !== BASE_URL + 'start/0,0/'
    ) {
    } else {
      browserHistory.push({
        pathname: '/fathers-day/start/0,0/',
        search: window.location.search
      });
    }
  }

  componentDidMount() {
    this.updateProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateProducts();
    }
    window.setBuyButtonsInBasketStatus();
  }

  setStaffPick = (productId, checkedState) => {
    this.setState({
      loading: true,
    });

    $.ajax({
      type: checkedState ? 'PUT' : 'DELETE',
      url: mom.routes.privateAPI + 'Private/Product/ProductTag/' + productId,
      data: '{"productTags":[40]}', // TagID 40: Staff Pick;
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: () => {
        // There is a delay in ES Updating so add an Artificial delay.
        setTimeout(() => {
          this.updateProducts(false, true);
        }, 1250);
      },
      error() {
        vex.dialog.alert('Error Updating product!');
      },
    });
  };

  buildQuestionAnswerAndId = (productId, position = null) => {
    if (position === 'Auto') {
      position = 0;
    }

    const { QuestionAnswerPath, AnswerId, QuestionID } = getAnswersQuery(
      this.props.params,
      this.state.query,
    );

    let requestPayload = {
      id: productId,
      QuestionAnswerPath,
    };

    // If position is not null we are adding a product and need to add additional data to
    // the requestPayload.
    if (position !== null) {
      requestPayload.position = position;
      requestPayload.answerId = AnswerId;
      requestPayload.QuestionID = QuestionID;
    }

    return requestPayload;
  };

  addOrRemoveProduct = (productId, position = null) => {
    const confirmed = confirm("Warning: this will make an editorial change to this page, have you checked with appropriate person?")

    if (!confirmed) {
      return;
    }

    this.setState({
      loading: true,
    });

    $.ajax({
      type: position && position > 0 ? 'PUT' : 'DELETE',
      url:
        mom.routes.privateAPI +
        'Private/giftfinder/3311/ProductState/' +
        productId,
      data:
        position && position !== null
          ? JSON.stringify(this.buildQuestionAnswerAndId(productId, position))
          : JSON.stringify(this.buildQuestionAnswerAndId(productId)),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: () => {
        // There is a delay in ES Updating so add an Artificial delay.
        setTimeout(() => {
          this.updateProducts(false, true);
        }, 1250);
      },
      error(e) {
        if (e.responseJSON && e.responseJSON.responseStatus) {
          vex.dialog.alert(e.responseJSON.responseStatus.message);
        } else {
          vex.dialog.alert('Error Updating product!');
        }
      },
    });
  };

  render() {
    const questions = buildQuestions(this.props.params);
    return (
      <Layout
        {...this.props}
        scrolling={this.state.scrolling}
        loading={this.state.loading}
        setScrolling={this.setScrolling}
        scrollToElement={this.scrollToElement}
        products={this.state.products}
        additionalProducts={this.state.additionalProducts}
        isDesktop={isDesktop}
        questions={questions}
        setStaffPick={this.setStaffPick}
        addOrRemoveProduct={this.addOrRemoveProduct}
        scrollWhenLoaded={this.scrollWhenLoaded}
      />
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
