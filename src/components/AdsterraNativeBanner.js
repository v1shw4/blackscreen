"use client";

import { useEffect, useRef } from "react";

export default function AdsterraNativeBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.querySelector('script')) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl29655575.effectivecpmnetwork.com/15c0a49e0df9ba3edb4af5e8deb329e9/invoke.js";
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', width: '100%' }}>
      <div id="container-15c0a49e0df9ba3edb4af5e8deb329e9" ref={bannerRef}></div>
    </div>
  );
}
