import { useState } from "react";
import useSalesData from "./hooks/useSalesData";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import TagsFilter from "./components/TagsFilter";
import SalesTable from "./components/SalesTable";
import Pagination from "./components/Pagination";

export default function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    ageMin: "",
    ageMax: "",
    category: "",
    tags: [],
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  });
  const [sortBy, setSortBy] = useState("date_desc");
  const [page, setPage] = useState(1);

  const { data, loading, pagination } = useSalesData(search, filters, sortBy, page);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-8">Retail Sales Dashboard</h1>

        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />

        <Filters filters={filters} setFilters={setFilters} setPage={setPage} setSortBy={setSortBy} />

        <TagsFilter filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : (
          <>
            <SalesTable data={data} />
            <Pagination page={page} setPage={setPage} pagination={pagination} />
          </>
        )}

      </div>
    </div>
  );
}
