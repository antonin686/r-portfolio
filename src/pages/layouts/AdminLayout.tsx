import MacNav from "../../components/MacNav";
import Sidebar from "../../components/Sidebar";

function AdminLayout({ Content }: any) {
  return (
    <div>
      <MacNav />
      <div className="container">
        <div className="main-wrapper">
          <div>
            <Sidebar />
          </div>
          <div className="c-card">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
