// components/sewa/sewa-list-card.tsx
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle, XCircle, Eye } from "lucide-react";
import { Sewa } from './sewa-types'; // Import tipe data sewa

interface SewaListCardProps {
  sewa: Sewa;
  onKirimSekarang: (id: string) => void;
  onSelesaiDikirim: (id: string) => void;
  onLihatDetail: (sewa: Sewa) => void;
}

export function SewaListCard({
  sewa,
  onKirimSekarang,
  onSelesaiDikirim,
  onLihatDetail,
}: SewaListCardProps) {
  return (
    <div key={sewa.id} className="border p-4 mb-3 rounded-md bg-background shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-lg">{sewa.barangSewa}</h4>
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
      </div>
      <p className="text-sm text-muted-foreground">Penyewa: {sewa.namaPenyewa}</p>
      <p className="text-sm text-muted-foreground">Periode: {sewa.tanggalMulai} s/d {sewa.tanggalSelesai}</p>

      <div className="mt-1 flex flex-wrap gap-2 justify-end">
        {sewa.status === "Sedang Disewa" && (
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            onClick={() => onKirimSekarang(sewa.id)}
          >
            <Truck className="h-4 w-4 mr-2" /> Kirim Sekarang
          </Button>
        )}
        {sewa.status === "Sedang Dikirim" && (
          <Button
            size="sm"
            variant="outline"
            className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
            onClick={() => onSelesaiDikirim(sewa.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Selesai Dikirim
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
          onClick={() => onLihatDetail(sewa)}
        >
          <Eye className="h-4 w-4 mr-2" /> Detail
        </Button>
      </div>
    </div>
  );
}