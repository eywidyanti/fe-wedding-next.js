"use client"; // Pastikan ini ada di baris paling atas

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
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input untuk search bar
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2, Search as SearchIcon, PlusCircle, Eye, Menu } from "lucide-react";
import React, { useState, useMemo } from "react";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dataPengguna = [
    { id: "USR001", nama: "Budi Santoso", email: "budi@example.com", role: "Admin", status: "Aktif" },
    { id: "USR002", nama: "Siti Aminah", email: "siti@example.com", role: "Editor", status: "Aktif" },
    { id: "USR003", nama: "Joko Susilo", email: "joko@example.com", role: "Pengguna", status: "Nonaktif" },
    { id: "USR004", nama: "Ani Rahayu", email: "ani@example.com", role: "Pengguna", status: "Aktif" },
    { id: "USR005", nama: "Dewi Lestari", email: "dewi@example.com", role: "Pengguna", status: "Aktif" },
    { id: "USR006", nama: "Bayu Permana", email: "bayu@example.com", role: "Admin", status: "Aktif" },
    { id: "USR007", nama: "Cindy Claudia", email: "cindy@example.com", role: "Editor", status: "Nonaktif" },
    { id: "USR008", nama: "Dian Permata", email: "dian@example.com", role: "Pengguna", status: "Aktif" },
    { id: "USR009", nama: "Eko Prasetyo", email: "eko@example.com", role: "Pengguna", status: "Aktif" },
    { id: "USR010", nama: "Fani Nurani", email: "fani@example.com", role: "Admin", status: "Aktif" },
    { id: "USR011", nama: "Gilang Ramadhan", email: "gilang@example.com", role: "Pengguna", status: "Nonaktif" },
    { id: "USR012", nama: "Hana Putri", email: "hana@example.com", role: "Editor", status: "Aktif" },
  ];

  const filteredData = useMemo(() => {
    return dataPengguna.filter(
      (user) =>
        user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataPengguna, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const pages = [];
    const maxPageButtons = 5;

    if (totalPages > 0) pages.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2) + 1);
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2) - 1);

    if (currentPage <= Math.floor(maxPageButtons / 2) + 1) {
      endPage = Math.min(totalPages - 1, maxPageButtons - 1);
    }
    if (currentPage >= totalPages - Math.floor(maxPageButtons / 2)) {
      startPage = Math.max(2, totalPages - maxPageButtons + 2);
    }

    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) pages.push("...");

    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages.map((page, index) => (
      <PaginationItem key={index}>
        {page === "..." ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink href="#" isActive={page === currentPage} onClick={() => handlePageChange(page as number)}>
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  const handleAddUser = () => {
    console.log("Tombol Tambah Pengguna diklik!");
  };
  const handleDetail = (id: string) => {
    console.log(`Melihat detail pengguna: ${id}`);
  };
  const handleEdit = (id: string) => {
    console.log(`Mengedit pengguna: ${id}`);
  };
  const handleDelete = (id: string) => {
    console.log(`Menghapus pengguna: ${id}`);
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
                  <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manajemen Pengguna</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Anda bisa mempertahankan ini jika Anda menggunakannya untuk kartu statistik atau serupa */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 text-center font-semibold">
            <div className="bg-muted/50 aspect-video rounded-xl" > Penyewaan </div>
            <div className="bg-muted/50 aspect-video rounded-xl" > Pengiriman </div>
            <div className="bg-muted/50 aspect-video rounded-xl" > Pembayaran </div>
          </div>

         
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
