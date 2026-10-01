"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaCogs } from "react-icons/fa";
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
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#78716C",
      confirmButtonText: "Yes, delete",
      background: "#FAF6EC",
      color: "#191712",
    });
    if (!result.isConfirmed) return;

    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s.id !== id));
    Swal.fire({
      title: "Deleted!",
      icon: "success",
      background: "#FAF6EC",
      color: "#191712",
      confirmButtonColor: "#191712",
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b-2 border-[#191712]">
        <div>
          <p className="retro-eyebrow !mb-1">CONSULTING &amp; TIERS</p>
          <h1 className="font-script font-bold text-3xl sm:text-4xl text-[#191712] leading-tight">
            Client <span className="marked">Services</span>
          </h1>
          <p className="font-hand text-base text-[#57534E] mt-0.5">
            Manage the client engineering services and consulting tiers offered on your website
          </p>
        </div>
        <Link href="/admin/services/new" className="btn-primary self-start sm:self-auto">
          <FaPlus /> Add Service
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#191712] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-typewriter text-xs text-[#78716C]">LOADING SERVICES...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 hand-box bg-[#FFFFFF]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-[#191712] bg-[#FFE45E] flex items-center justify-center shadow-[2px_2px_0px_#191712]">
            <FaCogs className="text-2xl text-[#191712]" />
          </div>
          <h2 className="font-script font-bold text-2xl text-[#191712] mb-1">No services yet</h2>
          <p className="font-hand text-base mb-6 text-[#57534E]">
            Add your first service offering to get started.
          </p>
          <Link href="/admin/services/new" className="btn-primary">
            <FaPlus /> Add Service
          </Link>
        </div>
      ) : (
        <div className="hand-box overflow-hidden bg-[#FFFFFF] p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#FAF7EE] border-b-2 border-[#191712]">
                  <th className="p-4 font-typewriter font-bold text-xs uppercase tracking-wider text-[#191712]">Service &amp; Category</th>
                  <th className="p-4 font-typewriter font-bold text-xs uppercase tracking-wider text-[#191712] hidden md:table-cell">Deliverables &amp; Details</th>
                  <th className="p-4 font-typewriter font-bold text-xs uppercase tracking-wider text-[#191712] hidden sm:table-cell text-center">Badge</th>
                  <th className="p-4 font-typewriter font-bold text-xs uppercase tracking-wider text-[#191712] text-center">Status</th>
                  <th className="p-4 font-typewriter font-bold text-xs uppercase tracking-wider text-[#191712] text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-[#191712]/15 hover:bg-[#FAF7EE]/60 transition-colors">
                    <td className="p-4 font-medium text-[#191712] max-w-xs">
                      <span className="font-typewriter text-[10px] text-[#C2410C] font-bold uppercase tracking-wider block">
                        {service.kicker || "SERVICE"}
                      </span>
                      <p className="font-script font-bold text-2xl text-[#191712] leading-tight mt-0.5">{service.title}</p>
                      <p className="font-hand text-sm text-[#57534E] line-clamp-2 mt-1">{service.desc}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell max-w-sm">
                      <p className="font-hand text-sm text-[#191712] font-bold">
                        {service.deliverables || (service.features && service.features.length > 0 ? service.features.slice(0, 2).join(" · ") : "—")}
                      </p>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-center">
                      {service.ribbon ? (
                        <span className="font-typewriter text-[10px] px-2 py-0.5 rounded bg-[#FFE45E] text-[#191712] border border-[#191712] font-bold shadow-[1px_1px_0px_#191712]">
                          ★ {service.ribbon}
                        </span>
                      ) : (
                        <span className="text-[#A8A29E] font-hand text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 font-typewriter text-[11px] px-2.5 py-0.5 rounded font-bold border border-[#191712] shadow-[1px_1px_0px_#191712] ${
                          service.published !== false
                            ? "bg-[#DCFCE7] text-[#15803D]"
                            : "bg-[#E7E5E4] text-[#78716C]"
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
                          className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FAF7EE] hover:bg-[#FFE45E] text-[#191712] flex items-center justify-center transition shadow-[2px_2px_0px_#191712]"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(service.id!, service.title)}
                          className="w-9 h-9 rounded border-2 border-[#191712] bg-[#FEE2E2] hover:bg-[#FECACA] text-[#DC2626] flex items-center justify-center transition shadow-[2px_2px_0px_#191712] cursor-pointer"
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
        </div>
      )}
    </div>
  );
}
