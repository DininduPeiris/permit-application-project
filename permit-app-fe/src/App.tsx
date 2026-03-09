import { useState } from "react";
import permitService from "./services/permit-service";
import { PermitApplicationRequestDto } from "./types/interfaces/requests/permit-dto";

interface Permit {
  businessName: string;
  permitType: string;
  status: string;
  createdDate: string;
}

const App = () => {
  // Create permit states
  const [citizenId, setCitizenId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [permitType, setPermitType] = useState("");
  const [createdPermitId, setCreatedPermitId] = useState("");

  // Fetch permit states
  const [permitNumId, setPermitNumId] = useState<number>();
  const [permitId, setPermitId] = useState("");
  const [permit, setPermit] = useState<Permit | null>(null);

  // Update status state
  const [status, setStatus] = useState("UNDER_REVIEW");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------- CREATE PERMIT ----------------
  const handleCreatePermit = async () => {
    if (!citizenId || !businessName || !permitType) {
      setMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    const request: PermitApplicationRequestDto = {
      citizenId: citizenId,
      businessName: businessName,
      permitType: permitType,
    };

    try {
      const response = await permitService.create(request);
      if (response.success) {
        setCreatedPermitId(response.data.citizenid);
        console.log(response.data.id)
        setPermitNumId(response.data.id);
      }
      setMessage("Permit created successfully");
    } catch {
      setMessage("Failed to create permit");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH PERMIT ----------------
  const handleFetchPermit = async () => {
    if (!permitId) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await permitService.getPermitByCitizenId(permitId);

      if (response.success) {
        const data = {
          businessName: response.data.businessname,
          permitType: response.data.permittype,
          status: response.data.permitstatus,
          createdDate: response.data.createdat,
        };

        setPermitNumId(response.data.id);

        setPermit(data);
        setStatus(data.status);
      }
    } catch {
      setMessage("Failed to fetch permit");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE STATUS ----------------
  const handleUpdateStatus = async () => {
    console.log(permitNumId)
    if (!permitNumId) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await permitService.updatePermitStatus(permitNumId, {
        status: status,
      });

      if (response.success) {
        if (permit) {
          setPermit({ ...permit, status: response.data.permitstatus });
          setMessage("Status updated successfully");
        }
      }
    } catch {
      setMessage("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow space-y-8">
        <h1 className="text-2xl font-bold">Permit Management</h1>

        {/* ---------------- CREATE PERMIT ---------------- */}
        <div className="space-y-3">
          <h2 className="font-semibold">Create Permit</h2>

          <input
            type="text"
            placeholder="Citizen ID"
            value={citizenId}
            onChange={(e) => setCitizenId(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Permit Type"
            value={permitType}
            onChange={(e) => setPermitType(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleCreatePermit}
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {createdPermitId && (
            <p className="text-green-600">
              Permit ID: <strong>{createdPermitId}</strong>
            </p>
          )}
        </div>

        {/* ---------------- FETCH PERMIT ---------------- */}
        <div className="space-y-3">
          <h2 className="font-semibold">Fetch Permit</h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Permit ID"
              value={permitId}
              onChange={(e) => setPermitId(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={handleFetchPermit}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Fetch
            </button>
          </div>
        </div>

        {/* ---------------- PERMIT DETAILS ---------------- */}
        {permit && (
          <div className="border p-4 rounded space-y-2">
            <h2 className="font-semibold">Permit Details</h2>

            <p>
              <strong>Business Name:</strong> {permit.businessName}
            </p>

            <p>
              <strong>Permit Type:</strong> {permit.permitType}
            </p>

            <p>
              <strong>Status:</strong> {permit.status}
            </p>

            <p>
              <strong>Created Date:</strong> {permit.createdDate}
            </p>
          </div>
        )}

        {/* ---------------- UPDATE STATUS ---------------- */}
        {permit && (
          <div className="space-y-3">
            <h2 className="font-semibold">Update Permit Status</h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            <button
              onClick={handleUpdateStatus}
              className="bg-green-500 text-white w-full py-2 rounded"
            >
              Update Status
            </button>
          </div>
        )}

        {message && <p className="text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default App;
