import React from "react";
import { Button } from "./ui/button";
import { Filter, Plus } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
      <div className="relative z-10">
        <h1 className="text-3xl font-fold tracking-tight sm:text-4xl md:text-5xl">
          Track Your Job Search
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Organize applications, track interviews, and land your dream job with
          our comprehensive job search management platform.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button size={"lg"} className="bg-gradient-primary text-white">
            <Plus className="mr-2 h-5 w-5" />
            Add New Application
          </Button>
          <Button size={"lg"} variant={"outline"}>
            <Filter className="mr-2 h-5 w-5" />
            View Analytics
          </Button>
        </div>
      </div>
      <Image
        src={"/hero-image.jpg"}
        alt="Hero Image"
        fill
        className="absolute inset-0 object-cover opacity-10"
      />
    </section>
  );
};

export default Hero;
