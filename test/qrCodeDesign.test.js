import assert from "node:assert/strict";
import test from "node:test";

import { createInitialQrDesign } from "../src/config/qrCodeOptions.js";
import {
  createQrCodeOptions,
  getEffectiveQrMargin,
  getQrDesignColors,
} from "../src/utils/qrCodeDesign.js";

test("creates gradient renderer options and matching corner fills", function () {
  const design = {
    ...createInitialQrDesign(),
    foregroundMode: "linear",
    foregroundGradientRotation: 90,
  };
  const options = createQrCodeOptions(
    design,
    "https://example.com",
    "",
    512,
  );

  assert.equal(options.width, 512);
  assert.equal(options.dotsOptions.gradient.type, "linear");
  assert.equal(options.dotsOptions.gradient.rotation, Math.PI / 2);
  assert.deepEqual(
    options.cornersSquareOptions.gradient,
    options.dotsOptions.gradient,
  );
});

test("reserves a larger quiet zone for labeled frames", function () {
  const design = {
    ...createInitialQrDesign(),
    frameStyle: "label",
    margin: 24,
  };

  assert.equal(getEffectiveQrMargin(design), 104);
});

test("uses white to assess a transparent QR background", function () {
  const design = {
    ...createInitialQrDesign(),
    isBackgroundTransparent: true,
  };

  assert.deepEqual(getQrDesignColors(design).backgroundColors, ["#ffffff"]);
});
