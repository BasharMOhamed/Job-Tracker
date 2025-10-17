"use client";
import React, { useEffect } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Bell, Plus } from "lucide-react";
import Profilebtn from "./Profilebtn";
import { AddApplication } from "./AddApplication";
import { useAppStore } from "@/store/useAppStore";

const Header = () => {
  const { fetchApplications } = useAppStore();
  useEffect(() => {
    fetchApplications();
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-20 px-5">
      <div className="container max-w-7xl mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Logo */}
        <Logo />
        {/* Search */}

        {/* Actions */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <AddApplication>
            <Button
              size={"sm"}
              className="hidden md:flex bg-gradient-primary text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </AddApplication>
          {/* Notifications */}
          <Button size={"sm"} className="relative" variant={"ghost"}>
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
          </Button>

          <Profilebtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
