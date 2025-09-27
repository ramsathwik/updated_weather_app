function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
      >
        Go Home
      </a>
    </div>
  );
}
export default PageNotFound;
