import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  addItemToCart,
  selectProducts,
} from "../../redux/slices/app";
import { isProductOnCart } from "../../utils";

import styles from "./index.module.css";

const Card = ({
  brand,
  color,
  discountPrice,
  fullPrice,
  image,
  name,
  productId,
}) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => selectCartItems(state));
  const products = useSelector((state) => selectProducts(state));
  const isProductOnCartBool = isProductOnCart(cartItems, productId);

  const renderCartTitle = () => {
    return isProductOnCartBool
      ? "Bu ürünü sepete ekleyemezsiniz"
      : "Sepete Ekle";
  };

  const handleAddItemToCart = () => {
    dispatch(
      addItemToCart(products.find((item) => item.productId === productId))
    );
  };

  return (
    <div
      className={styles.card}
      data-testid='card-root'
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{
        border: isCardHovered && "1px solid #CDCDCD",
      }}
    >
      <div
        className={styles.card__image}
        style={{ border: isCardHovered && "1px solid #fff" }}
      >
        <img data-testid='card-image' src={image} alt={name} />
      </div>
      <div className='flex flex-col' style={{ height: 132 }}>
        <span data-testid='card-title' className={styles.card__title}>
          {name}
        </span>

        {!isCardHovered && (
          <div
            data-testid='card-product-info'
            className={styles["card__product-info"]}
          >
            <div className='line-18 font-12'>
              <span className='bold'>Marka:</span>
              {brand}
            </div>
            <div className='line-18 font-12'>
              <span className='bold'>Renk:</span>
              {color}
            </div>
          </div>
        )}

        {!isCardHovered && (
          <div
            data-testid='card-product-price'
            className={styles["card__product-price"]}
          >
            <span className='bold font-14 line-18'>{discountPrice} TL</span>

            <div className='flex align-center font-12 line-18'>
              <span className='text-through mr-2'>
                {fullPrice.toFixed(2)} TL
              </span>
              <span className='color-red bold'>
                {parseInt(100 - (discountPrice * 100) / fullPrice)}%
              </span>
            </div>
          </div>
        )}
        {isCardHovered && (
          <button
            data-testid='card-add-to-cart'
            className={`${
              isProductOnCartBool &&
              styles["card__add-to-cart-button__disabled"]
            } ${styles["card__add-to-cart-button"]}`}
            onClick={handleAddItemToCart}
          >
            {renderCartTitle()}
          </button>
        )}
      </div>
    </div>
  );
};
export default Card;
