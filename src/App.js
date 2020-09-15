import React from "react";
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from "./configureStore"
import Root from './container/root.js';


const store = configureStore()

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Provider store={store}>
            <Root/>
          </Provider>
        </BrowserRouter>
    );
  }
}

export default App