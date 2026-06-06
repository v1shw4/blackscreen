"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner468x60() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.querySelector('script')) {
      const conf = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = {
        'key' : '53a8ab861dd2cc0e9ca04b166f843663',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };`;
      
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.highperformanceformat.com/53a8ab861dd2cc0e9ca04b166f843663/invoke.js";
      
      bannerRef.current.appendChild(conf);
      bannerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', width: '100%', overflow: 'hidden' }}>
      <div ref={bannerRef}></div>
    </div>
  );
}
