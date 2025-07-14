"use client";

import { useAuth } from "../context/AuthContext";
import React, { JSX } from "react";

interface LogoutButtonProps {
  showName?: boolean;
  className?: string;
}

export default function LogoutButton({
  showName = false,
  className,
}: LogoutButtonProps): JSX.Element | null {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <button onClick={logout} className={className ?? "logout-button"}>
      Logout{showName && user?.displayName ? ` (${user.displayName})` : ""}
    </button>
  );
}
