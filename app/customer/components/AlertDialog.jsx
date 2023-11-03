"use client";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect } from "react";

// const SidebarContext = createContext()
export default function AlertDialog({
  title,
  description,
  pathName,
  variant,
  userId,
}) {
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    setTimeout(() => {
      router.replace(`${pathName}`);
    }, 2000);
  }, []);

  return (
    <ToastProvider duration={2000} asChild>
      <Toast variant={variant} className="w-fit h-fit">
        <div className="grid gap-1">
          <ToastTitle className="text-lg">{title}</ToastTitle>
          <ToastDescription className="text-sm font-light">
            {description}
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
