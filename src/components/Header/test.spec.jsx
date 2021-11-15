import { render, cleanup } from "../../testUtils";

import Header from "./index";

afterEach(cleanup);

describe("<Header />", () => {
  it("should render without crashing", () => {
    render(<Header />);
  });
  it("should render all the components of the header", () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId("header-root")).toBeTruthy();
    expect(getByTestId("header-search-area")).toBeTruthy();
    expect(getByTestId("header-cart-button")).toBeTruthy();
    expect(getByTestId("header-logo")).toBeTruthy();
    expect(getByTestId("header-cart-button-item-count")).toHaveTextContent(3);
  });

  it("should delete an item from the cart", async () => {
    const { getByTestId, getAllByTestId, queryByText } = render(<Header />);
    document.querySelector("[data-testid=header-cart-button]").click();
    expect(getByTestId("header-cart-total-price")).toHaveTextContent("1003.82");
    expect(getByTestId("header-cart")).toBeTruthy();
    expect(getAllByTestId("header-cart-item")).toHaveLength(3);

    document
      .querySelector("[data-testid=header-cart-item-remove-button]")
      .click();
    document
      .querySelector("[data-testid=header-cart-item-remove-button-cancel]")
      .click();
    expect(getAllByTestId("header-cart-item")).toHaveLength(3);

    document
      .querySelector("[data-testid=header-cart-item-remove-button]")
      .click();
    expect(getByTestId("header-cart-item-remove-button-remove")).toBeTruthy();
    document
      .querySelector("[data-testid=header-cart-item-remove-button-remove]")
      .click();

    expect(queryByText("Ürünü silmek istediğinize emin misiniz?")).toBeNull();
  });

  // it("should search", () => {
  //   const { getByTestId } = render(<Header />);
  //   const input = document.querySelector("[data-testid=header-search-area]");
  //   input.value = "Sarı";

  //   expect(getByTestId("header-search-area")).toHaveValue("Sarı");
  // });
});
