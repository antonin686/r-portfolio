import MacNav from "../../components/MacNav";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div>
      <MacNav />
      <div className="container">
        <div className="main-wrapper">
          <Sidebar />
          <div className="c-card">
            <div className="c-card-header">Dashboard</div>
            <div className="c-card-body">
              <div className="constraction">
                <i className="fas fa-wrench"></i> Under developent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
