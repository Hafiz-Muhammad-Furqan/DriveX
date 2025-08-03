// import React, { useEffect, useRef, useState } from "react";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// const LiveTracking = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const marker = useRef(null);
//   const locationInterval = useRef(null);
//   const [userLocation, setUserLocation] = useState([67.0011, 24.8607]);

//   useEffect(() => {
//     if (map.current) return;

//     // Initialize map with dark theme
//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: {
//         version: 8,
//         sources: {
//           "osm-tiles": {
//             type: "raster",
//             tiles: [
//               "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
//               "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
//               "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
//             ],
//             tileSize: 256,
//             maxzoom: 19,
//           },
//         },
//         layers: [
//           {
//             id: "background",
//             type: "background",
//             paint: {
//               "background-color": "#0f172a",
//             },
//           },
//           {
//             id: "osm-layer",
//             type: "raster",
//             source: "osm-tiles",
//             paint: {
//               "raster-opacity": 0.8,
//               "raster-brightness-min": 0.2,
//               "raster-brightness-max": 0.8,
//               "raster-contrast": 0.3,
//               "raster-saturation": -0.5,
//             },
//           },
//         ],
//       },
//       center: userLocation,
//       zoom: 18,
//       pitch: 0,
//       bearing: 0,
//       attributionControl: false,
//     });

//     // Remove all default controls
//     map.current._controls = [];

//     // Create Google Maps style marker (water drop style)
//     const createMarkerElement = () => {
//       const el = document.createElement("div");
//       el.innerHTML = `
//         <div style="
//           position: relative;
//           width: 32px;
//           height: 40px;
//           cursor: pointer;
//         ">
//           <!-- Outer water drop shape -->
//           <div style="
//             position: absolute;
//             width: 32px;
//             height: 32px;
//             background: #4285f4;
//             border-radius: 50% 50% 50% 0;
//             transform: rotate(-45deg);
//             border: 3px solid white;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.4);
//             top: 0;
//             left: 0;
//           "></div>
//           <!-- Inner white dot -->
//           <div style="
//             position: absolute;
//             width: 12px;
//             height: 12px;
//             background: white;
//             border-radius: 50%;
//             top: 6px;
//             left: 10px;
//             z-index: 1;
//           "></div>
//           <!-- Shadow at bottom -->
//           <div style="
//             position: absolute;
//             width: 12px;
//             height: 4px;
//             background: rgba(0,0,0,0.3);
//             border-radius: 50%;
//             bottom: 0;
//             left: 10px;
//             filter: blur(2px);
//           "></div>
//         </div>
//       `;
//       return el;
//     };

//     // Add initial marker
//     marker.current = new maplibregl.Marker({
//       element: createMarkerElement(),
//       anchor: "bottom",
//     })
//       .setLngLat(userLocation)
//       .addTo(map.current);

//     return () => {
//       if (locationInterval.current) {
//         clearInterval(locationInterval.current);
//       }
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, []);

//   // Set up location tracking every 10 seconds
//   useEffect(() => {
//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { longitude, latitude } = position.coords;
//             const newLocation = [longitude, latitude];

//             setUserLocation(newLocation);

//             // Update marker position
//             if (marker.current) {
//               marker.current.setLngLat(newLocation);
//             }

//             // Smoothly move map to new location
//             if (map.current) {
//               map.current.flyTo({
//                 center: newLocation,
//                 zoom: 18,
//                 essential: true,
//                 duration: 2000,
//               });
//             }
//           },
//           (error) => {
//             console.error("Error getting location:", error);
//             // Continue with previous location if GPS fails
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 8000,
//             maximumAge: 5000,
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//     };

//     // Get initial location
//     updateLocation();

//     // Set up interval for every 10 seconds
//     locationInterval.current = setInterval(updateLocation, 1000);

//     return () => {
//       if (locationInterval.current) {
//         clearInterval(locationInterval.current);
//       }
//     };
//   }, []);

//   const handleZoomIn = () => {
//     if (map.current) {
//       map.current.zoomIn({ duration: 300 });
//     }
//   };

//   const handleZoomOut = () => {
//     if (map.current) {
//       map.current.zoomOut({ duration: 300 });
//     }
//   };

//   const handleRecenter = () => {
//     if (map.current && userLocation) {
//       map.current.flyTo({
//         center: userLocation,
//         zoom: 18,
//         duration: 1000,
//         essential: true,
//       });
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         backgroundColor: "#0f172a",
//       }}
//     >
//       <div
//         ref={mapContainer}
//         style={{
//           position: "absolute",
//           top: 0,
//           bottom: 0,
//           width: "100%",
//           borderRadius: "0px",
//         }}
//       />

//       {/* Map Controls */}
//       <div
//         style={{
//           position: "absolute",
//           top: "20px",
//           right: "20px",
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "column",
//           gap: "2px",
//         }}
//       >
//         {/* Zoom In Button */}
//         <button
//           onClick={handleZoomIn}
//           style={{
//             width: "40px",
//             height: "40px",
//             backgroundColor: "#0f172a",
//             border: "none",
//             borderRadius: "4px 4px 0 0",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "22px",
//             fontWeight: "900",
//             color: "white",
//             transition: "all 0.2s linear",
//             userSelect: "none",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#0f172a";
//             e.target.style.transform = "scale(1)";
//           }}
//           onMouseDown={(e) => {
//             e.target.style.backgroundColor = "#334155";
//             e.target.style.transform = "scale(0.98)";
//           }}
//           onMouseUp={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//         >
//           +
//         </button>

