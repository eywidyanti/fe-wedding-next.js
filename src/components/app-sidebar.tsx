// components/app-sidebar.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  ReceiptText,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type AppSidebarProps = {
  isSidebarOpen: boolean;
} & React.ComponentProps<"div">;

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://placehold.co/32x32/cccccc/333333?text=AV",
  },
  teams: [
    {
      name: "Littlemee.Deco",
      logo: "/img/logo.png",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      // isActive tidak lagi statis di sini, akan ditentukan secara dinamis
      items: [],
      hideArrow: true,
    },
    {
      title: "Kelola Data",
      url: "#", // url untuk induk tetap '#'
      icon: Settings2,
      items: [
        { title: "Pengguna", url: "/admin/pengguna" }, // Sesuaikan URL dengan halaman pengguna yang benar
        { title: "Paket Dekorasi", url: "/admin/paket" },
        { title: "Kustom Dekorasi", url: "/admin/kustom" },
        { title: "Galeri", url: "/admin/galeri" },
      ],
    },
    {
      title: "Penyewaan",
      url: "#",
      icon: ReceiptText,
      items: [
        { title: "Sewa Paket", url: "/admin/sewa" },
        { title: "Laporan", url: "/admin/laporan" },
      ],
    },
  ],
};

export function AppSidebar({ isSidebarOpen, ...props }: AppSidebarProps) {
  const pathname = usePathname(); // <--- Dapatkan path saat ini
  const backgroundImage = "/img/bg.png";

  const [openSubmenus, setOpenSubmenus] = React.useState<{
    [key: string]: boolean;
  }>({}); // Inisialisasi kosong atau dengan logika default

  // Efek untuk membuka submenu secara otomatis berdasarkan URL
  React.useEffect(() => {
    const newOpenSubmenus: { [key: string]: boolean } = {};
    data.navMain.forEach((mainItem) => {
      // Periksa apakah item utama itu sendiri cocok dengan pathname
      if (mainItem.url !== "#" && pathname.startsWith(mainItem.url)) {
        newOpenSubmenus[mainItem.title] = true;
      }
      // Periksa apakah ada sub-item yang cocok
      if (mainItem.items && mainItem.items.length > 0) {
        const hasActiveSubItem = mainItem.items.some((subItem) =>
          pathname.startsWith(subItem.url)
        );
        if (hasActiveSubItem) {
          newOpenSubmenus[mainItem.title] = true;
        }
      }
    });
    setOpenSubmenus(newOpenSubmenus);
  }, [pathname]); // Jalankan efek ini setiap kali pathname berubah

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Fungsi helper untuk memeriksa apakah sebuah URL aktif
  const isActiveLink = (url: string) => {
    // Menggunakan startsWith agar "/admin/pengguna" cocok dengan "/admin/pengguna/detail" juga jika ada
    if (url === "/admin/dashboard") {
      // Untuk dashboard, pastikan itu adalah match eksak atau hanya dimulai dengan "/admin/dashboard"
      return pathname === url;
    }
    return pathname.startsWith(url);
  };

  return (
    <div
      className={`relative h-screen transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      {...props}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />
      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Logo */}
        <div className="flex items-center justify-start p-2 border-b border-white/20 ">
          <div className="flex items-center gap-0">
            <img src={data.teams[0].logo} alt="Logo" className="h-13 w-13" />
            {isSidebarOpen && (
              <span className="font-semibold text-lg">
                {data.teams[0].name}
              </span>
            )}
          </div>
        </div>

        {/* konten */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {data.navMain.map((item) => (
              <div key={item.title}>
                {item.items && item.items.length > 0 ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    // Kelas aktif untuk menu utama yang memiliki submenu
                    className={`flex items-center justify-between w-full p-2 rounded-md transition-colors ${
                      openSubmenus[item.title] || item.items.some(subItem => isActiveLink(subItem.url))
                        ? "bg-white/10" // Aktif jika submenu terbuka atau ada sub-item aktif
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <item.icon className="h-5 w-5 text-white" />
                      )}
                      {isSidebarOpen && (
                        <span className="text-white">{item.title}</span>
                      )}
                    </div>
                    {isSidebarOpen && (
                      <ChevronDown
                        className={`h-4 w-4 text-white transition-transform duration-200 ${
                          openSubmenus[item.title] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <a
                    href={item.url}
                    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                      isActiveLink(item.url) // <-- Menggunakan fungsi isActiveLink
                        ? "bg-white/10"
                        : "hover:bg-white/10"
                    }`}
                  >
                    {item.icon && <item.icon className="h-5 w-5 text-white" />}
                    {isSidebarOpen && (
                      <span className="text-white">{item.title}</span>
                    )}
                  </a>
                )}
                {item.items &&
                  item.items.length > 0 &&
                  openSubmenus[item.title] &&
                  isSidebarOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className={`flex items-center gap-2 p-2 rounded-md text-white transition-colors ${
                            isActiveLink(subItem.url) // <-- Menggunakan fungsi isActiveLink
                              ? "bg-white/10"
                              : "hover:bg-white/10"
                          }`}
                        >
                          <span>{subItem.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </div>

        {/* footer */}
        <div className="flex-shrink-0 p-4 border-t border-white/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 w-full focus:outline-none">
                <img
                  src={data.user.avatar}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
                {isSidebarOpen && (
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-white">
                      {data.user.name}
                    </span>
                    <span className="text-xs text-white/80">
                      {data.user.email}
                    </span>
                  </div>
                )}
                <ChevronsUpDown className="ml-auto size-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isSidebarOpen ? "right" : "top"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-2">
                <div className="text-sm font-medium">{data.user.name}</div>
                <div className="text-xs text-gray-500">{data.user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/admin/profil" className="w-full">
                  Profil
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/login" className="w-full text-red-600">
                  Logout
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}