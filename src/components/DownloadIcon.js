import React from "react";
import { css, cx } from "emotion";
import { string } from "prop-types";
import { emphasis } from "../Colors";
import { ms } from "../Typography";

export default function DownloadIcon({ format, color = emphasis, title }) {
  return (
    <svg
      className={css`
        width: 48px;
      `}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 130"
      fill={color}
    >
      <title>{title}</title>
      <path d="M105.08,46h-1.72l0-21.18a.24.24,0,0,0,0-.08.78.78,0,0,0,0-.22.69.69,0,0,0,0-.13.57.57,0,0,0-.12-.18,1,1,0,0,0-.08-.11L79.24.29a1,1,0,0,0-.3-.19s0,0-.07,0A1.36,1.36,0,0,0,78.58,0H10.71A4.1,4.1,0,0,0,6.62,4.09V46H4.92A4.93,4.93,0,0,0,0,50.94V93.36a4.92,4.92,0,0,0,4.92,4.91h1.7v27.64A4.1,4.1,0,0,0,10.71,130H99.19a4.09,4.09,0,0,0,4.09-4.09l0-27.64h1.77A4.92,4.92,0,0,0,110,93.36V50.94A4.93,4.93,0,0,0,105.08,46ZM79.53,3.41,100,23.84H79.53ZM8.62,4.09A2.1,2.1,0,0,1,10.71,2H77.53V24.84a1,1,0,0,0,1,1h22.85l0,20.18H8.62Zm92.66,121.82A2.1,2.1,0,0,1,99.19,128H10.71a2.1,2.1,0,0,1-2.09-2.09V98.27h92.69ZM108,93.36a2.92,2.92,0,0,1-2.92,2.91H4.92A2.92,2.92,0,0,1,2,93.36V50.94A2.92,2.92,0,0,1,4.92,48H105.08A2.92,2.92,0,0,1,108,50.94Z" />
      <text
        className={css`
          text-align: center;
          font-size: ${ms(1)}rem;
          font-family: "source_sans_pro";
        `}
        x="50%"
        y="57%"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {format}
      </text>
    </svg>
  );
}

DownloadIcon.propTypes = {
  format: string.isRequired,
  color: string.isRequired,
  title: string.isRequired
};
