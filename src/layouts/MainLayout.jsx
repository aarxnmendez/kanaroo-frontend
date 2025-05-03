import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

function MainLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
        <AppHeader />
        <main className="mx-auto flex w-full flex-1 flex-col items-center py-16 sm:py-20 md:py-24 px-0">
          {children}
        </main>
        <AppFooter />
      </div>
    </>
  );
}

export default MainLayout;
