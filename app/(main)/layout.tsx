import MainHeader from "@/components/main-header/main-header";
import MainFooter from "@/components/main-footer/main-footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#111318] text-white">
      {/* Fixed Header */}
      <MainHeader />
      
      {/* Scrollable Content Container */}
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <div className="flex flex-col flex-1 w-full">
          {children}
        </div>
        <MainFooter />
      </div>
    </div>
  );
}