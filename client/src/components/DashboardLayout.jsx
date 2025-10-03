import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 bg-gray-100 p-6">{children}</main>
  </div>
);

export default DashboardLayout;
