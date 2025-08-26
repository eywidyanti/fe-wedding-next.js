// components/sewa/sewa-pagination.tsx
"use client";

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SewaPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SewaPagination({ currentPage, totalPages, onPageChange }: SewaPaginationProps) {
  const renderPaginationItems = () => {
    const pages = [];
    const maxPageButtons = 5;

    if (totalPages > 0) pages.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2) + 1);
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2) - 1);

    if (currentPage <= Math.floor(maxPageButtons / 2) + 1) {
      endPage = Math.min(totalPages - 1, maxPageButtons - 1);
    }
    if (currentPage >= totalPages - Math.floor(maxPageButtons / 2)) {
      startPage = Math.max(2, totalPages - maxPageButtons + 2);
    }

    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) pages.push("...");

    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages.map((page, index) => (
      <PaginationItem key={index}>
        {page === "..." ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page as number);
            }}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  if (totalPages <= 0) {
    return null;
  }

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}