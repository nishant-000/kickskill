// --- Component ---
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, MessageSquare, Settings, Users } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Navbardemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <VerticalNav />
        </SheetContent>
      </Sheet>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-6">
            <VerticalNav />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function VerticalNav() {
  return (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}


// --- Demo ---
"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  Home,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function Sidenavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    //add h-screen to the div class name to make the sidebar full height
    <div className="flex ">
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } flex flex-col border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span
            className={`${isOpen ? "block" : "hidden"} text-lg font-semibold`}
          >
            Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              {isOpen && "Home"}
            </Button>
            {isOpen ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    {isOpen && (
                      <>
                        Products
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 1
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 2
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Category 3
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button variant="ghost">
                <Package className="mr-2 h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              {isOpen && "Users"}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              {isOpen && "Settings"}
            </Button>
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
      </main>
    </div>
  );
}
