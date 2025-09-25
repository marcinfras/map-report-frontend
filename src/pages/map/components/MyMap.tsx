import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Box, Card, useTheme } from "@mui/material";
import { createCustomIcon } from "../../../helpers/helpers";
import { usePinsStore } from "../../../store/pinsStore";
import { useQuery } from "@tanstack/react-query";
import { useSelectedPinType } from "../../../hooks/useSelectedPinType";
import { getPins } from "../actions";
import { useSelectedPinId } from "../../../hooks/useSelectedPinId";

const MapClickHandler = () => {
  const { setIsAddPinModalOpen, setNewPinCoords } = usePinsStore();

  useMapEvents({
    click(e) {
      setNewPinCoords(e.latlng);
      setIsAddPinModalOpen(true);
    },
  });

  return null;
};

const CenterMapOnPin = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  map.flyTo([lat, lng], map.getZoom() < 14 ? 14 : map.getZoom(), {
    duration: 0.25,
  });
  return null;
};

export const MyMap = () => {
  const theme = useTheme();

  const { selectedPinType } = useSelectedPinType();
  const { setSelectedPinId, selectedPinId } = useSelectedPinId();
  const { setIsPinDetailsModalOpen } = usePinsStore();

  const { data: pins } = useQuery({
    queryKey: ["pins", selectedPinType],
    queryFn: () => getPins(selectedPinType),
  });

  const selectedPin = pins?.find((p) => p.id === selectedPinId);

  return (
    <Box sx={{ mb: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 384, md: 500 },
            minHeight: 400,
            borderRadius: 2,
          }}
        >
          <MapContainer
            center={[52.2297, 21.0122]}
            zoom={14}
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <MapClickHandler />
            {selectedPin && (
              <CenterMapOnPin
                lat={selectedPin.coordinates.lat}
                lng={selectedPin.coordinates.lng}
              />
            )}
            {pins?.map((pin) => (
              <Marker
                key={pin.id}
                position={[pin.coordinates.lat, pin.coordinates.lng]}
                icon={createCustomIcon(pin.type, theme)}
                eventHandlers={{
                  click: () => {
                    setSelectedPinId(pin.id);
                    setIsPinDetailsModalOpen(true);
                  },
                }}
              ></Marker>
            ))}
          </MapContainer>
        </Box>
      </Card>
    </Box>
  );
};
