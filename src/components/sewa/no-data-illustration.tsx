// components/sewa/no-data-illustration.tsx
import React from 'react';
import { ClipboardList } from 'lucide-react'; // Menggunakan ikon dari lucide-react

const NoDataIllustration = () => (
  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
    <ClipboardList
      width="60"
      height="60"
      strokeWidth="1.5"
      className="lucide lucide-clipboard-list"
    />
    <p className="mt-4 text-lg font-medium">Belum ada sewa</p>
    <p className="text-sm text-muted-foreground">Sewa Anda akan muncul di sini.</p>
  </div>
);

export default NoDataIllustration;