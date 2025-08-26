// app/admin/sewa/page.tsx
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search as SearchIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import komponen terpisah
import NoDataIllustration from "@/components/sewa/no-data-illustration";
import { SewaDetailModal } from "@/components/sewa/sewa-detail-modal";
import { SewaPagination } from "@/components/sewa/sewa-pagination";
import { SewaListCard } from "@/components/sewa/sewa-list-card";
import { Sewa } from "@/components/sewa/sewa-types"; // Import tipe data

export default function SewaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // State untuk modal detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSewaForDetail, setSelectedSewaForDetail] = useState<Sewa | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [dataSewa, setDataSewa] = useState<Sewa[]>(() => ([
    { id: "SWH001", namaPenyewa: "Budi Santoso", barangSewa: "Kamera DSLR Canon", status: "Sedang Disewa", tanggalMulai: "2025-07-01", tanggalSelesai: "2025-07-07", alamatPengiriman: "Jl. Merdeka No. 10, Jakarta", nomorTelepon: "081234567890", totalHarga: 500000 },
    { id: "SWH002", namaPenyewa: "Siti Aminah", barangSewa: "Proyektor EPSON", status: "Selesai", tanggalMulai: "2025-06-20", tanggalSelesai: "2025-06-25", alamatPengiriman: "Jl. Sudirman No. 5, Bandung", nomorTelepon: "085678901234", totalHarga: 300000 },
    { id: "SWH003", namaPenyewa: "Joko Susilo", barangSewa: "Drone DJI Mini 3", status: "Sedang Dikirim", tanggalMulai: "2025-07-05", tanggalSelesai: "2025-07-10", alamatPengiriman: "Perumahan Indah Blok C No. 22, Surabaya", nomorTelepon: "087812345678", totalHarga: 750000 },
    { id: "SWH004", namaPenyewa: "Ani Rahayu", barangSewa: "Sound System Portable", status: "Dibatalkan", tanggalMulai: "2025-07-03", tanggalSelesai: "2025-07-06", alamatPengiriman: "Jl. Pahlawan No. 17, Semarang", nomorTelepon: "082109876543", totalHarga: 400000 },
    { id: "SWH005", namaPenyewa: "Rina Kartika", barangSewa: "Mic Wireless Set", status: "Sedang Disewa", tanggalMulai: "2025-07-08", tanggalSelesai: "2025-07-12", alamatPengiriman: "Apartemen Elit Tower B Unit 120, Yogyakarta", nomorTelepon: "081357924680", totalHarga: 200000 },
    { id: "SWH006", namaPenyewa: "Andi Wijaya", barangSewa: "Lighting RGB", status: "Sedang Dikirim", tanggalMulai: "2025-07-07", tanggalSelesai: "2025-07-11", alamatPengiriman: "Griya Makmur Sejahtera No. 8, Malang", nomorTelepon: "089642137950", totalHarga: 350000 },
    { id: "SWH007", namaPenyewa: "Diana Putri", barangSewa: "Green Screen", status: "Selesai", tanggalMulai: "2025-06-15", tanggalSelesai: "2025-06-20", alamatPengiriman: "Komplek Permai Indah No. 3, Bali", nomorTelepon: "081700998877", totalHarga: 150000 },
    // Tambahkan lebih banyak data dummy untuk menguji scrollbar
    { id: "SWH008", namaPenyewa: "Faisal Rahman", barangSewa: "Printer 3D", status: "Sedang Disewa", tanggalMulai: "2025-07-10", tanggalSelesai: "2025-07-15", alamatPengiriman: "Jl. Mawar No. 1, Jakarta", nomorTelepon: "081112233445", totalHarga: 800000 },
    { id: "SWH009", namaPenyewa: "Gita Permata", barangSewa: "Mesin Kopi", status: "Selesai", tanggalMulai: "2025-06-25", tanggalSelesai: "2025-06-28", alamatPengiriman: "Jl. Melati No. 2, Bandung", nomorTelepon: "081556677889", totalHarga: 250000 },
    { id: "SWH010", namaPenyewa: "Hendra Kusuma", barangSewa: "Vacuum Cleaner Robot", status: "Sedang Dikirim", tanggalMulai: "2025-07-12", tanggalSelesai: "2025-07-17", alamatPengiriman: "Jl. Anggrek No. 3, Surabaya", nomorTelepon: "081667788990", totalHarga: 600000 },
    { id: "SWH011", namaPenyewa: "Intan Sari", barangSewa: "Kipas Angin Besar", status: "Sedang Disewa", tanggalMulai: "2025-07-14", tanggalSelesai: "2025-07-19", alamatPengiriman: "Jl. Kenanga No. 4, Semarang", nomorTelepon: "081778899001", totalHarga: 100000 },
    { id: "SWH012", namaPenyewa: "Kevin Chandra", barangSewa: "Generator Portable", status: "Dibatalkan", tanggalMulai: "2025-07-01", tanggalSelesai: "2025-07-03", alamatPengiriman: "Jl. Dahlia No. 5, Yogyakarta", nomorTelepon: "081889900112", totalHarga: 900000 },
    { id: "SWH013", namaPenyewa: "Lia Lestari", barangSewa: "Mesin Cuci", status: "Selesai", tanggalMulai: "2025-06-05", tanggalSelesai: "2025-06-10", alamatPengiriman: "Jl. Edelweiss No. 6, Malang", nomorTelepon: "081990011223", totalHarga: 450000 },
    { id: "SWH014", namaPenyewa: "Mega Ayu", barangSewa: "TV Layar Lebar", status: "Sedang Disewa", tanggalMulai: "2025-07-16", tanggalSelesai: "2025-07-21", alamatPengiriman: "Jl. Flamboyan No. 7, Bali", nomorTelepon: "081001122334", totalHarga: 700000 },
  ]));

  const filteredData = useMemo(() => {
    let currentData = dataSewa;

    if (activeTab !== "Semua") {
      currentData = currentData.filter(sewa => sewa.status === activeTab);
    }

    if (searchTerm) {
      currentData = currentData.filter(
        (sewa) =>
          sewa.namaPenyewa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sewa.barangSewa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sewa.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return currentData;
  }, [dataSewa, searchTerm, activeTab]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const updateSewaStatus = (id: string, newStatus: Sewa['status']) => {
    setDataSewa(prevData =>
      prevData.map(sewa =>
        sewa.id === id ? { ...sewa, status: newStatus } : sewa
      )
    );
  };

  const handleKirimSekarang = (id: string) => {
    updateSewaStatus(id, "Sedang Dikirim");
  };

  const handleSelesaiDikirim = (id: string) => {
    updateSewaStatus(id, "Selesai");
  };

  const handleNonaktifSelesai = (id: string) => {
    console.log(`Attempted to non-activate completed rental ${id}, but button is disabled.`);
  };

  const handleLihatDetail = (sewa: Sewa) => {
    setSelectedSewaForDetail(sewa);
    setIsDetailModalOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar isSidebarOpen={isSidebarOpen} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Button onClick={toggleSidebar} variant="ghost" size="icon" className="text-muted-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>Penyewaan</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sewa Paket</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm p-4 md:p-6 flex flex-col">
            <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setCurrentPage(1); }} className="w-full">
              <TabsList className="grid w-full grid-cols-5 md:grid-cols-5 h-auto">
                <TabsTrigger value="Semua">Semua</TabsTrigger>
                <TabsTrigger value="Sedang Disewa">Disewa</TabsTrigger>
                <TabsTrigger value="Sedang Dikirim">Dikirim</TabsTrigger>
                <TabsTrigger value="Selesai">Selesai</TabsTrigger>
                <TabsTrigger value="Dibatalkan">Dibatalkan</TabsTrigger>
              </TabsList>

              {['Semua', 'Sedang Disewa', 'Sedang Dikirim', 'Selesai', 'Dibatalkan'].map(tabValue => (
                <TabsContent key={tabValue} value={tabValue} className="mt-1 flex-1 flex flex-col">
                  <div className="relative mb-2">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Kamu bisa cari berdasarkan Nama Penyewa, No. Sewa atau Nama Barang"
                      className="pl-9 pr-4 py-2 border rounded-md w-full focus:ring-1 focus:ring-primary focus:border-primary"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  {paginatedData.length === 0 ? (
                    <NoDataIllustration />
                  ) : (
                    <div className="flex-1 overflow-y-auto mt-1 p-4 border rounded-md bg-muted/20">
                      <h3 className="text-lg font-semibold mb-1">Daftar Sewa ({activeTab})</h3>
                      {paginatedData.map((sewa) => (
                        <SewaListCard
                          key={sewa.id}
                          sewa={sewa}
                          onKirimSekarang={handleKirimSekarang}
                          onSelesaiDikirim={handleSelesaiDikirim}
                          onLihatDetail={handleLihatDetail}
                        />
                      ))}
                    </div>
                  )}
                  {totalPages > 0 && (
                    <SewaPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                  {totalPages === 0 && searchTerm && (
                    <p className="mt-4 text-center text-muted-foreground text-sm">
                      Tidak ada hasil untuk "{searchTerm}".
                    </p>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </SidebarInset>

      <SewaDetailModal
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        sewa={selectedSewaForDetail}
      />
    </SidebarProvider>
  );
}