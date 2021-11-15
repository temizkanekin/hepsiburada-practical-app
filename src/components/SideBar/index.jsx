import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectSortType,
  setSortType,
} from "../../redux/slices/app";
import { useHistory } from "react-router-dom";

import styles from "./index.module.css";

export const sortItems = [
  {
    label: "En Düşük Fiyat",
    value: "fullPrice+",
  },
  {
    label: "En Yüksek Fiyat",
    value: "fullPrice-",
  },
  {
    label: "En Yeniler (A>Z)",
    value: "createdDate+",
  },
  {
    label: "En Yeniler (Z>A)",
    value: "createdDate-",
  },
];

const findDistinctItemsWithCounts = (items) => {
  let resultItems = [];
  let counts = [];
  items.forEach((item) => {
    const itemIndex = resultItems.indexOf(item);
    if (itemIndex === -1) {
      resultItems.push(item);
      counts.push(1);
    } else {
      counts[itemIndex]++;
    }
  });
  return resultItems.map((item, index) => ({
    name: item,
    count: counts[index],
  }));
};

const SideBar = () => {
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedBrand, setSelectedBrand] = useState();

  const products = useSelector((state) => selectProducts(state));
  const sortType = useSelector((state) => selectSortType(state));

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let colors = [],
      brands = [];
    products.forEach(({ color, brand }) => {
      colors.push(color);
      brands.push(brand);
    });
    setColors(findDistinctItemsWithCounts(colors));
    setBrands(findDistinctItemsWithCounts(brands));
  }, [products]);

  useEffect(() => {
    const brandQuery = selectedBrand ? `brand=${selectedBrand}` : "";
    const colorQuery = selectedColor ? `color=${selectedColor}` : "";
    const isBothQueryParamsExist = !!brandQuery && !!colorQuery;
    const queryParams = `${brandQuery}${
      isBothQueryParamsExist ? "&" : ""
    }${colorQuery}`;
    history?.push({
      search: queryParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand, selectedColor]);

  const handleSort = (value) => () => {
    dispatch(setSortType(value));
  };

  return (
    <>
      {!!colors.length && (
        <section className={styles.sidebar__section} data-testid='sidebar-root'>
          <span className={styles.sidebar__title}>Renk</span>
          {colors.map((color, index) => (
            <span
              className={styles.sidebar__items}
              key={index}
              onClick={() =>
                color.name === selectedColor
                  ? setSelectedColor(undefined)
                  : setSelectedColor(color.name)
              }
              style={{ color: color.name === selectedColor && "#FF6000" }}
              data-testid='sidebar-colors'
            >
              {color.name} ({color.count})
            </span>
          ))}
        </section>
      )}

      <section className={styles.sidebar__section}>
        <span className={styles.sidebar__title}>Sıralama</span>
        {sortItems.map((type, index) => (
          <span
            className={styles.sidebar__items}
            key={index}
            onClick={handleSort(type.value)}
            style={{ color: sortType === type.value && "#FF6000" }}
            data-testid='sidebar-sort-items'
          >
            {type.label}
          </span>
        ))}
      </section>

      {!!brands.length && (
        <section className={styles.sidebar__section}>
          <span className={styles.sidebar__title}>Marka</span>
          {brands.map((brand, index) => (
            <span
              className={styles.sidebar__items}
              key={index}
              onClick={() =>
                brand.name === selectedBrand
                  ? setSelectedBrand(undefined)
                  : setSelectedBrand(brand.name)
              }
              style={{ color: brand.name === selectedBrand && "#FF6000" }}
              data-testid='sidebar-brands'
            >
              {brand.name} ({brand.count})
            </span>
          ))}
        </section>
      )}
    </>
  );
};
export default SideBar;
