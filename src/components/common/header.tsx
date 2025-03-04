import { Orbit } from "lucide-react";
import React, { Suspense } from "react";
import SearchBox from "../home/search-box";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 bg-slate-100 py-2 px-5 h-20 flex items-center justify-between gap-2 shadow-lg border">
      <Link href="/" className="group flex items-center gap-3 text-slate-500">
        <Orbit size={32} className="group-hover:animate-spin" />
        <h1 className="text-xl font-semibold hidden md:block">
          Orbit Stockz Screener
        </h1>
      </Link>
      <Suspense>
        <SearchBox />
      </Suspense>
    </header>
  );
};

export default Header;
