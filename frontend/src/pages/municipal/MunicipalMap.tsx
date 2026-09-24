import {
  ArrowLeft,
  MapPin,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Dustbin = {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  status: "Available" | "Locked";
  report: string;
};

const dustbins: Dustbin[] = [
  {
    id: "BIN-IND-0001",
    location: "Vijay Nagar, Ward 12",
    latitude: 22.7533,
    longitude: 75.8937,
    status: "Locked",
    report: "CC-93D18D23",
  },
  {
    id: "BIN-IND-0002",
    location: "Palasia, Ward 8",
    latitude: 22.7256,
    longitude: 75.886,
    status: "Available",
    report: "-",
  },
  {
    id: "BIN-IND-0003",
    location: "Rau, Ward 5",
    latitude: 22.626,
    longitude: 75.804,
    status: "Available",
    report: "-",
  },
  {
    id: "BIN-IND-0004",
    location: "Bhawarkua, Ward 15",
    latitude: 22.687,
    longitude: 75.8577,
    status: "Locked",
    report: "CC-44F71C08",
  },
  {
    id: "BIN-IND-0005",
    location: "Palasia, Ward 7",
    latitude: 22.7196,
    longitude: 75.8809,
    status: "Available",
    report: "-",
  },
];

function MunicipalMap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/municipal")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Municipal Map
            </h1>

            <p className="text-sm text-gray-500">
              Monitor dustbins and active reports
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Dustbins */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Trash2
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Registered Dustbins
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  {dustbins.length}
                </p>
              </div>
            </div>
          </div>

          {/* Active Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <AlertTriangle
                  size={22}
                  className="text-orange-500"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Active Reports
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  {
                    dustbins.filter(
                      (bin) => bin.status === "Locked",
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Available Dustbins
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  {
                    dustbins.filter(
                      (bin) => bin.status === "Available",
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              Dustbin Locations
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Click a marker to view dustbin information.
            </p>
          </div>

          <div className="h-[550px]">
            <MapContainer
              center={[22.7196, 75.8577]}
              zoom={12}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {dustbins.map((bin) => (
                <Marker
                  key={bin.id}
                  position={[bin.latitude, bin.longitude]}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-bold text-gray-800">
                        {bin.id}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {bin.location}
                      </p>

                      <div className="mt-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            bin.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {bin.status}
                        </span>
                      </div>

                      {bin.report !== "-" && (
                        <p className="mt-3 text-xs font-semibold text-orange-600">
                          Active Report: {bin.report}
                        </p>
                      )}

                      {bin.report !== "-" ? (
                        <button
                          onClick={() =>
                            navigate(
                              `/municipal/reports/${bin.report}`,
                            )
                          }
                          className="mt-3 w-full rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                        >
                          View Report
                        </button>
                      ) : (
                        <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-center text-xs text-gray-500">
                          No active report
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-gray-800">
            Map Legend
          </h3>

          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-gray-600">
                Available Dustbin
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-gray-600">
                Active Report / Locked
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin
                size={16}
                className="text-gray-500"
              />

              <span className="text-gray-600">
                GPS Location
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MunicipalMap;