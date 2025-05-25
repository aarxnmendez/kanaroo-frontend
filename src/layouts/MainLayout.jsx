import { Navbar } from "@/components/landing/Navbar";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

function MainLayout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="sticky top-0 z-50 w-full h-1/10">
        <Navbar />
        <ScrollProgress className="top-16 bg-foreground/50" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-background text-foreground">
        <main className="mx-auto flex w-full flex-1 flex-col justify-center items-center px-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
