import React, { Component } from "react";
import { string } from "prop-types";

export default class Picture extends Component {
  static propTypes = {
    src: string.isRequired,
    caption: string.isRequired
  };

  render() {
    const { caption, src } = this.props;
    const extension = src.match(/\.([a-zA-z]+)$/)[1];

    return <picture></picture>;
  }
}
