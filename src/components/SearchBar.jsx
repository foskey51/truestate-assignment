export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search data... (powered by Fuse.js)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 mb-6 rounded-lg border border-gray-400 text-black placeholder-gray-600"
    />
  );
}
