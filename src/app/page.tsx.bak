import Link from "next/link";

// Deployed with enhanced Wordle solver features
const games = [
  {
    id: "e-digits",
    name: "e-Digits Memory",
    description: "Test your memory by reciting digits of Euler's number (e). How many can you remember?",
    href: "/games/e-digits",
    status: "ready",
  },
  {
    id: "wordle-solver",
    name: "Wordle Solver",
    description: "A tool to help solve Wordle puzzles with intelligent filtering and today's Wordle word.",
    href: "/games/wordle-solver",
    status: "ready",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Game Hub</h1>
        <p className="text-xl text-gray-300">Choose a game to play</p>
      </div>

      <div className="grid gap-6 max-w-2xl w-full">
        {games.map((game) => (
          <div key={game.id}>
            {game.status === "ready" ? (
              <Link
                href={game.href}
                className="block p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {game.name}
                    </h2>
                    <p className="text-gray-300 mt-2">{game.description}</p>
                  </div>
                  <span className="text-2xl text-white group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ) : (
              <div className="block p-6 bg-white/5 rounded-xl border border-white/10 cursor-not-allowed">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-500">
                      {game.name}
                    </h2>
                    <p className="text-gray-600 mt-2">{game.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-gray-400 text-sm rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
