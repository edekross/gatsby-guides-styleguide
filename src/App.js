import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { css } from "emotion";
import "./assets/webfonts/webfonts.css";
import "./styles.css";
import { HideInnerText } from "./utils/CSSMixins";
import { ms, vr } from "./Typography";
import { emphasis } from "./Colors";
import Content from "./data/main.yaml";
import Main from "./components/Main";
import Logo from "./assets/logo.svg?svgr";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <header
          className={css`
            padding: ${vr(2)}rem 1rem;
          `}
        >
          <h1
            className={css`
              span {
                ${HideInnerText}
              }
            `}
          >
            <span>Gatsby Guides</span>
            <Logo
              title="Gatsby Guides Logo"
              fill={emphasis}
              className={css`
                max-width: ${ms(11)}rem;
              `}
            />
          </h1>
        </header>
        <Main {...Content}></Main>
        <footer
          className={css`
            text-align: center;
            margin-top: ${vr(5)}rem;
            min-height: ${vr(10)}rem;
            display: flex;
            justify-content: center;
            align-content: center;
          `}
        >
          2020 © Osio Labs, Inc.
        </footer>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
