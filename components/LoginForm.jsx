export default function LoginForm() {
  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-md px-6 py-8">
          <h1 className="text-xl font-semibold mb-4 text-center text-gray-900">
            Sign in to your account
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                required
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
