import FavsAndViewedCard from "@/components/details/favs-n-viewed-card";
import ApiCodeCard from "@/components/home/api-code-card";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto py-20 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FavsAndViewedCard />
        <ApiCodeCard />
      </div>
    </main>
  );
}
