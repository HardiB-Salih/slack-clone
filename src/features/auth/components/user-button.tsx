"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader2, LogOutIcon } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface UserButtonProps {
  // Define your props here
}

export default function UserButton({}: UserButtonProps) {
  const { signOut } = useAuthActions();
  const { isLoading, data } = useCurrentUser();
  if (isLoading) {
    return <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }
  if (!data) {
    return null;
  }

  const { name, email, image } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-sky-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="h-10">
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
