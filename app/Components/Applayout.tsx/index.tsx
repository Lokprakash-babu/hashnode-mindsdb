import Sidebar from "../Sidebar";

const Applayout = ({ children }) => {
  return (
    <main>
      <Sidebar />
      <section className="pl-[60px]">{children}</section>
    </main>
  );
};

export default Applayout;
