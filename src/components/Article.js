import React, { Component, Fragment } from "react";
import { css, cx } from "emotion";
import { emphasis, background } from "../Colors";
import { ms, vr } from "../Typography";
import { kebabCase } from "lodash";
import MD from "react-markdown";
import smartquotes from "smartquotes";
import DownloadIcon from "./DownloadIcon";
import { FiDownload, FiCopy } from "react-icons/fi";

class Block extends Component {
  styles = {
    block: css`
      margin-top: ${vr(1)}rem;
    `,
    colorPalette: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      @media screen and (min-width: 42rem) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      gap: ${vr(0.5)}rem;
      justify-content: space-between;
      margin-top: ${vr(1)}rem;
    `,
  };
  render() {
    const { type } = this.props;
    switch (type) {
      case "p":
        return <Paragraph {...this.props} />;
      case "img":
        const { src, alt } = this.props;
        return (
          <img
            className={this.styles.block}
            src={require(`~images/${src}?ext`)}
            width="100%"
            alt={alt}
          />
        );
      case "colors": {
        const { colors } = this.props;
        return (
          <ul className={this.styles.colorPalette}>
            {colors.map((color) => (
              <li key={color.name}>
                <ColorChip {...color} />
              </li>
            ))}
          </ul>
        );
      }
      case "downloads": {
        const { content, file } = this.props;
        return (
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              ${this.styles.block}
            `}
          >
            <h5
              className={css`
                display: flex;
                align-items: end;
                width: 100%;
                font-size: ${ms(-1.5)}rem;
                color: ${emphasis};
                letter-spacing: 0.04rem;
              `}
            >
              <FiDownload size={16} /> &nbsp;
              {file.toUpperCase()}
            </h5>
            {content.map((download, index) => {
              return (
                <a
                  className={css`
                    max-width: 10%;
                    margin-top: ${vr(0.5)}rem;
                    &:not(:last-of-type) {
                      margin-right: ${vr(0.5)}rem;
                    }
                    padding: ${vr(0.5)}rem;
                  `}
                  key={index}
                  href={require(`~attachments/${download.src}?attachment`)}
                  download
                >
                  <DownloadIcon {...download} />
                </a>
              );
            })}
          </div>
        );
      }
      case "scale": {
        const { text, sizes } = this.props;
        return <Scale text={text} sizes={sizes} />;
      }
      default:
        return <pre>{JSON.stringify(this.props, null, "")}</pre>;
    }
  }
}

class ColorChip extends Component {
  copy = (value) => {
    console.log(value);
  };
  render() {
    const { colorValues, name } = this.props;

    return (
      <Fragment>
        <div
          className={css`
            display: block;
            padding: ${vr(5)}rem ${vr(0.25)}rem ${vr(0.25)}rem;
            background: ${colorValues[0].value};
            border: 1px solid white;
            position: relative;
          `}
        >
          <span
            className={css`
              display: block;
              position: absolute;
              width: 1rem;
              height: 1rem;
              background: ${background};
              border-radius: 50%;
              border: 1px solid white;
              top: ${vr(0.25)}rem;
              right: ${vr(0.25)}rem;
            `}
          ></span>
          <dl
            className={css`
              padding: ${vr(0.5)}rem;
              background: white;
              font-size: ${ms(-1)}rem;
              line-height: 1.35;
              color: ${background};
            `}
          >
            <dt
              className={css`
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.05rem;
                margin-bottom: ${vr(0.5)}rem;
              `}
            >
              {name}
            </dt>
            {colorValues.map((value) => (
              <dd key={value.type}>
                <span
                  className={css`
                    font-size: ${ms(-2)}rem;
                    letter-spacing: 0.05rem;
                  `}
                >
                  {value.type}
                </span>
                : {value.value}
                {/* <button onClick={this.copy(value)}>
                  <FiCopy
                    className={css`
                      margin-right: ${vr(0.25)}rem;
                    `}
                  />
                </button> */}
              </dd>
            ))}
          </dl>
        </div>
      </Fragment>
    );
  }
}

function createSizes(sizes) {
  return sizes
    .map((s) => convertRemToPixels(s))
    .map((s) => `sizes[]=${s}`)
    .toString();
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

class SubSection extends Component {
  styles = {
    section: css`
      margin-top: ${vr(2)}rem;
    `,
    h4: css`
      font-size: ${ms(1)}rem;
      margin-top: ${vr(3)}rem;
      font-weight: bold;
    `,
  };
  render() {
    const { title, blocks } = this.props;
    return (
      <section className={this.styles.section} {...this.props}>
        <h4 className={this.styles.h4}>{title}</h4>
        {blocks &&
          blocks.map((block, index) => (
            <Block
              className={css`
                margin-top: 1rem;
              `}
              key={`${block.type}-${index + 1}`}
              {...block}
            />
          ))}
      </section>
    );
  }
}

function Scale({ text, sizes }) {
  return (
    <ol
      className={css`
        margin-top: ${vr(1)}rem;
        white-space: nowrap;
        overflow: hidden;
        background: #272635;
        padding: ${vr(1)}rem ${vr(1)}rem ${vr(0.25)}rem;
      `}
    >
      {sizes.map((size) => {
        return (
          <li
            key={size}
            className={css`
              font-size: ${ms(size)}rem;
              display: flex;
              margin-bottom: ${vr(1)}rem;
            `}
          >
            <span
              className={css`
                font-size: ${ms(-2)}rem;
                margin-right: 2rem;
                color: ${emphasis};
              `}
            >
              ({size}) {ms(size)}&nbsp;rem
            </span>
            {text}
          </li>
        );
      })}
    </ol>
  );
}

function Paragraph({ text }) {
  const styles = css`
    font-size: ${ms(1)}rem;
    margin-top: ${vr(1)}rem;
    line-height: 1.4141;
    em {
      font-style: italic;
    }
    code {
      font-family: monospace;
      background: #272635;
      padding: ${vr(0.25)}rem;
    }
  `;
  return <MD className={styles} source={smartquotes(text)}></MD>;
}

export default class Article extends Component {
  styles = {
    article: css`
      width: 100%;
      padding: 1rem;
      @media screen and (min-width: 50rem) {
        width: 75ch;
      }
    `,
    h2: css`
      color: ${emphasis};
      font-size: ${ms(4)}rem;
      font-weight: bold;
      &:visited {
        color: ${emphasis};
      }
    `,
    section: css`
      margin-top: ${vr(1)}rem;
    `,
    h3: css`
      color: ${emphasis};
      font-size: ${ms(2)}rem;
      font-weight: bold;
      margin-top: ${vr(3)}rem;
    `,
  };
  render() {
    const { title, introduction, sections } = this.props;
    return (
      <article className={this.styles.article}>
        <h2 className={this.styles.h2}>{title}</h2>
        <Paragraph text={introduction} />
        {sections.map((section) => (
          <section
            id={kebabCase(section.title)}
            className={this.styles.section}
            key={section.title}
          >
            <h3 className={this.styles.h3}>{section.title}</h3>
            {section.p && <Paragraph text={section.p} />}
            {section.subSections.map((subSection) => (
              <SubSection
                id={`${kebabCase(section.title)}-${kebabCase(
                  subSection.title
                )}`}
                key={subSection.title}
                {...subSection}
              />
            ))}
          </section>
        ))}
      </article>
    );
  }
}
