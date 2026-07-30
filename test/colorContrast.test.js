import assert from "node:assert/strict";
import test from "node:test";

import {
  getContrastRatio,
  getMinimumQrContrastRatio,
  getRelativeLuminance,
  hasLowQrCodeContrast,
} from "../src/utils/colorContrast.js";

test("black and white produce the maximum contrast ratio", function () {
  assert.equal(getRelativeLuminance("#000000"), 0);
  assert.equal(getRelativeLuminance("#ffffff"), 1);
  assert.equal(getContrastRatio("#000000", "#ffffff"), 21);
  assert.equal(hasLowQrCodeContrast("#000000", "#ffffff"), false);
});

test("similar colors trigger the QR contrast warning", function () {
  assert.equal(hasLowQrCodeContrast("#777777", "#888888"), true);
});

test("reports the weakest contrast across gradient and corner colors", function () {
  assert.equal(
    getMinimumQrContrastRatio(
      ["#000000", "#777777"],
      ["#ffffff", "#888888"],
    ),
    getContrastRatio("#777777", "#888888"),
  );
});
