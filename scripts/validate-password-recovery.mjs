import assert from "node:assert/strict";
import fs from "node:fs";

const page = fs.readFileSync(new URL("../reset-password/index.html", import.meta.url), "utf8");
const script = fs.readFileSync(new URL("../assets/password-reset.js", import.meta.url), "utf8");
const association = JSON.parse(fs.readFileSync(new URL("../.well-known/apple-app-site-association", import.meta.url), "utf8"));
const components = association.applinks.details.flatMap((detail) => detail.components ?? []);

assert.match(page, /Account recovery/);
assert.match(page, /Save new password/);
assert.match(page, /password-reset-form/);
assert.match(script, /\/auth\/v1\/user/);
assert.match(script, /method: "PUT"/);
assert.match(script, /Authorization: `Bearer \$\{accessToken\}`/);
assert.match(script, /supabasePublicKey/);
assert.match(script, /access_token/);
assert.match(script, /refresh_token/);
assert.ok(components.some((component) => component["/"] === "/reset-password"));

console.log("Password-recovery Universal Link fallback validation passed.");
