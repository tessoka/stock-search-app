"use client";

import { Input } from "../ui/input";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import Link from "next/link";
import { Loader, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { useDebounceValue } from "usehooks-ts";
import { useSearch } from "@/hooks/use-search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pn = usePathname();
  const router = useRouter();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const [debounceValue, setDebounceValue] = useDebounceValue(inputValue, 1000);

  const { data, isLoading } = useSearch(debounceValue);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setDebounceValue(value);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounceValue) params.set("search", debounceValue);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debounceValue]);

  useEffect(() => {
    setInputValue("");
  }, [pn]);

  return (
    <Popover open={!!data?.bestMatches.length && !!inputValue}>
      <PopoverAnchor className="w-1/4 min-w-60">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="bg-white"
            placeholder="Search for a symbol/name..."
          />
          <Button
            variant={"outline"}
            className="bg-white"
            onClick={() => handleInputChange("")}
          >
            {isLoading && <Loader className="animate-spin" />}
            {!inputValue && !isLoading && <Search />}
            {!!inputValue && !isLoading && <X />}
          </Button>
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="p-2"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {!!data?.bestMatches.length &&
          data.bestMatches.map((stock) => (
            <Link
              key={stock["1. symbol"]}
              href={`/stocks/${stock["1. symbol"].toLowerCase()}`}
              className="hover:bg-slate-100 line-clamp-1 text-sm px-2 py-1 rounded-sm transition-colors"
            >
              {stock["2. name"]}
            </Link>
          ))}
      </PopoverContent>
    </Popover>
  );
};

export default SearchBox;
