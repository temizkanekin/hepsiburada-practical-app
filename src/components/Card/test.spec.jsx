import { render, cleanup, fireEvent, waitFor } from "../../testUtils";
import { products as mockProducts } from "../../mockData";

import Card from "./index";
afterEach(cleanup);

describe("<Card />", () => {
  it("should render without crashing", () => {
    render(<Card {...mockProducts[0]} />);
  });
  it("should render all the components of the card", () => {
    const { getByTestId } = render(<Card {...mockProducts[0]} />);
    expect(getByTestId("card-image")).toBeTruthy();
    expect(getByTestId("card-title")).toBeTruthy();
    expect(getByTestId("card-product-info")).toBeTruthy();
    expect(getByTestId("card-product-price")).toBeTruthy();
  });

  it("should render the hover text when mouse enter", async () => {
    const { getByTestId, getByText } = render(<Card {...mockProducts[0]} />);

    fireEvent.mouseOver(getByTestId("card-root"));
    await waitFor(() => getByTestId("card-add-to-cart"));

    expect(getByTestId("card-add-to-cart")).toBeTruthy();
    expect(getByText(/Bu ürünü sepete ekleyemezsiniz/)).toBeInTheDocument();

    fireEvent.mouseLeave(getByTestId("card-root"));
    await waitFor(() => getByText(/Marka/));
    expect(getByText(/Marka/)).toBeInTheDocument();
  });
});
