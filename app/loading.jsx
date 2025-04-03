export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-accent border-opacity-20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
