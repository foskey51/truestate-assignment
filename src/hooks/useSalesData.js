import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import axios from "axios";
import dummyData from "../data/dummySales.json";

const API_URL = "http://localhost:5000/api/sales";
const PAGE_SIZE = 10;

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
          limit: PAGE_SIZE,
          sortBy,
          regions: filters.regions.join(",") || undefined,
          genders: filters.genders.join(",") || undefined,
          ageMin: filters.ageMin || undefined,
          ageMax: filters.ageMax || undefined,
          categories: filters.categories.join(",") || undefined,
          tags: filters.tags.join(",") || undefined,
          paymentMethods: filters.paymentMethods.join(",") || undefined,
          dateFrom: filters.dateFrom || undefined,
          dateTo: filters.dateTo || undefined,
        };

        const res = await axios.get(API_URL, { params });

        setData(res.data.data || []);
        setPagination(
          res.data.pagination || {
            total: res.data.data?.length || 0,
            totalPages: 1,
          }
        );
      } catch (err) {
        console.warn("Backend offline → using dummy data");

        const fuse = new Fuse(dummyData, {
          keys: ["customerName", "phoneNumber"],
          threshold: 0.3,
        });

        let result = search ? fuse.search(search).map((r) => r.item) : [...dummyData];

        if (filters.regions.length > 0) {
          result = result.filter((r) =>
            filters.regions.includes(r.customerRegion)
          );
        }

        // Genders
        if (filters.genders.length > 0) {
          result = result.filter((r) =>
            filters.genders.includes(r.gender)
          );
        }

        // Age range
        if (filters.ageMin !== "") {
          const min = Number(filters.ageMin);
          result = result.filter((r) => r.age >= min);
        }
        if (filters.ageMax !== "") {
          const max = Number(filters.ageMax);
          result = result.filter((r) => r.age <= max);
        }

        // Product categories
        if (filters.categories.length > 0) {
          result = result.filter((r) =>
            filters.categories.includes(r.productCategory)
          );
        }

        // Payment methods 
        if (filters.paymentMethods.length > 0) {
          result = result.filter((r) =>
            filters.paymentMethods.includes(r.paymentMethod)
          );
        }

        // Date range
        if (filters.dateFrom) {
          const from = new Date(filters.dateFrom);
          result = result.filter((r) => new Date(r.date) >= from);
        }
        if (filters.dateTo) {
          const to = new Date(filters.dateTo);
          result = result.filter((r) => new Date(r.date) <= to);
        }

        // Tags 
        if (filters.tags.length > 0) {
          result = result.filter((r) =>
            Array.isArray(r.tags) &&
            filters.tags.every((t) => r.tags.includes(t))
          );
        }

        if (sortBy === "quantity_desc") {
          result.sort((a, b) => b.quantity - a.quantity);
        } else if (sortBy === "customer_asc") {
          result.sort((a, b) =>
            a.customerName.localeCompare(b.customerName)
          );
        } else {
          result.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        }

        const start = (page - 1) * PAGE_SIZE;
        const paginated = result.slice(start, start + PAGE_SIZE);

        setData(paginated);
        setPagination({
          total: result.length,
          totalPages: Math.max(1, Math.ceil(result.length / PAGE_SIZE)),
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [search, filters, sortBy, page]);

  return { data, loading, pagination };
}
