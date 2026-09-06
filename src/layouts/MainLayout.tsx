import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./MainLayout.scss";

function MainLayout() {
  return (
    <div className="app-layout">
      <Header />

      <main className="app-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;