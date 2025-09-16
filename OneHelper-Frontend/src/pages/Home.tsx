import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="z-10 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-gray-50 px-8">
          <div className="paytoneOne text-[35px] font-bold">
            <span className="text-orange-500">One</span>
            <span className="text-green-600">Helper</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="username"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="password"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <Button className="cursor-pointer rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
              Log in
            </Button>
            <Button className="cursor-pointer rounded-full bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-700">
              Sign-up
            </Button>
          </div>
        </header>

        {/* Hero Section with background image */}
        <section
          className="relative flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/775091/pexels-photo-775091.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-orange-900 opacity-50"></div>
          {/* Content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center py-16">
            <h1 className="text-center text-[85px] leading-tight font-bold text-white">
              Your All-In-One
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
                Digital Assistant
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-[25px] text-white">
              Streamline your daily tasks, boost productivity, and get things
              done faster with OneHelper – the intelligent assistant that adapts
              to your workflow.
            </p>
          </div>
        </section>

        {/* Bottom Section with solid color */}
        <section className="flex flex-1 flex-col items-center bg-green-950 px-4 py-12">
          <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex transform cursor-pointer flex-col items-center rounded-lg bg-[#1E0901] p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(255,165,0,0.4)]">
              <div className="mb-4 text-3xl">📅</div>
              <h2 className="mb-2 text-2xl font-bold">Schedule</h2>
              <p>
                Streamline your daily tasks, boost productivity, and get things
                done faster with OneHelper – the intelligent assistant that
                adapts to your workflow.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex transform cursor-pointer flex-col items-center rounded-lg bg-[#1E0901] p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(255,165,0,0.4)]">
              <div className="mb-4 text-3xl">🛌</div>
              <h2 className="mb-2 text-2xl font-bold">Sleep</h2>
              <p>
                Track your sleep patterns and improve your rest with OneHelper’s
                smart sleep tracker.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex transform cursor-pointer flex-col items-center rounded-lg bg-[#1E0901] p-8 text-white transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(255,165,0,0.4)]">
              <div className="mb-4 text-3xl">📝</div>
              <h2 className="mb-2 text-2xl font-bold">Plan</h2>
              <p>
                Organize your day and plan ahead efficiently using OneHelper’s
                planning tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
