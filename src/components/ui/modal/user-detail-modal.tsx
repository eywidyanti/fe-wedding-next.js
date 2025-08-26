// components/ui/user-detail-modal.tsx
"use client";

import React from "react";
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

// Tipe data untuk pengguna (pastikan ini sama dengan di page.tsx)
interface Pengguna {
  id: string;
  nama: string;
  email: string;
  role: string;
  status: string;
}

interface UserDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: Pengguna | null;
}

export function UserDetailModal({ isOpen, onOpenChange, user }: UserDetailModalProps) {
  if (!user) return null; // Jangan render jika tidak ada user

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Pengguna</DialogTitle>
          <DialogDescription>
            Informasi lengkap mengenai pengguna ini.
          </DialogDescription>
          <Separator className="my-2" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">ID:</Label>
            <span className="col-span-3">{user.id}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Nama:</Label>
            <span className="col-span-3">{user.nama}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Email:</Label>
            <span className="col-span-3">{user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Role:</Label>
            <span className="col-span-3">{user.role}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Status:</Label>
            <span className="col-span-3">
              <span
                className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === "Aktif"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {user.status}
              </span>
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}