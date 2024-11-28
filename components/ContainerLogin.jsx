export default function Container({ children }) {
  return (
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
      {children}
    </div>
  );
}
