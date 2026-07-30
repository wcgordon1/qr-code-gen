import assert from "node:assert/strict";
import test from "node:test";

import {
  createEmailPayload,
  createLinkPayload,
  createPhoneCallPayload,
  createTextMessagePayload,
  createWifiPayload,
} from "../src/utils/qrCodePayloads.js";

test("creates a link payload without changing its value", function () {
  assert.equal(
    createLinkPayload({ url: "https://example.com" }),
    "https://example.com",
  );
});

test("encodes email subject and body values", function () {
  assert.equal(
    createEmailPayload({
      email: "hello@example.com",
      subject: "Hello world",
      body: "Line one & two",
    }),
    "mailto:hello@example.com?subject=Hello%20world&body=Line%20one%20%26%20two",
  );
});

test("removes visual separators from text-message phone numbers", function () {
  assert.equal(
    createTextMessagePayload({
      countryCode: "+1",
      phoneNumber: "(317) 555-0100",
      message: "Hello there",
    }),
    "sms:+13175550100?body=Hello%20there",
  );
});

test("creates a telephone URI for phone-call QR codes", function () {
  assert.equal(
    createPhoneCallPayload({
      countryCode: "+1",
      phoneNumber: "(317) 555-0100",
    }),
    "tel:+13175550100",
  );
});

test("escapes Wi-Fi delimiters while preserving ordinary spaces", function () {
  assert.equal(
    createWifiPayload({
      ssid: "Guest Network",
      password: 'semi; colon: comma, quote" slash\\',
      encryption: "WPA",
      hidden: true,
    }),
    'WIFI:S:Guest Network;T:WPA;P:semi\\; colon\\: comma\\, quote\\" slash\\\\;H:true;;',
  );
});
