import LayoutClient from "../../components/LayoutClient";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <div className="bg-slate-900">
        <ProtectedRoute>
          <LayoutClient>{children}</LayoutClient>
        </ProtectedRoute>
      </div>
    </div>
  );
}