//         {/* Re-center Button */}
//         <button
//           onClick={handleRecenter}
//           style={{
//             width: "40px",
//             height: "40px",
//             backgroundColor: "#0f172a",
//             border: "none",
//             borderRadius: "0",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             color: "white",
//             transition: "all 0.2s linear",
//             userSelect: "none",
//             borderTop: "1px solid #1e293b",
//             borderBottom: "1px solid #1e293b",
//             fontSize: "22px",
//             fontWeight: "900",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#0f172a";
//             e.target.style.transform = "scale(1)";
//           }}
//           onMouseDown={(e) => {
//             e.target.style.backgroundColor = "#334155";
//             e.target.style.transform = "scale(0.98)";
//           }}
//           onMouseUp={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <circle cx="12" cy="12" r="10" />
//             <path d="M8 12h8" />
//             <path d="M12 8v8" />
//             <circle cx="12" cy="12" r="3" />
//           </svg>
//         </button>

//         {/* Zoom Out Button */}
//         <button
//           onClick={handleZoomOut}
//           style={{
//             width: "40px",
//             height: "40px",
//             backgroundColor: "#0f172a",
//             border: "none",
//             borderRadius: "0 0 4px 4px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             fontSize: "22px",
//             fontWeight: "900",
//             color: "white",
//             transition: "all 0.2s linear",
//             userSelect: "none",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#0f172a";
//             e.target.style.transform = "scale(1)";
//           }}
//           onMouseDown={(e) => {
//             e.target.style.backgroundColor = "#334155";
//             e.target.style.transform = "scale(0.98)";
//           }}
//           onMouseUp={(e) => {
//             e.target.style.backgroundColor = "#1e293b";
//             e.target.style.transform = "scale(1.02)";
//           }}
//         >
//           –
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveTracking;
// ====================================================================================
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LiveMapTracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const locationInterval = useRef(null);
  const [userLocation, setUserLocation] = useState([67.0011, 24.8607]);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 500);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (map.current) return;

    // Initialize map with dark theme
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "#0f172a",
            },
          },
          {
            id: "osm-layer",
            type: "raster",
            source: "osm-tiles",
            paint: {
              "raster-opacity": 0.8,
              "raster-brightness-min": 0.2,
              "raster-brightness-max": 0.8,
              "raster-contrast": 0.3,
              "raster-saturation": -0.5,
            },
          },
        ],
      },
      center: userLocation,
      zoom: 18,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    // Remove all default controls
    map.current._controls = [];

    // Create Google Maps style marker (water drop style)
    const createMarkerElement = () => {
      const el = document.createElement("div");
      el.innerHTML = `
        <div style="
          position: relative;
          width: 32px;
          height: 40px;
          cursor: pointer;
        ">
          <!-- Outer water drop shape -->
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            background: #4285f4;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            top: 0;
            left: 0;
          "></div>
          <!-- Inner white dot -->
          <div style="
            position: absolute;
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            top: 6px;
            left: 10px;
            z-index: 1;
          "></div>
          <!-- Shadow at bottom -->
          <div style="
            position: absolute;
            width: 12px;
            height: 4px;
            background: rgba(0,0,0,0.3);
            border-radius: 50%;
            bottom: 0;
            left: 10px;
            filter: blur(2px);
          "></div>
        </div>
      `;
      return el;
    };

    // Add initial marker
    marker.current = new maplibregl.Marker({
      element: createMarkerElement(),
      anchor: "bottom",
    })
      .setLngLat(userLocation)
      .addTo(map.current);

    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Set up location tracking every 10 seconds with automatic recentering
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            const newLocation = [longitude, latitude];

            setUserLocation(newLocation);

            // Update marker position
            if (marker.current) {
              marker.current.setLngLat(newLocation);
            }

            // Automatically recenter map to new location every 10 seconds
            if (map.current) {
              map.current.flyTo({
                center: newLocation,
                zoom: 18,
                essential: true,
                duration: 2000,
              });
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            // Continue with previous location if GPS fails
          },
          {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 5000,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Get initial location
    updateLocation();

    // Set up interval for every 10 seconds
    locationInterval.current = setInterval(updateLocation, 10000);

    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn({ duration: 300 });
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut({ duration: 300 });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          top: 0,
          bottom: "20%",
          width: "100%",
          borderRadius: "0px",
        }}
      />

      {/* Map Controls - Only show zoom buttons on screens wider than 500px */}
      {isWideScreen && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {/* Zoom In Button */}
          <button
            onClick={handleZoomIn}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "4px 4px 0 0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: "900",
              color: "white",
              transition: "all 0.2s linear",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e293b";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#0f172a";
              e.target.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = "#334155";
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.backgroundColor = "#1e293b";
              e.target.style.transform = "scale(1.02)";
            }}
          >
            +
          </button>

          {/* Zoom Out Button */}
          <button
            onClick={handleZoomOut}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "0 0 4px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: "900",
              color: "white",
              transition: "all 0.2s linear",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e293b";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#0f172a";
              e.target.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = "#334155";
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.backgroundColor = "#1e293b";
              e.target.style.transform = "scale(1.02)";
            }}
          >
            –
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveMapTracking;
