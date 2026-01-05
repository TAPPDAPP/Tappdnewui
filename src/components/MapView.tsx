import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Locate, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import maplibregl from "maplibre-gl@4.7.1";
import "maplibre-gl@4.7.1/dist/maplibre-gl.css";

interface EventLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  price: number;
  category: string;
  image: string;
  location: string;
}

interface MapViewProps {
  onEventSelect: (eventId: string, eventName: string) => void;
  onBack?: () => void;
}

// Mock event locations around a central point (will be updated based on user location)
const getEventsAroundLocation = (userLat: number, userLng: number): EventLocation[] => {
  return [
    {
      id: "1",
      name: "Rooftop Jazz Night",
      lat: userLat + 0.01,
      lng: userLng + 0.01,
      date: "Dec 15",
      time: "8:00 PM",
      price: 1500,
      category: "Music",
      image: "jazz concert",
      location: "Sky Lounge"
    },
    {
      id: "2",
      name: "Tech Startup Pitch",
      lat: userLat + 0.02,
      lng: userLng - 0.01,
      date: "Dec 20",
      time: "6:30 PM",
      price: 500,
      category: "Business",
      image: "business conference",
      location: "Innovation Hub"
    },
    {
      id: "3",
      name: "Art Gallery Opening",
      lat: userLat - 0.015,
      lng: userLng - 0.02,
      date: "Dec 18",
      time: "7:00 PM",
      price: 800,
      category: "Arts",
      image: "art gallery",
      location: "Modern Art Museum"
    },
    {
      id: "4",
      name: "Food Festival",
      lat: userLat + 0.03,
      lng: userLng + 0.025,
      date: "Dec 22",
      time: "12:00 PM",
      price: 300,
      category: "Food",
      image: "food festival",
      location: "Central Plaza"
    },
    {
      id: "5",
      name: "EDM Night",
      lat: userLat - 0.025,
      lng: userLng + 0.015,
      date: "Dec 25",
      time: "10:00 PM",
      price: 2000,
      category: "Nightlife",
      image: "nightclub party",
      location: "Club Infinity"
    }
  ];
};

