import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const page = read("crews/index.html");
const script = read("assets/crew-invite.js");
const association = JSON.parse(read(".well-known/apple-app-site-association"));
const components = association.applinks.details.flatMap((detail) => detail.components.map((entry) => entry["/"]));

assert.match(page, /Join a Crew — Mulligan Crew/);
assert.match(page, /id6759926474/);
assert.match(page, /assets\/crew-invite\.js/);
assert.match(script, /golferCode/);
assert.match(script, /joinCode/);
assert.match(script, /mulligan-crew:\/\/crews/);
assert.match(script, /slice\(0, 8\)/);
assert.match(script, /slice\(0, 12\)/);
assert.ok(components.includes("/crews"));
assert.ok(components.includes("/crews/*"));

console.log("Crew invitation website validation passed: App Store fallback, installed-app routes, code handling, and Associated Domains paths are present.");
