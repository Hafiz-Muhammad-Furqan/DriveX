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

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (map.current) return;

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

    map.current._controls = [];

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

    updateLocation();

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
