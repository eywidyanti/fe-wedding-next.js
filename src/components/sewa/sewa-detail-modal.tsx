// components/sewa/sewa-detail-modal.tsx
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sewa } from './sewa-types'; // Import tipe data sewa

interface SewaDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sewa: Sewa | null;
}

export function SewaDetailModal({ isOpen, onOpenChange, sewa }: SewaDetailModalProps) {
  if (!sewa) return null; // Jangan render jika tidak ada data sewa

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Sewa</DialogTitle>
          <DialogDescription>
            Informasi lengkap mengenai sewa ini.
          </DialogDescription>
          <Separator className="my-2" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">ID Sewa:</Label>
            <span className="col-span-2">{sewa.id}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Pelanggan:</Label>
            <span className="col-span-2">{sewa.namaPenyewa}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Barang Disewa:</Label>
            <span className="col-span-2">{sewa.barangSewa}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Tanggal Mulai:</Label>
            <span className="col-span-2">{sewa.tanggalMulai}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Tanggal Selesai:</Label>
            <span className="col-span-2">{sewa.tanggalSelesai}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Status:</Label>
            <span className="col-span-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${sewa.status === "Sedang Disewa" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                  sewa.status === "Sedang Dikirim" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" :
                  sewa.status === "Selesai" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
              >
                {sewa.status}
              </span>
            </span>
          </div>
          {sewa.alamatPengiriman && (
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-right font-medium">Alamat:</Label>
              <span className="col-span-2">{sewa.alamatPengiriman}</span>
            </div>
          )}
          {sewa.nomorTelepon && (
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-right font-medium">Telepon:</Label>
              <span className="col-span-2">{sewa.nomorTelepon}</span>
            </div>
          )}
          {sewa.totalHarga && (
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-right font-medium">Total Harga:</Label>
              <span className="col-span-2">Rp{sewa.totalHarga.toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}