import React from 'react';
import BuyButton from 'common/components/BuyButton';
import { localPriceWithCurrency } from 'common/utils/numbers';
import { tracker } from 'utils/GiftFinder';
import { pluralise } from 'common/utils/strings';
import classNames from 'classnames';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false,
    };
  }

  render() {
    const {
      productImage,
      productID,
      price,
      shortName,
      isStaffPick,
      productUrl,
      isDesktop,
      setStaffPick,
      addOrRemoveProduct,
      reviewCount,
      userRating,
      previousPrice,
      hasFreeShipping,
      hasFreeShippingWorldwide,
    } = this.props;

    var productClass = classNames('product', 'col-xs-12', {
      'has-pick': isStaffPick,
      'has-discount': previousPrice,
      'has-shipping': hasFreeShipping || hasFreeShippingWorldwide,
    });

    return (
      <div className={productClass}>
        {document.cookie.includes('MOM_ADMIN') && productID ? (
          <div>
            <div>
              Staff Pick:&nbsp;
              <input
                name="Staffpick"
                type="checkbox"
                className="admin-checkbox"
                defaultChecked={this.props.isStaffPick}
                onChange={() => {
                  const confirmed = confirm(
                    'Warning: this will make an editorial change to this page, have you checked with appropriate person?'
                  );

                  if (!confirmed) {
                    return window.location.reload();
                  }

                  setStaffPick(this.props.productID, !this.props.isStaffPick);
                }}
              />
            </div>
            <div>
              <input
                name="RemoveSelectionButton"
                type="button"
                value="Suppress"
                className="admin-input"
                onClick={() => addOrRemoveProduct(productID)}
              />
            </div>
          </div>
        ) : null}
        <a
          href={productID ? '/' + productUrl : undefined}
          className="product-image col-xs-6 col-sm-12"
        >
          <div className="product-image-inner">
            {productImage && <img src={productImage + '?b=0xffffff&ss=2.0'} />}

            {(() => {
              if (hasFreeShipping || hasFreeShippingWorldwide) {
                return (
                  <div className="special-banner label-tag--red">
                    Free Delivery
                  </div>
                );
              } else if (previousPrice) {
                return (
                  <div className="special-banner label-tag--yellow">
                    Special Offer
                  </div>
                );
              } else if (isStaffPick) {
                return (
                  <div className="special-banner label-tag--green">
                    Staff Pick
                  </div>
                );
              } else {
                return null;
              }
            })()}
          </div>
        </a>
        <div className="product-copy col-xs-6 col-sm-12">
          <a
            href={productID ? '/' + productUrl : undefined}
            className="product-text"
          >
            {shortName}
          </a>
          <div className="product-box-rating-block">
            {reviewCount > 0 && (
              <span>
                <span
                  title={`Rating (${userRating}/5)`}
                  className={`stars-${userRating * 2}`}
                />
                <span className="product-box-volabv gold">
                  ({reviewCount} {pluralise('Review', reviewCount)})
                </span>
              </span>
            )}
          </div>

          <a
            href={productID ? '/' + productUrl : undefined}
            className={`product-text-2${previousPrice ? ' withPrevious' : ''}`}
          >
            <span className="price">
              {price ? localPriceWithCurrency(price) : null}
            </span>
            {previousPrice && (
              <span className="previousprice strike-through">
                {localPriceWithCurrency(previousPrice)}
              </span>
            )}
          </a>

          {productID ? (
            <BuyButton
              productID={productID}
              key={`buy-button-${productID}`}
              isDesktop={isDesktop}
              onClick={(e) => {
                window.AddToBasket(productID);
                tracker('Added to Basket', productID, 1);
              }}
            />
          ) : (
            <div className="empty-buy-button" />
          )}
        </div>
      </div>
    );
  }
}

export default Product;
