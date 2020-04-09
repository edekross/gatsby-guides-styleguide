import React, { Component } from "react";
import styled from "@emotion/styled";
import Sidebar from "./Sidebar";
import Article from "./Article";
import { arrayOf, shape, string, array } from "prop-types";

const Wrapper = styled.main`
  display: flex;
`;

export default class Main extends Component {
  static propTypes = {
    title: string,
    sections: arrayOf(
      shape({
        title: string,
        content: array
      })
    )
  };
  render() {
    return (
      <Wrapper>
        <Sidebar {...this.props}></Sidebar>
        <Article {...this.props}></Article>
      </Wrapper>
    );
  }
}
