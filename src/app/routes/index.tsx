import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/app/pages/Home";
import { BookDetailsPage } from "@/app/pages/BookDetails/BookDetailsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
