import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MarketingLayout = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <Navbar />
    <main className="flex-1" data-testid="marketing-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MarketingLayout;
