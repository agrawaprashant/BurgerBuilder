import React from "react";
import "./App.css";

import Layout from "./hoc/Layout/layout.compoennt";
import BurgerBuilder from "./containers/BurgerBuilder/burger-builder.component";
class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
