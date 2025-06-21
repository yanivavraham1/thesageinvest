export default function Caption({ color = "black", text = "כותרת" }) {
  return (
    <div className="flex items-center mb-10 gap-2">
      <div className={`h-10 w-2 bg-${color} rounded-full mr-3`}></div>
      <h2 className="text-3xl font-bold">{text}</h2>
    </div>
  );
}
