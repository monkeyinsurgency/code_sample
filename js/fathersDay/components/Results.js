import React from 'react';
import Product from 'components/Product';

const blankProducts = [1, 2, 3, 4];

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsCount: 12,
    };
  }

  onLoadMore = (e) => {
    e.preventDefault();
    this.setState({
      productsCount: this.state.productsCount + 12,
    });
  };

  renderProducts(productsToRender, setStaffPick, addOrRemoveProduct) {
    return productsToRender
      .slice(0, this.state.productsCount)
      .map((product, index) => {
        return (
          <div className="col-md-3 col-sm-6 col-xs-12" key={`product-${index}`}>
            <Product
              {...product}
              setStaffPick={setStaffPick}
              addOrRemoveProduct={addOrRemoveProduct}
            />
          </div>
        );
      });
  }

  render() {
    const {
      products,
      loading,
      scrolling,
      setStaffPick,
      addOrRemoveProduct,
    } = this.props;

    let productsToRender = blankProducts;
    let showInstructions = true;

    if (loading) {
      showInstructions = false;
    } else if (products.length) {
      productsToRender = products;
      showInstructions = false;
    }

    return (
      <div className="results-wrapper" id="Results">
        <div className={`results ${loading || scrolling ? 'loading' : ''}`}>
          <div className="row">
            {this.renderProducts(
              productsToRender,
              setStaffPick,
              addOrRemoveProduct
            )}
            {productsToRender.length > this.state.productsCount && (
              <div className="row">
                <div className="hidden-xs col-sm-3 col-md-4">&nbsp;</div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <button onClick={this.onLoadMore} className="view-more">
                    View more
                  </button>
                </div>
                <div className="hidden-xs col-sm-3 col-md-4">&nbsp;</div>
              </div>
            )}
          </div>
        </div>
        {showInstructions ? (
          <p className="select-an-option">
            Select an option for recommendations to start showing
          </p>
        ) : null}

        {loading || scrolling ? <div className="mom-spinner" /> : null}
      </div>
    );
  }
}

export default Results;
