// import { usePathname, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// export default function Pagination({ totalPages }: { totalPages: number }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };
// }

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const prev = Math.max(1, currentPage - 1);
  const next = Math.min(totalPages, currentPage + 1);

  return (
    <nav className="flex items-center gap-2">
      {currentPage > 1 ? (
        <Link href={createPageURL(prev)} className="px-3 py-1 border border-white/40">
          «
        </Link>
      ) : (
        <span className="px-3 py-1 border border-white/20 opacity-40">«</span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
        p === currentPage ? (
          <span key={p} aria-current="page" className="px-3 py-1 border border-white bg-white text-black">
            {p}
          </span>
        ) : (
          <Link key={p} href={createPageURL(p)} className="px-3 py-1 border border-white/40 hover:border-white">
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={createPageURL(next)} className="px-3 py-1 border border-white/40">
          »
        </Link>
      ) : (
        <span className="px-3 py-1 border border-white/20 opacity-40">»</span>
      )}
    </nav>
  );
}
