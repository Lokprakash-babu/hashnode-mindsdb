import clsx from "clsx";
import Header from "../Header";
import HeaderContextProvider from "../Header/HeaderContextProvider";
import Sidebar from "../Sidebar";

const Applayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className={clsx("bg-white")}>
        <HeaderContextProvider>
          <Header />
          <section className="main_container_height overflow-auto">
            {children}
          </section>
        </HeaderContextProvider>
      </main>
    </>
  );
};

export default Applayout;
