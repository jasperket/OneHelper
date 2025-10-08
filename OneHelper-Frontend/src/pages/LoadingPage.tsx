import UnAuthHeader from "@/components/layout/UnAuthHeader";

export default function LoadingPage() {
  return (
    <UnAuthHeader>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-green-950 text-white">
        {/* Background image similar to homepage */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/775091/pexels-photo-775091.jpeg')",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-orange-900 opacity-60"></div>

        {/* Loading content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col items-center justify-center">
            {/* Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-orange-500"></div>

            {/* Text */}
            <h1 className="mt-6 text-center text-3xl font-bold">
              Loading your OneHelper experience...
            </h1>
            <p className="mt-2 text-center text-lg text-gray-200">
              Please wait while we prepare everything for you.
            </p>
          </div>
        </div>
      </div>
    </UnAuthHeader>
  );
}
