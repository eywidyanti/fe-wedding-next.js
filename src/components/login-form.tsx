import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
   const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login Akun</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="test@contoh.com" required />
        </div>
       <div className="grid gap-3 relative"> {/* Tambahkan 'relative' untuk posisi ikon */}
                 <div className="flex items-center">
                   <Label htmlFor="password">Password</Label>
                 </div>
                 <Input
                   id="password"
                   type={showPassword ? "text" : "password"} 
                   placeholder="Password1"
                   required
                   className="pr-10" 
                 />
                 <button
                   type="button"
                   onClick={togglePasswordVisibility}
                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-8" // Sesuaikan posisi ikon
                 >
                   {showPassword ? (
                     // Ikon mata tertutup (Hide)
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="lucide lucide-eye-off h-5 w-5 text-gray-500"
                     >
                       <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                       <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                       <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.749 9.749 0 0 0 5.39-1.61"></path>
                       <line x1="2" x2="22" y1="2" y2="22"></line>
                     </svg>
                   ) : (
                     // Ikon mata terbuka (Show)
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       className="lucide lucide-eye h-5 w-5 text-gray-500"
                     >
                       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                       <circle cx="12" cy="12" r="3"></circle>
                     </svg>
                   )}
                 </button>
               </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
       Tidak punya akun?{" "}
        <a href="/register" className="underline underline-offset-4">
          Daftar
        </a>
      </div>
    </form>
  )
}
