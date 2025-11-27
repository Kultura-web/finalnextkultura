"use client";

import { useEffect } from "react";

export default function TravelLineLoader() {
  useEffect(() => {
    (function (w: any) {
      const q = [
        ["setContext", "TL-INT-kulturahotel-by_2025-11-27", "ru"],
        ["embed", "search-form", { container: "tl-search-form" }],
        ["embed", "booking-form", { container: "tl-booking-form" }],
      ];

      const h = [
        "by-ibe.tlintegration.com",
        "ibe.tlintegration.com",
        "ibe.tlintegration.ru",
      ];

      const t = (w.travelline = w.travelline || {});
      const ti = (t.integration = t.integration || {});

      ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;

      if (!ti.__loader) {
        ti.__loader = true;

        const d = w.document;
        const c =
          d.getElementsByTagName("head")[0] ||
          d.getElementsByTagName("body")[0];

        function e(s: any, f: any) {
          return function () {
            w.TL || (c.removeChild(s), f());
          };
        }

        (function load(h: any[]) {
          if (h.length === 0) return;
          const s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://" + h[0] + "/integration/loader.js";
          s.onerror = s.onload = e(s, function () {
            load(h.slice(1));
          });
          c.appendChild(s);
        })(h);
      }
    })(window);
  }, []);

  return null; // renders nothing
}
