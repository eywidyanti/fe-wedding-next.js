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
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  Pencil,
  Menu,
  User as UserIcon,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider>
      <AppSidebar isSidebarOpen={isSidebarOpen} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profil</BreadcrumbPage>
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

          {/* Container untuk profil */}
          <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm ">
            <div className="w-full flex items-center justify-between bg-white rounded-md shadow-sm px-10 py-2 mb-10">
              <h2 className="text-amber-700 font-semibold text-base mb-2 mt-2">
                Profil Pengguna
              </h2>
              <button className="text-gray-600 hover:text-gray-800">
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom 1: Foto dan status */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src="/img/bg.png"
                    alt="Foto Profil"
                    className="h-45 w-45 rounded-full object-cover border border-gray-300 shadow"
                  />
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    Operator
                  </div>
                </div>
              </div>

              {/* Kolom 2: Identitas dan Kontak */}
              <div className="flex flex-col gap-4">
                {/* Identitas */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-amber-600 font-semibold">Identitas</h3>
                    <div className="border-b border-gray-300 mt-3" />
                  </div>
                  <div className="mb-2">
                    <p className="text-xs text-muted-foreground">
                      Nama Lengkap
                    </p>
                    <p className="font-semibold text-base">Kim Jong Un</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Jenis Kelamin
                    </p>
                    <p className="font-medium">Laki-laki</p>
                  </div>
                </div>

                {/* Kontak */}
                <div className="space-y-5 mt-5">
                  <div>
                    <h3 className="text-amber-600 font-semibold">Kontak</h3>
                    <div className="border-b border-gray-300 mt-3 " />
                  </div>
                  <div className="mb-3 flex items-start gap-2">
                    <MailIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">jong@mail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <PhoneIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Handphone</p>
                      <p className="font-medium">08675673</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
