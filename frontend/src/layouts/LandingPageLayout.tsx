
import {Outlet} from "react-router";
import {Navbar} from "@/components/shared/Navbar.tsx";
import Footer from "@/components/shared/Footer.tsx";

function LandingPageLayout() {
    return (
      <>
          <Navbar />
          <main className="min-h-svh flex flex-1 overflow-hidden py-24 w-full">
          <Outlet/>
          </main>
          <Footer />
      </>
    )
}

export default LandingPageLayout
