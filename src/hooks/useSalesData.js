import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import axios from "axios";
import dummyData from "../data/dummySales.json";

const API_URL = "http://localhost:5000/api/sales";

export default function useSalesData(search, filters, sortBy, page) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const params = {
          search,
          page,
          limit: 10,
          sortBy,
          ...filters,
          tags: filters.tags.join(","),
        };

        const res = await axios.get(API_URL, { params });

        setData(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        console.warn("Backend offline → Using dummy data");

        const fuse = new Fuse(dummyData, {
          keys: ["customerName", "phoneNumber"],
          threshold: 0.3,
        });

        let result = search ? fuse.search(search).map(r => r.item) : dummyData;

        // Apply sample filters
        if (filters.region) result = result.filter(r => r.customerRegion === filters.region);
        if (filters.gender) result = result.filter(r => r.gender === filters.gender);

        const start = (page - 1) * 10;
        const paginated = result.slice(start, start + 10);

        setData(paginated);
        setPagination({
          total: result.length,
          totalPages: Math.ceil(result.length / 10),
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [search, filters, sortBy, page]);

  return { data, loading, pagination };
}
