import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Utensils,
  LayoutGrid,
  Settings,
  TrendingUp,
} from "lucide-react";
import Sidebar from "./admin/Sidebar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Mock data for dashboard metrics
  const metrics = {
    totalSales: "$3,245.65",
    totalOrders: "156",
    averageOrder: "$20.80",
    popularItems: [
      { name: "Margherita Pizza", count: 42 },
      { name: "Chicken Alfredo", count: 38 },
      { name: "Caesar Salad", count: 31 },
      { name: "Chocolate Cake", count: 27 },
    ],
    recentActivity: [
      { action: "New order placed", time: "5 minutes ago", table: "Table 7" },
      { action: "Payment received", time: "12 minutes ago", table: "Table 3" },
      { action: "Reservation made", time: "25 minutes ago", table: "Table 12" },
      { action: "Order completed", time: "34 minutes ago", table: "Table 5" },
    ],
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales (Today)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalSales}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12.5% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Orders (Today)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +8.2% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Order Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.averageOrder}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +2.1% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Tables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8/24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  33% occupancy rate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
                <CardDescription>Top selling items today</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {metrics.popularItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">
                        {item.count} orders
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest restaurant activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {metrics.recentActivity.map((activity, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.table}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => navigate("/users")}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Add New Staff
                  </Button>
                  <Button
                    onClick={() => navigate("/menu")}
                    className="flex items-center gap-2"
                  >
                    <Utensils className="h-4 w-4" />
                    Update Menu
                  </Button>
                  <Button
                    onClick={() => navigate("/tables")}
                    className="flex items-center gap-2"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Manage Tables
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate("/reports")}
                  >
                    <TrendingUp className="h-4 w-4" />
                    View Full Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
