import assert from "node:assert/strict";
import test from "node:test";

import { getScanResultStatus } from "../src/utils/qrCodeScan.js";

test("maps local decode counts to stable scanability states", function () {
  assert.equal(getScanResultStatus(0, 3), "failed");
  assert.equal(getScanResultStatus(1, 3), "caution");
  assert.equal(getScanResultStatus(2, 3), "passed");
  assert.equal(getScanResultStatus(3, 3), "strong");
});
