import SubscriptionChart from "./components/SubcriptionChart";
import RevenueChart from "./components/RevenueChart";
import DateRangePicker from "./components/DateRangePicker";
import "./dashboard.css";
function Dashboard() {
  return (
    <div>
      <div>
        <DateRangePicker />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <div className="subscription_chart">
          <SubscriptionChart />
        </div>
        <div className="revenue_chart">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
