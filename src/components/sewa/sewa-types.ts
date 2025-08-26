// Tipe data untuk sewa
export interface Sewa {
  id: string;
  namaPenyewa: string;
  barangSewa: string;
  status: 'Sedang Disewa' | 'Sedang Dikirim' | 'Selesai' | 'Dibatalkan';
  tanggalMulai: string;
  tanggalSelesai: string;
  alamatPengiriman?: string;
  nomorTelepon?: string;
  totalHarga?: number;
}