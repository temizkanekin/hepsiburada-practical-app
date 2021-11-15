import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  removeItemFromCart,
  setSearchText,
  selectSearchText,
} from "../../redux/slices/app";
import styles from "./index.module.css";

const callback = (prev, next) => prev + next.discountPrice;

const Header = () => {
  const [isCartRendered, setIsCartRendered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState({
    open: false,
    item: undefined,
  });
  const cartItems = useSelector((state) => selectCartItems(state));
  const searchText = useSelector((state) => selectSearchText(state));
  const dispatch = useDispatch();
  const checkoutPrice = useMemo(
    () => cartItems.reduce(callback, 0),
    [cartItems]
  );

  const handleRemoveItemClick = (item) => () => {
    setIsDeleteModalOpen({ open: true, item });
  };

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(isDeleteModalOpen.item));
    setIsDeleteModalOpen({ open: false, item: undefined });
  };

  // reset search if input is cleared
  const handleSearch = (e) => {
    if (e.target.value?.length < 3 && !!e.target.value) return;
    dispatch(setSearchText(e.target.value));
  };

  const renderCart = () => {
    return (
      <div data-testid='header-cart' className={styles.header__cart}>
        <div className={styles.header__cart__content}>
          {cartItems.map((cartItem) => (
            <div
              className={styles["header__cart-item"]}
              key={cartItem.productId}
              data-testid='header-cart-item'
            >
              <img
                className={styles["header__cart-item__image"]}
                src={cartItem.image}
                alt={cartItem.name}
                width='40'
                height='59'
              />
              <div className={styles["header__cart-item__title-container"]}>
                <span className={styles["header__cart-item__title"]}>
                  {cartItem.name}
                </span>
                <button
                  className={styles["header__cart__remove-item-button"]}
                  onClick={handleRemoveItemClick(cartItem)}
                  data-testid='header-cart-item-remove-button'
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))}
          <div
            className='line-18 font-14'
            data-testid='header-cart-total-price'
          >
            <span className='bold'>Toplam Tutar: </span>
            {checkoutPrice} TL
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.header} data-testid='header-root'>
      <img
        alt='logo'
        className={styles.header__logo}
        src='/assets/logo.svg'
        data-testid='header-logo'
      ></img>
      <input
        type='search'
        className={styles["header__search-area"]}
        placeholder="25 milyon'dan fazla ürün içerisinde ara"
        onChange={handleSearch}
        value={searchText}
        data-testid='header-search-area'
      />
      <img
        src='/assets/magnifying_glass.svg'
        className={styles["header__search-area__mag-glass"]}
        alt='search'
      />
      <button
        className={styles["header__cart-button"]}
        onClick={() => setIsCartRendered(!isCartRendered)}
        data-testid='header-cart-button'
      >
        Sepetim
      </button>
      <div
        className={styles["header__cart-button__item-count"]}
        data-testid='header-cart-button-item-count'
      >
        {cartItems.length}
      </div>
      {isCartRendered && renderCart()}
      {isDeleteModalOpen.open && (
        <dialog className={styles["cart__delete-modal-outer"]}>
          <div className={styles["cart__delete-modal"]}>
            <div className={styles["cart__delete-modal__title"]}>
              Ürünü silmek istediğinize emin misiniz?
            </div>
            <div className={styles["cart__delete-modal__content"]}>
              {isDeleteModalOpen.item.name}
            </div>
            <div className={styles["cart__delete-modal__content__buttons"]}>
              <button
                className={
                  styles["cart__delete-modal__content__buttons__remove"]
                }
                onClick={handleRemoveItemFromCart}
                data-testid='header-cart-item-remove-button-remove'
              >
                <span className='font-12 bold'>EVET</span>
              </button>
              <button
                className={
                  styles["cart__delete-modal__content__buttons__cancel"]
                }
                onClick={() =>
                  setIsDeleteModalOpen({ open: false, item: undefined })
                }
                data-testid='header-cart-item-remove-button-cancel'
              >
                <span className='font-12 bold'>HAYIR</span>
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Header;
