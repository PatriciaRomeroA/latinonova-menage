import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
  assert.match(html, /confiance/i);
  assert.match(html, /Demandez votre soumission gratuite/);
  assert.match(html, /href="\/soumission"/);
  assert.match(html, /Deux jeunes entrepreneurs\./);
  assert.match(html, /href="tel:\+15141234567"/);
  assert.match(html, /href="mailto:info@latinovamenage\.com"/);
});

test("renders every centrally configured service card on the home page", async () => {
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

test("renders the services directory from the central collection", async () => {
  const response = await render("/services");
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const service of [
    "Nettoyage commercial",
    "Nettoyage institutionnel",
    "Nettoyage après rénovation",
    "Nettoyage de vitres",
    "Nettoyage résidentiel",
  ]) {
    assert.match(html, new RegExp(service, "i"));
  }

  assert.equal((html.match(/class="services-page-card"/g) ?? []).length, 5);
});

test("renders every service slug with the reusable detail template", async () => {
  const services = [
    ["nettoyage-commercial", "Bureaux et espaces corporatifs"],
    ["nettoyage-institutionnel", "Garderies"],
    ["nettoyage-apres-renovation", "Élimination de la poussière"],
    ["nettoyage-de-vitres", "Vitres intérieures"],
    ["nettoyage-residentiel", "Grand ménage"],
  ];

  for (const [slug, expectedItem] of services) {
    const response = await render(`/services/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`data-service-slug="${slug}"`));
    assert.match(html, new RegExp(expectedItem, "i"));
    assert.match(html, /Demander une soumission/i);
    assert.match(html, new RegExp(`href="/soumission\\?service=${slug}"`));
  }
});

test("renders the soumission page with the reusable quote form", async () => {
  const response = await render("/soumission");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Une propreté professionnelle, adaptée à vos besoins/);
  assert.match(html, /First Name/);
  assert.match(html, /Sélectionner un service/);
  assert.doesNotMatch(html, /Requested sub-service/i);
});

test("centralizes the quote form and derives service options from SERVICES", async () => {
  const [formSource, serviceDetailSource] = await Promise.all([
    readFile(
      new URL("../src/presentation/quote/components/QuoteForm.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/presentation/services/components/ServiceDetail.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(formSource, /services\.map/);
  assert.match(formSource, /Sélectionner un service/);
  assert.doesNotMatch(formSource, /Requested sub-service/i);
  assert.doesNotMatch(formSource, /requestedSubService/i);
  assert.match(serviceDetailSource, /initialService=\{service\.slug/);
});

test("returns the framework not-found response for an invalid service slug", async () => {
  const response = await render("/services/service-inexistant");
  assert.equal(response.status, 404);
});

test("keeps service data and resolution centralized", async () => {
  const [servicesSource, resolverSource, detailSource] = await Promise.all([
    readFile(
      new URL("../src/domain/services/services.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/domain/services/service-resolver.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../src/presentation/services/components/ServiceDetail.tsx",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  const slugs = [...servicesSource.matchAll(/slug: "([^"]+)"/g)].map(
    ([, slug]) => slug,
  );
  assert.equal(slugs.length, 5);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.match(resolverSource, /SERVICES\.find/);
  assert.match(detailSource, /service\.items\.map/);
  assert.doesNotMatch(detailSource, /service\.slug\s*===|switch\s*\(/);
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

test("centralizes icon rendering through the shared AppIcon layer", async () => {
  const [appIcon, registry, homeContent] = await Promise.all([
    readFile(
      new URL("../src/shared/icons/AppIcon.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/shared/icons/icon-registry.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/domain/home/content.ts", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(appIcon, /@iconify\/react/);
  assert.match(appIcon, /data-icon=\{name\}/);
  assert.match(registry, /pickIcon\(lucideIcons, "map-pinned"\)/);
  assert.doesNotMatch(homeContent, /[⌖◷☎✉✓★▦◆✦⌂◎♧◇]/);
});
