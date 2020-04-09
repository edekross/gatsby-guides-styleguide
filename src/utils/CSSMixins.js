import convert from "xml-js";

export const HideInnerText = `
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0,0,0,0);
border: 0;
`;

export const EqualDimensions = function(d) {
  return `
    height: ${d};
    width: ${d};
  `;
};
