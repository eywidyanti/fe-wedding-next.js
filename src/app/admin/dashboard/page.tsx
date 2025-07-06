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
          {/* Anda bisa mempertahankan ini jika Anda menggunakannya untuk kartu statistik atau serupa
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}

          {/* Container untuk Tabel */}
          <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold">Daftar Pengguna</h2>
              <Button
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all"
              >
                <PlusCircle className="h-5 w-5" />
                Tambah Pengguna
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari pengguna..."
                className="pl-9 pr-4 py-2 border rounded-md w-full max-w-sm focus:ring-1 focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset ke halaman 1 setiap kali mencari
                }}
              />
            </div>

            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tl-md"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider rounded-tr-md"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedData.length > 0 ? (
                    paginatedData.map((pengguna) => (
                      <tr
                        key={pengguna.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {pengguna.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {pengguna.nama}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {pengguna.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {pengguna.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              pengguna.status === "Aktif"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {pengguna.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center space-x-1 md:space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors"
                            onClick={() => handleDetail(pengguna.id)}
                            title="Detail"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Detail</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-600 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-900 transition-colors"
                            onClick={() => handleEdit(pengguna.id)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 transition-colors"
                            onClick={() => handleDelete(pengguna.id)}
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-muted-foreground text-lg"
                      >
                        {searchTerm
                          ? `Tidak ada hasil untuk "${searchTerm}".`
                          : "Tidak ada data ditemukan."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
            {totalPages === 0 && searchTerm && (
              <p className="mt-4 text-center text-muted-foreground text-sm">
                Tidak ada hasil untuk "{searchTerm}".
              </p>
            )}
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}
