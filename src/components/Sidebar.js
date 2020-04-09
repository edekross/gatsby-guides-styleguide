import React, { Component } from "react";
import { css, cx } from "emotion";
import styled from "@emotion/styled";
import { emphasis } from "../Colors";
import { ms, vr } from "../Typography";
import { HideInnerText, EqualDimensions } from "../utils/CSSMixins";
import { string, array } from "prop-types";
import { FiChevronDown, FiChevronUp, FiChevronRight } from "react-icons/fi";
import { kebabCase } from "lodash";
import { version } from "../../package.json";

const styles = {
  aside: css`
    display: none;
    padding: 1rem;
    @media screen and (min-width: 50rem) {
      display: block;
      width: 30%;
      max-width: ${ms(13)}rem;
    }
    font-size: ${ms(1)}rem;
    line-height: 1.68;
  `,
  nav: css`
    line-height: 1.4;
  `,
  section: css`
    &:not(:first-of-type) {
      margin-top: ${vr(1)}rem;
    }
  `,
  h2: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${ms(0)}rem;
  `,
  a: css`
    color: ${emphasis};
    font-weight: lighter;
    letter-spacing: 1;
    text-transform: uppercase;
    &:visited {
      color: ${emphasis};
    }
  `
};

const Button = styled.button`
  span {
    ${HideInnerText}
    ${EqualDimensions("1px")}
  }
  display: inline-flex;
  place-items: center;
  border: none;
  appearance: none;
  background: none;
  color: white;
  background-repeat: no-repeat;
  ${EqualDimensions(`${ms(6)}em`)};
  cursor: pointer;
`;

class NavSection extends Component {
  state = {
    isCollapsed: false
  };
  static propTypes = {
    title: string.isRequired,
    subSections: array.isRequired
  };
  render() {
    const { isCollapsed } = this.state;
    const { title, subSections } = this.props;
    return (
      <section className={styles.section}>
        <h2 className={styles.h2}>
          <a className={styles.a} href={`#${kebabCase(title)}`}>
            {title}
          </a>
          <Button
            onClick={() => {
              this.setState({ isCollapsed: !isCollapsed });
            }}
            isCollapsed={isCollapsed}
          >
            {isCollapsed ? (
              <FiChevronRight size={24} />
            ) : (
              <FiChevronDown size={24} />
            )}
            <span>{isCollapsed ? "Show" : "Collapse"}</span>
          </Button>
        </h2>
        <ul style={isCollapsed ? { display: "none" } : { display: "block" }}>
          {subSections.map(link => {
            return (
              <li key={link.title}>
                <a href={`#${kebabCase(title)}-${kebabCase(link.title)}`}>
                  {link.title}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default class Sidebar extends Component {
  render() {
    const { sections } = this.props;
    return (
      <aside className={styles.aside}>
        <nav>
          {sections.map(({ title, subSections }) => (
            <NavSection key={title} title={title} subSections={subSections} />
          ))}
        </nav>
        <p
          style={{
            fontSize: `${ms(0)}rem`,
            marginTop: `${vr(3)}rem`,
            color: "rgba(255,255,255,.5)"
          }}
        >
          Version {version}
        </p>
      </aside>
    );
  }
}
