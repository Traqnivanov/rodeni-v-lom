(function (root, factory) {
  "use strict";

  var api = factory(root);

  if (root) {
    root.RODENI_LOCALITY_SUGGESTIONS = api;
  }

  if (typeof module === "object" && module && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : null, function (browserRoot) {
  "use strict";

  var MAX_SUGGESTIONS = 10;

  function normalizeText(value) {
    if (typeof value !== "string") return "";
    return value.trim().replace(/\s+/g, " ").toLowerCase();
  }

  function normalizeCountryCode(value) {
    if (typeof value !== "string") return "";
    return value.trim().toUpperCase();
  }

  function resolveSources(explicitSources) {
    var source = explicitSources || browserRoot;
    if (!source || typeof source !== "object") {
      return { countries: null, cities: null };
    }

    return {
      countries: source.countries || source.RODENI_COUNTRIES || null,
      cities: source.cities || source.RODENI_CITIES || null
    };
  }

  function isKnownCountry(countries, countryCode) {
    if (!Array.isArray(countries)) return false;

    for (var i = 0; i < countries.length; i += 1) {
      var entry = countries[i];
      if (Array.isArray(entry) && entry[0] === countryCode) return true;
    }

    return false;
  }

  function suggest(countryCode, query, explicitSources) {
    var code = normalizeCountryCode(countryCode);
    var normalizedQuery = normalizeText(query);
    if (!code || !normalizedQuery) return [];

    var sources = resolveSources(explicitSources);
    if (!isKnownCountry(sources.countries, code)) return [];
    if (!sources.cities || typeof sources.cities !== "object") return [];

    var list = sources.cities[code];
    if (!Array.isArray(list)) return [];

    var results = [];
    for (var i = 0; i < list.length && results.length < MAX_SUGGESTIONS; i += 1) {
      var originalName = list[i];
      if (typeof originalName !== "string") continue;

      if (normalizeText(originalName).indexOf(normalizedQuery) !== -1) {
        results.push(originalName);
      }
    }

    // Returned values are name suggestions only. They do not establish a
    // verified geographic identity, canonical locality ID or public-count eligibility.
    return results;
  }

  return {
    suggest: suggest
  };
});
