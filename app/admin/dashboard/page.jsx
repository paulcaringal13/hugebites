import MiniAdminSidebar from "../components/MiniAdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="h-fit w-full flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <div className="h-[1000px] w-full">ASD</div>
    </div>
  );
};

export default AdminDashboard;
