import { render, cleanup } from "../../testUtils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import SideBar from "./index";
afterEach(cleanup);

describe("<SideBar />", () => {
  it("should render without crashing", () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <SideBar />
      </Router>
    );
  });
  it("should render all the components of the sidebar", () => {
    const history = createMemoryHistory();

    const { getByTestId, getAllByTestId, getByText } = render(
      <Router history={history}>
        <SideBar />
      </Router>
    );
    expect(getByTestId("sidebar-root")).toBeTruthy();
    expect(getAllByTestId("sidebar-colors")).toHaveLength(4);
    expect(getAllByTestId("sidebar-sort-items")).toHaveLength(4);
    expect(getAllByTestId("sidebar-brands")).toHaveLength(2);

    expect(getByText(/Siyah/)).toBeInTheDocument();
    expect(getByText(/Apple/)).toBeInTheDocument();
  });

  it("should select a color", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <SideBar />
      </Router>
    );
    const selectedColor = document.querySelectorAll(
      "[data-testid=sidebar-colors]"
    )[0];
    selectedColor.click();
    const style = window.getComputedStyle(selectedColor);
    expect(style.color).toBe("rgb(255, 96, 0)");
  });
});
