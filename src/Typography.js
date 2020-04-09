import { round } from "lodash";
import fontMeasure from "font-measure";

const { xHeight } = fontMeasure("source_sans_pro");

function idealSize(xHeight) {
  const reciprocal = 1 / xHeight;
  const min = 0.419 * reciprocal;
  const max = 0.579 * reciprocal;
  return (min + max) / 2;
}

function setScale(base, ratio) {
  return scaleTo => {
    return round(base * Math.pow(ratio, scaleTo), 3);
  };
}

export const vr = multiplier => round(idealSize(xHeight) * multiplier, 3);

export const ms = setScale(idealSize(xHeight), 1.25);