export function MapView({ onEventSelect, onBack }: MapViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [events, setEvents] = useState<EventLocation[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const userMarker = useRef<maplibregl.Marker | null>(null);
  const eventMarkers = useRef<maplibregl.Marker[]>([]);

  // Request location permission
  const requestLocationPermission = () => {
    if (isRequestingLocation) return;
    
    // Check if geolocation is supported
    if (!("geolocation" in navigator)) {
      console.log("Geolocation is not supported by this browser");
      setLocationPermission('denied');
      
      // Use default location (Mumbai)
      const defaultLocation = { lat: 19.0760, lng: 72.8777 };
      setUserLocation(defaultLocation);
      setEvents(getEventsAroundLocation(defaultLocation.lat, defaultLocation.lng));
      
      toast.error("Location not supported", {
        description: "Your browser doesn't support geolocation. Using default location.",
        duration: 4000
      });
      return;
    }

    setIsRequestingLocation(true);
    
    toast.info("Requesting location permission...", {
      description: "We need your location to show events near you",
      duration: 3000
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLocationPermission('granted');
        setEvents(getEventsAroundLocation(location.lat, location.lng));
        setIsRequestingLocation(false);
        
        toast.success("Location access granted!", {
          description: `Showing events near you`,
          duration: 3000
        });
      },
      (error) => {
        console.log("Geolocation error:", error.code, error.message);
        setLocationPermission('denied');
        setIsRequestingLocation(false);
        
        // Use default location (Mumbai) if permission denied
        const defaultLocation = { lat: 19.0760, lng: 72.8777 };
        setUserLocation(defaultLocation);
        setEvents(getEventsAroundLocation(defaultLocation.lat, defaultLocation.lng));
        
        let errorMessage = "Location access denied";
        let errorDescription = "Using default location. You can still explore events!";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            errorDescription = "Please enable location access in your browser settings";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            errorDescription = "Unable to determine your location";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout";
            errorDescription = "The request to get your location timed out";
            break;
        }
        
        toast.error(errorMessage, {
          description: errorDescription,
          duration: 4000
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Request location permission on mount
    requestLocationPermission();
  }, []);

  // Create map when location is available
  useEffect(() => {
    if (!userLocation || !mapContainer.current || map.current) return;

    try {
      // Initialize MapLibre
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: [userLocation.lng, userLocation.lat],
        zoom: 12,
        attributionControl: false
      });

      // Add navigation controls
      const nav = new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false
      });
      map.current.addControl(nav, 'top-right');

      // Only add geolocate control if geolocation is supported and permission granted
      if ("geolocation" in navigator && locationPermission === 'granted') {
        try {
          const geolocateControl = new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
              timeout: 6000
            },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: true
          });
          
          map.current.addControl(geolocateControl, 'top-right');

          map.current.on('load', () => {
            setIsMapLoaded(true);
            
            // Trigger initial geolocation after a delay
            setTimeout(() => {
              try {
                geolocateControl.trigger();
              } catch (e) {
                console.log("Could not trigger geolocate:", e);
              }
            }, 1000);
          });
        } catch (e) {
          console.log("Could not add geolocate control:", e);
          map.current.on('load', () => {
            setIsMapLoaded(true);
          });
        }
      } else {
        map.current.on('load', () => {
          setIsMapLoaded(true);
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      toast.error("Map initialization failed", {
        description: "There was an error loading the map",
        duration: 3000
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [userLocation, locationPermission]);

  // Add user marker
  useEffect(() => {
    if (!map.current || !isMapLoaded || !userLocation) return;

    // Remove old user marker
    if (userMarker.current) {
      userMarker.current.remove();
    }

    // Create custom user marker element
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.innerHTML = `
      <div style="position: relative;">
        <div style="width: 16px; height: 16px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
        <div style="position: absolute; top: 0; left: 0; width: 16px; height: 16px; background: rgba(59, 130, 246, 0.3); border-radius: 50%; animation: pulse 2s infinite;"></div>
      </div>
    `;

    userMarker.current = new maplibregl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

  }, [isMapLoaded, userLocation]);

  // Add event markers
  useEffect(() => {
    if (!map.current || !isMapLoaded || events.length === 0) return;

    // Remove old event markers
    eventMarkers.current.forEach(marker => marker.remove());
    eventMarkers.current = [];

    // Add new event markers
    events.forEach(event => {
      const el = document.createElement('div');
      el.className = 'event-marker';
      el.style.cursor = 'pointer';
      
      const isSelected = selectedEvent?.id === event.id;
      
      el.innerHTML = `
        <div style="position: relative; transition: transform 0.2s;">
          <div style="
            width: 40px; 
            height: 40px; 
            background: linear-gradient(135deg, #c451c9, #a9016d); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ${isSelected ? 'transform: scale(1.25); box-shadow: 0 0 0 4px rgba(255,255,255,0.3);' : ''}
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: #0a0322;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">${event.category.charAt(0)}</div>
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
      });

      el.addEventListener('mouseleave', () => {
        if (selectedEvent?.id !== event.id) {
          el.style.transform = 'scale(1)';
        }
      });

      el.addEventListener('click', () => {
        handleMarkerClick(event);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([event.lng, event.lat])
        .addTo(map.current!);

      eventMarkers.current.push(marker);
    });

  }, [isMapLoaded, events, selectedEvent]);

  const handleMarkerClick = (event: EventLocation) => {
    setSelectedEvent(event);
    
    // Fly to the event location
    if (map.current) {
      map.current.flyTo({
        center: [event.lng, event.lat],
        zoom: 14,
        duration: 1500
      });
    }
  };

  const handleEventCardClick = () => {
    if (selectedEvent) {
      onEventSelect(selectedEvent.id, selectedEvent.name);
    }
  };

  const handleCenterOnUser = () => {
    if (map.current && userLocation) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
        duration: 1500
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Add pulse animation styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Location Permission Banner */}
      {locationPermission === 'denied' && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-yellow-500/20 border-b border-yellow-500/30 p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <div className="flex-1">
              <p className="text-white text-sm">Location access denied</p>
              <p className="text-white/70 text-xs">Enable location to see events near you</p>
            </div>
            <Button
              size="sm"
              onClick={requestLocationPermission}
              className="gradient-primary"
            >
              Enable
            </Button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="flex-1 relative"
        style={{ minHeight: '400px' }}
      />

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2 z-30">
        <Button
          size="sm"
          onClick={handleCenterOnUser}
          className="w-12 h-12 p-0 bg-white/90 hover:bg-white text-[#0a0322] rounded-full shadow-lg"
          title="Center on my location"
        >
          <Locate className="w-5 h-5" />
        </Button>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-20 left-2 text-xs text-white/50 bg-black/50 px-2 py-1 rounded z-30">
        © OpenStreetMap • MapLibre GL
      </div>

      {/* Selected Event Card - Bottom Sheet */}
      {selectedEvent && (
        <div className="absolute bottom-0 left-0 right-0 z-40 animate-slide-up">
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 rounded-t-3xl border-b-0 cursor-pointer hover:bg-white/15 transition-colors"
            onClick={handleEventCardClick}
          >
            <CardContent className="p-4">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <span className="text-white text-lg">×</span>
              </button>

              <div className="flex gap-4">
                <ImageWithFallback
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2 pr-8">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-1 truncate">{selectedEvent.name}</h3>
                      <p className="text-white/60 text-sm truncate">{selectedEvent.location}</p>
                    </div>
                    <Badge className="gradient-primary text-white border-0 ml-2">
                      {selectedEvent.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                    <span>{selectedEvent.date}</span>
                    <span>•</span>
                    <span>{selectedEvent.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white">₹{selectedEvent.price}</span>
                    <Button
                      size="sm"
                      className="gradient-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventCardClick();
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}