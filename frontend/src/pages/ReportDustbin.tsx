import { Camera, MapPin, ArrowLeft } from "lucide-react";

function ReportDustbin() {
  return (
    <div className="min-h-screen bg-[#f7faf7]">

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Report a Dustbin
            </h1>
            <p className="text-xs text-gray-500">
              Help keep your city clean
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-8">

        {/* Information */}
        <div className="rounded-2xl bg-green-50 p-5">
          <h2 className="font-semibold text-green-800">
            📸 Take a current photo
          </h2>

          <p className="mt-1 text-sm leading-6 text-green-700">
            Capture the dustbin clearly so the municipal team can
            verify and respond to your report.
          </p>
        </div>

        {/* Photo Upload */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-800">
            Dustbin Photo
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload a clear photo of the dustbin.
          </p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50 px-6 py-12 transition hover:bg-green-100">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <Camera size={30} className="text-green-600" />
            </div>

            <p className="mt-4 font-semibold text-gray-700">
              Take Photo
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Use your phone camera
            </p>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </label>

        </div>

        {/* Location */}
        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <MapPin size={23} className="text-orange-500" />
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                Your Location
              </h2>

              <p className="text-sm text-gray-500">
                Location is captured only when you submit.
              </p>
            </div>
          </div>

          <button className="mt-5 w-full rounded-xl border border-green-200 bg-green-50 py-3 font-semibold text-green-700 hover:bg-green-100">
            📍 Use My Current Location
          </button>

        </div>

        {/* Submit */}
        <button className="mt-6 w-full rounded-xl bg-green-600 py-4 font-semibold text-white shadow-sm transition hover:bg-green-700">
          Submit Dustbin Report
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          Your location is used only for this report.
        </p>

      </main>
    </div>
  );
}

export default ReportDustbin;