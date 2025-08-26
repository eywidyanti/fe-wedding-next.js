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
import {
  Menu,
  DollarSign,
  Users,
  Package,
  Clock,
  Pencil,
  PlusCircle,
  CalendarCheck,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const stats = [
    {
      title: "Total Sewa Aktif",
      value: "15",
      description: "+3 dalam 24 jam terakhir",
      icon: <CalendarCheck className="h-4 w-4 text-muted-foreground" />,
      progress: 75,
    },
    {
      title: "Penyewa Baru",
      value: "5",
      description: "+2 kemarin",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      progress: 60,
    },
    {
      title: "Barang Tersedia",
      value: "120",
      description: "-5 dari bulan lalu",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      progress: 80,
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 15.000.000",
      description: "+10% dari bulan lalu",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      progress: 90,
    },
  ];

  const recentActivities = [
    {
      id: "ACT001",
      user: { name: "Aditya Pratama", avatar: "/avatars/01.png" },
      action: "Memulai sewa",
      itemName: "Kamera Sony A7 III",
      time: "2 jam lalu",
      status: "Berhasil",
      icon: <CalendarCheck className="h-4 w-4 text-green-500" />,
    },
    {
      id: "ACT002",
      user: { name: "Bella Sari", avatar: "/avatars/02.png" },
      action: "Mengakhiri sewa",
      itemName: "Drone DJI Mavic Air 2",
      time: "5 jam lalu",
      status: "Selesai",
      icon: <Clock className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "ACT003",
      user: { name: "Candra Wijaya", avatar: "/avatars/03.png" },
      action: "Memperbarui info",
      itemName: "Profil Pengguna",
      time: "1 hari lalu",
      status: "Berhasil",
      icon: <Pencil className="h-4 w-4 text-yellow-500" />,
    },
    {
      id: "ACT004",
      user: { name: "Dina Fitri", avatar: "/avatars/04.png" },
      action: "Membatalkan sewa",
      itemName: "Lensa Sigma 24-70mm",
      time: "2 hari lalu",
      status: "Dibatalkan",
      icon: <XCircle className="h-4 w-4 text-red-500" />,
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar isSidebarOpen={isSidebarOpen} />
      {/* Perbaikan di sini: Tambahkan 'flex flex-col min-h-screen' */}
      <SidebarInset className="flex flex-col min-h-screen">
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
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Perbaikan di sini: Tambahkan 'flex-1' */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, Admin!</h1>
            <p className="text-muted-foreground text-lg">
              Ringkasan aktivitas platform Anda hari ini.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                  {stat.progress && (
                    <Progress value={stat.progress} className="h-2 mt-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Tren Penyewaan Bulanan</CardTitle>
                <CardDescription>
                  Grafik menunjukkan jumlah sewa per bulan.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Grafik akan tampil di sini</p>
              </CardContent>
            </Card>
            <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Aktivitas terkini pada platform Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Aktivitas</TableHead>
                    <TableHead className="text-right">Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">
                        {activity.user.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {activity.icon}
                          <span>{activity.action} <span className="font-semibold">{activity.itemName}</span></span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {activity.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full">Lihat Semua Aktivitas</Button>
            </CardFooter>
          </Card>
          </div>

          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}