import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const association = JSON.parse(read(".well-known/apple-app-site-association"));
const page = read("trips/index.html");
const script = read("assets/invite.js");

const appIDs = association.applinks.details[0].appIDs;
assert.ok(appIDs.includes("VCLY53R2A9.com.mulligancrew.app"));
assert.ok(appIDs.includes("VCLY53R2A9.com.mulligancrew.prototype"));
assert.match(page, /id6759926474/);
assert.match(page, /return to the original message and tap this invitation again/i);
assert.match(script, /memberCode/);
assert.match(script, /joinCode/);
assert.match(script, /mulligan-crew:\/\/trips/);
assert.doesNotMatch(page, /analytics|facebook pixel|google tag/i);

console.log("Trip invitation website validation passed: production/preview AASA IDs, branded App Store fallback, preserved codes, and re-tap recovery are present.");
