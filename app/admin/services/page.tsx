"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () =>
    fetch("/api/services?all=true")
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: `"${title}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#3A3D4D",
      confirmButtonText: "Yes, delete",
      background: "#12121E",
      color: "#F0F0F5",
    });
    if (!result.isConfirmed) return;

    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
    Swal.fire({
      title: "Deleted!",
      icon: "success",
      background: "#12121E",
      color: "#F0F0F5",
      confirmButtonColor: "#00DE51",
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3">
        <div>
          <h1 className="heading-font text-[26px] lg:text-[32px] font-bold text-white leading-tight">Services</h1>
          <p className="text-xs sm:text-sm mt-0.5 text-[#888899]">
            Manage the client engineering services offered on your website
          </p>
        </div>
        <Link href="/admin/services/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Add Service
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#00DE51] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-4xl mb-3">🛠️</p>
          <h2 className="heading-font text-[18px] lg:text-[20px] font-semibold text-white mb-2">No services yet</h2>
          <p className="text-sm mb-6 text-[#888899]">
            Add your first service offering to get started.
          </p>
          <Link href="/admin/services/new" className="btn-primary">
            <FaPlus /> Add Service
          </Link>
        </div>
      ) : (
        <div className="glass-card overflow-hidden" style={{ padding: 0 }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th className="p-4 font-semibold text-white">Service Title</th>
                <th className="p-4 font-semibold text-white hidden md:table-cell">Key Tags</th>
                <th className="p-4 font-semibold text-white text-center">Status</th>
                <th className="p-4 font-semibold text-white text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium text-white max-w-xs">
                    <p className="truncate font-semibold">{service.title}</p>
                    <p className="text-xs text-white/50 truncate mt-0.5">{service.desc}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(service.tags || []).slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                        service.published !== false
                          ? "bg-[#00DE51]/15 text-[#00DE51]"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {service.published !== false ? <FaCheck className="text-[9px]" /> : <FaTimes className="text-[9px]" />}
                      {service.published !== false ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-end">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-[#00DE51]/15 text-[#00DE51] hover:bg-[#00DE51]/25 transition shadow-sm"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id!, service.title)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition shadow-sm cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
