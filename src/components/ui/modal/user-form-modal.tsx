// components/ui/user-form-modal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface UserFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Pengguna | null; // Data untuk edit mode, null untuk add mode
  onSubmit: (data: Omit<Pengguna, 'id'>) => void;
  title: string;
  description: string;
  submitButtonText: string;
}

export function UserFormModal({
  isOpen,
  onOpenChange,
  initialData,
  onSubmit,
  title,
  description,
  submitButtonText,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<Omit<Pengguna, 'id'>>({
    nama: "",
    email: "",
    role: "Pengguna",
    status: "Aktif",
  });

  // Set form data ketika modal dibuka atau initialData berubah (untuk edit)
  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      });
    } else {
      // Reset form jika ini modal tambah
      setFormData({
        nama: "",
        email: "",
        role: "Pengguna",
        status: "Aktif",
      });
    }
  }, [initialData, isOpen]); // Tambahkan isOpen sebagai dependency agar reset terjadi saat membuka modal baru

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false); // Tutup modal setelah submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Separator className="my-2" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {initialData && ( // Tampilkan ID hanya di mode edit
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={initialData.id}
                className="col-span-3"
                disabled
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama
            </Label>
            <Input
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleSelectChange("role", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Pengguna">Pengguna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={handleSubmit}>{submitButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}