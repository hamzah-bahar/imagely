export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <span className="sr-only">Loading...</span>
      <img src="spinning-circle.gif" alt="spinning circle" height="30px" />
    </div>
  );
}
