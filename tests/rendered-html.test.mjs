import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Latinova landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Latinova Ménage Inc\. \| Services de nettoyage/);
  assert.match(html, /La propreté/);
  assert.match(html, /qui inspire/);
  assert.match(html, /confiance\./);
  assert.match(html, /Demandez votre soumission gratuite/);
  assert.match(html, /Votre partenaire en propreté/);
  assert.match(html, /href="tel:\+15141234567"/);
  assert.match(html, /href="mailto:info@latinovamenage\.com"/);
});

test("renders the four configured service cards", async () => {
  const response = await render();
  const html = await response.text();

  for (const service of [
    "Nettoyage commercial",
    "Nettoyage institutionnel",
    "Nettoyage après rénovation",
    "Nettoyage résidentiel",
  ]) {
    assert.match(html, new RegExp(service, "i"));
  }

  assert.equal((html.match(/class="service-card"/g) ?? []).length, 4);
});

test("keeps mobile navigation accessible and keyboard-aware", async () => {
  const mobileNavigation = await readFile(
    new URL(
      "../src/presentation/home/components/MobileNavigation.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(mobileNavigation, /aria-expanded=\{isOpen\}/);
  assert.match(mobileNavigation, /aria-controls="mobile-navigation"/);
  assert.match(mobileNavigation, /event\.key === "Escape"/);
  assert.match(mobileNavigation, /event\.key !== "Tab"/);
  assert.match(mobileNavigation, /document\.body\.style\.overflow = "hidden"/);
  assert.match(mobileNavigation, /onClick=\{closeMenu\}/);
});
