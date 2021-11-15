import { Provider } from "react-redux";
import { testStore } from "./redux/store";
import { render } from "@testing-library/react";

const StoreProvider = ({ children }) => (
  <Provider store={testStore}>{children}</Provider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: StoreProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
