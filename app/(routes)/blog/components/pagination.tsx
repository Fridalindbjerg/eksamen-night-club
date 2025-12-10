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

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const prev = Math.max(1, currentPage - 1);
  const next = Math.min(totalPages, currentPage + 1);

  return (
   <nav className="flex items-center gap-6 text-white text-xl">
  
  {/* vi starter med at lave et array, som har længden af total sideantal.
  
  
  */}
  {Array.from({ length: totalPages }, (value, index) => index + 1).map((p) =>
    p === currentPage ? (
      // aktiv: hvid tekst + lille underline (som på skærmbilledet)
      <span
        key={p}
        aria-current="page"
        className="pb-[2px] border-b border-white/70"
      >
        {p}
      </span>
    ) : (
      <Link
        key={p}
        href={createPageURL(p)}
        className="opacity-80 hover:opacity-100 transition-opacity"
      >
        {p}
      </Link>
    )
  )}

  {/* mellemrum og 'næste >' */}
  {currentPage < totalPages ? (
    <Link
      href={createPageURL(currentPage + 1)}
      className="ml-2 opacity-90 hover:opacity-100 transition-opacity"
    >
      næste &gt;
    </Link>
  ) : (
    <span className="ml-2 opacity-40 select-none">næste &gt;</span>
  )}
</nav>

  );
}
