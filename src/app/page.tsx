"use client"; // Diperlukan untuk useState, useEffect, dan event listener untuk navbar

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { Eye, ShoppingCart } from "lucide-react"; // Ikon yang diperlukan

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk menu mobile

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useInView hook untuk animasi elemen saat terlihat
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [dekorasiRef, dekorasiInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // PERBAIKAN: Mengembalikan galleryRef untuk bagian Galeri yang terpisah
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // TAMBAHAN: useInView untuk Custom Dekorasi
  const [customDekorasiRef, customDekorasiInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Fungsi placeholder untuk aksi keranjang (Anda akan implementasikan ini nanti)
  const handleAddToCart = (itemName: string, price: string) => {
    alert(`Menambahkan "${itemName}" (${price}) ke keranjang Anda!`);
    // Di sini Anda bisa menambahkan logika untuk menambahkan ke state keranjang, API, dll.
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 antialiased font-poppins">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className={`text-2xl font-playfair-display font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Littlemee Decoration
            </Link>
          </div>
          <div className="space-x-8 hidden md:flex">
            <Link
              href="#tentang"
              className={`font-medium ${
                isScrolled ? "text-gray-600" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Tentang Kami
            </Link>
            <Link
              href="#layanan"
              className={`font-medium ${
                isScrolled ? "text-gray-600" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Layanan
            </Link>
            <Link
              href="#dekorasi"
              className={`font-medium ${
                isScrolled ? "text-gray-600" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Paket Dekorasi
            </Link>
            {/* TAMBAHAN: Link untuk Custom Dekorasi */}
            <Link
              href="#custom-dekorasi"
              className={`font-medium ${
                isScrolled ? "text-gray-600" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Custom Dekorasi
            </Link>
            {/* PERBAIKAN: Tambahkan kembali link untuk Galeri */}
            <Link
              href="#galeri"
              className={`font-medium ${
                isScrolled ? "text-gray-600" : "text-white"
              } hover:text-amber-600 transition-colors`}
            >
              Galeri
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-gray-600 ${
                isScrolled ? "text-gray-600" : "text-white"
              } focus:outline-none`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden bg-white shadow-lg py-4 transition-all duration-300 ${
              isScrolled ? "border-t border-gray-200" : ""
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <Link
                href="#tentang"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-amber-600 font-medium"
              >
                Tentang Kami
              </Link>
              <Link
                href="#layanan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-amber-600 font-medium"
              >
                Layanan
              </Link>
              <Link
                href="#dekorasi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-amber-600 font-medium"
              >
                Paket Dekorasi
              </Link>
              {/* TAMBAHAN: Link untuk Custom Dekorasi di mobile */}
              <Link
                href="#custom-dekorasi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-amber-600 font-medium"
              >
                Custom Dekorasi
              </Link>
              {/* PERBAIKAN: Tambahkan kembali link untuk Galeri di mobile */}
              <Link
                href="#galeri"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-amber-600 font-medium"
              >
                Galeri
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[88vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/img/bg.png" 
          alt="Background Pernikahan Indah"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
          className="absolute inset-0 z-0 brightness-[.5]"
        />
        <div className="relative z-30 p-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-playfair-display font-extrabold leading-tight mb-4 drop-shadow-xl animate-fade-in-up">
            Ciptakan Pernikahan Impian Anda
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 drop-shadow-md animate-fade-in-up delay-200">
            Kami mengubah setiap detail menjadi kenangan indah yang abadi.
          </p>
          <Link
            href="/register"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
          >
            Daftar Sekarang
          </Link>
        </div>
        {/* SVG Wave Effect */}
        <div className="absolute bottom-[-100px] left-0 w-full z-20">
          <svg
            className="block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320" // Sesuaikan viewBox dengan SVG Anda yang baru dari Haikei
          >
            <path
              fill="#fafaf9" // Pastikan ini cocok dengan bg-neutral-50
              fillOpacity="1"
              // D-value gelombang yang lebih halus dan lebih kecil
              d="M0,200L48,195C96,190,192,180,288,185C384,190,480,205,576,200C672,195,768,180,864,175C960,170,1056,175,1152,180C1248,185,1344,190,1392,195L1440,200L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Bagian Tentang Kami */}
      <section id="tentang" ref={aboutRef} className="py-24 bg-neutral-50">
        <div
          className={`container mx-auto px-8 max-w-5xl text-center transition-opacity duration-1000 ${
            aboutInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-playfair-display font-bold text-gray-800 mb-6">
            Tentang Kami
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
            Littlemee Decoration berawal dari passion kami dalam merangkai keindahan
            dan mewujudkan impian. Setiap pernikahan adalah kanvas unik bagi
            kami, di mana kami menuangkan kreativitas dan detail yang mendalam
            untuk menciptakan atmosfer yang sempurna dan personal.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Berlokasi di hati kota Malang, Jawa Timur, kami berkomitmen untuk
            memberikan pengalaman dekorasi yang tak terlupakan, mulai dari
            konsep awal hingga eksekusi yang sempurna di hari bahagia Anda.
          </p>
        </div>
      </section>

      {/* Bagian Layanan */}
      <section
        id="layanan"
        ref={servicesRef}
        className="py-24 bg-gradient-to-br from-neutral-100 to-white"
      >
        <div className="container mx-auto px-8 max-w-6xl text-center">
          <h2
            className={`text-4xl font-playfair-display font-bold text-gray-800 mb-16 transition-opacity duration-1000 ${
              servicesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Layanan Dekorasi Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Dekorasi Pelaminan", desc: "Ciptakan pusat perhatian yang megah dan memukau untuk sumpah pernikahan Anda." },
              { title: "Penataan Meja & Ruangan", desc: "Detail menawan di setiap meja tamu dan sudut ruangan untuk suasana yang kohesif." },
              { title: "Pencahayaan & Efek Atmosfer", desc: "Sentuhan pencahayaan artistik yang mengubah mood dan estetika venue." },
              { title: "Backdrop & Photo Booth", desc: "Desain area foto yang indah dan interaktif untuk kenangan tak terlupakan." },
              { title: "Bunga Segar & Artifisial", desc: "Rangkaian bunga custom dari material terbaik, sesuai tema dan preferensi Anda." },
              { title: "Konsultasi & Perencanaan", desc: "Pendampingan personal dari ide awal hingga eksekusi di hari H." },
            ].map((service, index) => (
              <div
                key={service.title}
                className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col items-center text-center ${
                  servicesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-amber-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-flower-2"
                  >
                    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5V12a4.5 4.5 0 1 1-4.5 4.5V12A4.5 4.5 0 1 1 7.5 12H12A4.5 4.5 0 1 1 12 7.5z" />
                    <path d="M7.5 12H3" />
                    <path d="M12 16.5V21" />
                    <path d="M16.5 12H21" />
                    <path d="M12 7.5V3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Paket Dekorasi */}
      <section id="dekorasi" ref={dekorasiRef} className="py-24 bg-white">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <h2
            className={`text-4xl font-playfair-display font-bold text-gray-800 mb-16 transition-opacity duration-1000 ${
              dekorasiInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Paket Dekorasi Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                src: "/img/paket1.jpg", // PASTIKAN GANTI INI DENGAN GAMBAR BERTEMA BARU
                name: "Paket Elegance Klasik",
                price: "Rp 15.000.000",
                id: "pk001",
              },
              {
                src: "/img/paket2.jpg",
                name: "Paket Romantis Modern",
                price: "Rp 18.500.000",
                id: "pk002",
              },
              {
                src: "/img/paket1.jpg",
                name: "Paket Taman Impian",
                price: "Rp 16.250.000",
                id: "pk003",
              },
              {
                src: "/img/paket2.jpg",
                name: "Paket Grand Luxury",
                price: "Rp 25.000.000",
                id: "pk004",
              },
            ].map((pkg, index) => (
              <div
                key={pkg.id} // Menggunakan id sebagai key unik
                className={`relative rounded-xl overflow-hidden shadow-lg border border-gray-200 group transform hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col ${
                  dekorasiInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Bagian Gambar */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={pkg.src}
                    alt={`Dekorasi ${pkg.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay pada hover (opsional) */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Bagian Detail Paket */}
                <div className="p-4 bg-white text-left flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{pkg.name}</h3> {/* Nama Dekorasi */}
                  <p className="text-lg font-bold text-amber-700 mb-4">{pkg.price}</p> {/* Harga */}

                  {/* Tombol Aksi: Detail dan Keranjang */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <Link
                      href={`/dekorasi/${pkg.id}`} // Contoh link ke halaman detail paket
                      className="flex items-center text-gray-600 hover:text-amber-600 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-5 h-5 mr-1" /> {/* Ikon Detail */}
                      Detail
                    </Link>
                    <button
                      onClick={() => handleAddToCart(pkg.name, pkg.price)}
                      className="flex items-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> {/* Ikon Keranjang */}
                      Sewa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="#" // Anda bisa mengubah ini ke halaman "Semua Paket" atau sejenisnya
            className="inline-block mt-16 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Lihat Semua Koleksi
          </Link>
        </div>
      </section>

      {/* Bagian Custom Dekorasi - BARU */}
      <section id="custom-dekorasi" ref={customDekorasiRef} className="py-24 bg-gradient-to-br from-neutral-100 to-white">
        <div className="container mx-auto px-8 max-w-6xl text-center">
          <h2
            className={`text-4xl font-playfair-display font-bold text-gray-800 mb-6 transition-opacity duration-1000 ${
              customDekorasiInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Kreasikan Dekorasi Impian Anda
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Tidak menemukan paket yang sempurna? Jangan khawatir! Kami siap mewujudkan ide-ide unik Anda menjadi dekorasi pernikahan yang sepenuhnya personal dan disesuaikan. Dari tema, warna, hingga setiap detail kecil, Anda yang menentukan.
          </p>
          <div
            className={`relative w-full md:w-3/4 lg:w-1/2 mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-xl border border-gray-200 mb-12 transition-opacity duration-1000 delay-200 ${
              customDekorasiInView
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
           <Image
              src="/img/custom1.jpg"
              alt="Custom Wedding Decoration Design"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
          </div>
          <Link
            href="/custom-decoration"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Kreasikan Sekarang
          </Link>
        </div>
      </section>

      {/* Bagian Galeri Inspirasi */}
      <section id="galeri" ref={galleryRef} className="py-24 bg-neutral-100"> {/* Menggunakan ref galleryRef */}
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <h2
            className={`text-4xl font-playfair-display font-bold text-gray-800 mb-16 transition-opacity duration-1000 ${
              galleryInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Galeri Inspirasi Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "/img/gallery-1-new.jpg", // Ganti dengan path gambar galeri Anda yang sebenarnya yang sesuai tema
              "/img/gallery-2-new.jpg",
              "/img/gallery-3-new.jpg",
              "/img/gallery-4-new.jpg",
              "/img/gallery-5-new.jpg",
              "/img/gallery-6-new.jpg",
              "/img/gallery-7-new.jpg",
              "/img/gallery-8-new.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200 group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ease-out ${
                  galleryInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={src}
                  alt={`Dekorasi Pernikahan ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <p className="text-white text-lg font-semibold">
                    Tema Elegan {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="#"
            className="inline-block mt-16 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Lihat Semua Galeri
          </Link>
        </div>
      </section>

      {/* Bagian Testimoni */}
      <section className="py-24 bg-gradient-to-br from-neutral-100 to-white">
        <div className="container mx-auto px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-playfair-display font-bold text-gray-800 mb-12">
            Kata Mereka Tentang Kami
          </h2>
          <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 relative">
            <blockquote className="italic text-gray-700 text-xl leading-relaxed mb-6">
              "Littlemee Decoration benar-benar mewujudkan impian pernikahan kami!
              Setiap detailnya sempurna, melebihi ekspektasi kami. Mereka sangat
              profesional dan kreatif. Terima kasih banyak!"
            </blockquote>
            <p className="font-semibold text-gray-800 text-lg">
              - Sarah & David, Pasangan Pengantin
            </p>
            <p className="text-gray-600 text-sm">Malang, Juni 2024</p>
          </div>
        </div>
      </section>

      {/* Bagian Kontak */}
      <section id="kontak" ref={contactRef} className="py-24 bg-neutral-50">
        <div
          className={`container mx-auto px-8 max-w-3xl text-center transition-opacity duration-1000 ${
            contactInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-playfair-display font-bold text-gray-800 mb-6">
            Hubungi Kami
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Siap merencanakan dekorasi pernikahan yang menakjubkan? Mari
            berdiskusi tentang ide dan visi Anda.
          </p>
          <p className="text-gray-700 mt-10">
            WhatsApp:{" "}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline font-medium"
            >
              +62 812-3456-7890
            </a>{" "}
            <br />
            Email:{" "}
            <a
              href="mailto:info@decorifywedding.com"
              className="text-amber-600 hover:underline font-medium"
            >
              info@decorifywedding.com
            </a>
          </p>
          <p className="text-gray-700 mt-4 text-sm">
            Jam Kerja: Senin - Jumat, 09:00 - 17:00 WIB
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 text-center">
        <div className="container mx-auto px-8">
          <p className="text-lg font-semibold mb-4">Littlemee Decoration</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="text-white hover:text-amber-600 transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-600 transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-600 transition-colors"
            >
              Pinterest
            </a>
          </div>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Littlemee Decoration. All Rights
            Reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Dibuat dengan ❤️ di Malang, Indonesia.
          </p>
        </div>
      </footer>

      {/* Custom Global Styles for Fonts and Animations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500;600;700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        .font-playfair-display {
          font-family: "Playfair Display", serif;
        }

        .font-poppins {
          font-family: "Poppins", sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0; /* Pastikan elemen awalnya tidak terlihat */
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}