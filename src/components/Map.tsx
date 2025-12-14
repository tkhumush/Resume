import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type CityBubble = {
  name: string;
  latitude: number;
  longitude: number;
  region: string;
  projects: string[];
  radius?: number;
};

type DatamapInstance = {
  svg: { remove: () => void };
  bubbles: (items: CityBubble[]) => void;
  resize: () => void;
};

type DatamapOptions = {
  element: HTMLElement | null;
  scope: string;
  responsive: boolean;
  fills: Record<string, string>;
  data: Record<string, { fillKey: string }>;
  setProjection: (element: HTMLElement) => { path: unknown; projection: unknown };
  geographyConfig: Record<string, unknown>;
  bubblesConfig: Record<string, unknown>;
};

declare global {
  interface Window {
    Datamap: new (options: DatamapOptions) => DatamapInstance;
    d3: typeof import('d3');
  }
}

const usCities: CityBubble[] = [
  {
    name: 'New York City, USA',
    latitude: 40.7128,
    longitude: -74.006,
    region: 'United States',
    projects: ['HR project management for compensation structure rollout.'],
    radius: 8,
  },
  {
    name: 'Washington, DC & Maryland, USA',
    latitude: 38.9072,
    longitude: -77.0369,
    region: 'United States',
    projects: [
      'Consulting across change management and data analytics.',
      'WMATA workforce planning dashboards and Power Platform solutions.',
    ],
    radius: 9,
  },
];

const menaCities: CityBubble[] = [
  {
    name: 'Amman, Jordan',
    latitude: 31.9539,
    longitude: 35.9106,
    region: 'Jordan',
    projects: ['Workforce planning engagement with targeted staffing recommendations.'],
    radius: 8,
  },
  {
    name: 'Riyadh, Saudi Arabia',
    latitude: 24.7136,
    longitude: 46.6753,
    region: 'Saudi Arabia',
    projects: [
      'University strategy and operating model refresh.',
      'Strategy development initiatives with stakeholder interviews.',
      'HRIS transition and HR policy modernization.',
      'Workforce planning and analytics engagements.',
    ],
    radius: 9,
  },
  {
    name: 'Doha, Qatar',
    latitude: 25.2854,
    longitude: 51.531,
    region: 'Qatar',
    projects: ['Strategy Implementation Advisor to the Board of Directors.'],
    radius: 8,
  },
];

const Map = () => {
  const mapRefUS = useRef<HTMLDivElement | null>(null);
  const mapRefMENA = useRef<HTMLDivElement | null>(null);
  const mapInstanceUS = useRef<DatamapInstance | null>(null);
  const mapInstanceMENA = useRef<DatamapInstance | null>(null);
  const [scriptCount, setScriptCount] = useState(0);

  const createMap = (
    element: HTMLDivElement,
    bubbles: CityBubble[],
    focusFill: Record<string, { fillKey: string }>,
    center: [number, number],
    scaleFactor: number,
  ) => {
    const fills = { defaultFill: '#e5e7eb', focus: '#c7d2fe' };
    const map = new window.Datamap({
      element,
      scope: 'world',
      responsive: true,
      fills,
      data: focusFill,
      setProjection: function (el: HTMLElement) {
        const d3 = window.d3;
        const projection = d3.geo
          .mercator()
          .center(center)
          .scale(el.offsetWidth * scaleFactor)
          .translate([el.offsetWidth / 2, el.offsetHeight / 2.5]);
        const path = d3.geo.path().projection(projection);
        return { path, projection };
      },
      geographyConfig: {
        borderColor: '#cbd5e1',
        highlightBorderColor: '#6366f1',
        highlightFillColor: '#e0e7ff',
        popupOnHover: true,
        popupTemplate: (geo) => {
          const country = geo.properties.name;
          const related = bubbles.filter((c) => c.region === country);
          if (!related.length) return `<div class="p-2 text-sm">${country}</div>`;
          return `
            <div class="bg-white rounded-lg shadow-md p-3 text-sm max-w-xs">
              <div class="font-semibold mb-1">${country}</div>
              <ul class="list-disc list-inside space-y-1 text-slate-700">
                ${related
                  .map((c) => `<li><strong>${c.name}:</strong> ${c.projects[0]}</li>`)
                  .join('')}
              </ul>
            </div>
          `;
        },
      },
      bubblesConfig: {
        borderWidth: 1,
        borderOpacity: 0.6,
        borderColor: '#4f46e5',
        popupOnHover: true,
        popupTemplate: (_geo, dataBubble) => {
          const bubble = dataBubble as CityBubble;
          return `
            <div class="bg-white rounded-lg shadow-md p-3 text-sm max-w-xs">
              <div class="font-semibold mb-1">${bubble.name}</div>
              <ul class="list-disc list-inside space-y-1 text-slate-700">
                ${bubble.projects.map((p) => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          `;
        },
        highlightFillColor: '#a5b4fc',
        highlightBorderColor: '#4338ca',
        highlightBorderWidth: 1.5,
        fillOpacity: 0.7,
      },
    });

    map.bubbles(
      bubbles.map((city) => ({
        ...city,
        radius: city.radius || 7,
        fillKey: 'focus',
      })),
    );

    return map;
  };

  useEffect(() => {
    const scriptsReady = scriptCount >= 3;
    if (!scriptsReady || !window.Datamap || !mapRefUS.current || !mapRefMENA.current) return;

    if (mapInstanceUS.current) {
      mapInstanceUS.current.svg.remove();
      mapInstanceUS.current = null;
    }
    if (mapInstanceMENA.current) {
      mapInstanceMENA.current.svg.remove();
      mapInstanceMENA.current = null;
    }

    mapInstanceUS.current = createMap(
      mapRefUS.current,
      usCities,
      { USA: { fillKey: 'focus' } },
      [-70, 37],
      1.0,
    );

    mapInstanceMENA.current = createMap(
      mapRefMENA.current,
      menaCities,
      { JOR: { fillKey: 'focus' }, SAU: { fillKey: 'focus' }, QAT: { fillKey: 'focus' } },
      [50, 26],
      1.3,
    );

    const handleResize = () => {
      mapInstanceUS.current?.resize();
      mapInstanceMENA.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceUS.current) {
        mapInstanceUS.current.svg.remove();
        mapInstanceUS.current = null;
      }
      if (mapInstanceMENA.current) {
        mapInstanceMENA.current.svg.remove();
        mapInstanceMENA.current = null;
      }
    };
  }, [scriptCount]);

  return (
    <div className="relative w-full h-full">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptCount((c) => c + 1)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptCount((c) => c + 1)}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/datamaps@0.5.9/dist/datamaps.world.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptCount((c) => c + 1)}
      />

      <div className="grid md:grid-cols-2 gap-4 h-full">
        <div
          ref={mapRefUS}
          className="w-full h-[320px] rounded-lg border border-slate-200"
          role="img"
          aria-label="Interactive map showing US project locations"
        />
        <div
          ref={mapRefMENA}
          className="w-full h-[320px] rounded-lg border border-slate-200"
          role="img"
          aria-label="Interactive map showing MENA project locations"
        />
      </div>

      <style jsx global>{`
        .datamap {
          width: 100% !important;
          height: 100% !important;
        }
        .datamap svg {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default Map;
