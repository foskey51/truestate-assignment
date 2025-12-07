const REGION_OPTIONS = ["North", "South", "East", "West"];
const GENDER_OPTIONS = ["Male", "Female"];
const CATEGORY_OPTIONS = [
  "Electronics",
  "Clothing",
  "Home Appliances",
  "Home",
];
const PAYMENT_OPTIONS = [
  "UPI",
  "Credit Card",
  "Debit Card",
  "Cash",
  "Net Banking",
  "Wallet",
];

export default function Filters({ filters, setFilters, sortBy, setSortBy, setPage }) {
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      const nextArr = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: nextArr };
    });
    setPage(1);
  };

  const updateField = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="mb-6 space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <div className="text-sm font-semibold mb-1">Customer Region</div>
          <div className="flex flex-wrap gap-2">
            {REGION_OPTIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => toggleArrayFilter("regions", region)}
                className={`px-3 py-1 rounded-full text-xs md:text-sm border transition ${
                  filters.regions.includes(region)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Genders */}
        <div>
          <div className="text-sm font-semibold mb-1">Gender</div>
          <div className="flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleArrayFilter("genders", g)}
                className={`px-3 py-1 rounded-full text-xs md:text-sm border transition ${
                  filters.genders.includes(g)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Age Range */}
        <div>
          <div className="text-sm font-semibold mb-1">Age Range</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin}
              onChange={(e) => updateField("ageMin", e.target.value)}
              className="w-24 p-2 rounded border border-gray-300 text-sm"
            />
            <span>–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax}
              onChange={(e) => updateField("ageMax", e.target.value)}
              className="w-24 p-2 rounded border border-gray-300 text-sm"
            />
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <div className="text-sm font-semibold mb-1">Product Category</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleArrayFilter("categories", c)}
                className={`px-3 py-1 rounded-full text-xs md:text-sm border transition ${
                  filters.categories.includes(c)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Payment Methods */}
        <div>
          <div className="text-sm font-semibold mb-1">Payment Method</div>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_OPTIONS.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => toggleArrayFilter("paymentMethods", pm)}
                className={`px-3 py-1 rounded-full text-xs md:text-sm border transition ${
                  filters.paymentMethods.includes(pm)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div>
          <div className="text-sm font-semibold mb-1">Date Range</div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateField("dateFrom", e.target.value)}
              className="p-2 rounded border border-gray-300 text-sm"
            />
            <span>–</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateField("dateTo", e.target.value)}
              className="p-2 rounded border border-gray-300 text-sm"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <div className="text-sm font-semibold mb-1">Sort By</div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 text-sm"
          >
            <option value="date_desc">Date – Newest First</option>
            <option value="quantity_desc">Quantity – Highest First</option>
            <option value="customer_asc">Customer – A to Z</option>
          </select>
        </div>

      </div>

    </div>
  );
}
