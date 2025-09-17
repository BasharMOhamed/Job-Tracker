import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-5">
      <Hero />

      <StatsCards />
    </div>
  );
}
