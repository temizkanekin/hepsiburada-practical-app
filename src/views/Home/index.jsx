import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import SideBar from "../../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectSortType,
  setSortType,
  selectSearchText,
} from "../../redux/slices/app";
import { useLocation } from "react-router-dom";
import { getQueryParamsFromLocation } from "../../utils";
import { sortItems } from "../../components/SideBar";

import styles from "./index.module.css";

const fillArray = (count) => {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push(i);
  }
  return result;
};

const Home = () => {
  const [queryKeys, setQueryKeys] = useState([]);
  const [queryValues, setQueryValues] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const products = useSelector((state) => selectProducts(state));
  const sortType = useSelector((state) => selectSortType(state));
  const searchText = useSelector((state) => selectSearchText(state));
  const location = useLocation();
  const dispatch = useDispatch();

  const filterProducts = (product) => {
    if (!queryKeys?.length || !queryValues?.length) return true;
    else if (queryKeys.length === 1) {
      return (
        queryValues.includes(product.color) ||
        queryValues.includes(product.brand)
      );
    } else {
      return (
        queryValues.includes(product.color) &&
        queryValues.includes(product.brand)
      );
    }
  };

  const sortProducts = (firstEl, secondEl) => {
    if (!sortType) return 0;
    if (sortType === "fullPrice+") {
      return firstEl.discountPrice - secondEl.discountPrice;
    } else if (sortType === "fullPrice-") {
      return secondEl.discountPrice - firstEl.discountPrice;
    } else if (sortType === "createdDate+") {
      return new Date(firstEl.createdDate) - new Date(secondEl.createdDate);
    } else if (sortType === "createdDate-") {
      return new Date(secondEl.createdDate) - new Date(firstEl.createdDate);
    }
  };

  const productsAfterFilterSort = useMemo(
    () =>
      products
        .filter((product) =>
          searchText === ""
            ? true
            : product.name?.toLowerCase()?.includes(searchText)
        )
        .filter(filterProducts)
        .sort(sortProducts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, searchText, queryKeys, queryValues, sortType]
  );

  const pageCount = useMemo(
    () => Math.ceil(productsAfterFilterSort.length / 12),
    [productsAfterFilterSort]
  );

  useEffect(() => {
    const query = getQueryParamsFromLocation(location);
    setQueryKeys(Array.from(query.keys()));
    setQueryValues(Array.from(query.values()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // reset page index when sort or filter type is changed
  useEffect(() => {
    setCurrentPageIndex(1);
  }, [queryKeys, sortType]);

  const handleSortChange = (e) => {
    dispatch(setSortType(e.target.value));
  };

  return (
    <div className={styles.home}>
      <Header />

      <div className={styles.home__search}>
        <div className={styles.home__search__info}>
          <div className={styles.home__search__info__title}>
            iPhone iOS cep telefonu
          </div>
          {!!searchText && (
            <span style={{ color: "#B0B0B0" }}>
              Aranan Kelime:{" "}
              <strong style={{ color: "#484848" }}>{searchText}</strong>
            </span>
          )}
        </div>
        <select
          className={styles["home__order-select"]}
          onChange={handleSortChange}
          defaultValue=''
          value={sortType}
        >
          <option value='' disabled hidden>
            Sıralama
          </option>
          {sortItems.map((sortItem) => (
            <option value={sortItem.value} key={sortItem.value}>
              {sortItem.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.home__content}>
        <div className={styles["home__content__sidebar-container"]}>
          <SideBar />
        </div>
        <main className={styles.home__content__main}>
          {productsAfterFilterSort
            .slice((currentPageIndex - 1) * 12, currentPageIndex * 12)
            .map((product) => (
              <Card {...product} key={product.productId} />
            ))}
        </main>
      </div>

      <div style={{ left: 350.2, top: 1656, position: "absolute" }}>
        <button
          className={styles["home__pagination-button"]}
          style={{ marginRight: 13 }}
        >
          {"<"}
        </button>
        {fillArray(pageCount).map((pageIndex) => (
          <button
            className={styles["home__pagination-button"]}
            key={pageIndex}
            onClick={() => setCurrentPageIndex(pageIndex)}
            style={{
              color: pageIndex === currentPageIndex && "#FF6000",
              borderColor: pageIndex === currentPageIndex && "#FF6000",
            }}
          >
            {pageIndex}
          </button>
        ))}
        <button
          className={styles["home__pagination-button"]}
          style={{ marginLeft: 6.5 }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Home;
