import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Filter } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales (Monthly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780.50</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Orders (Monthly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +5.1% from last month
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
            <div className="text-2xl font-bold">$19.90</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Top selling items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Margherita Pizza", count: 342, revenue: "$5,130" },
                { name: "Chicken Alfredo", count: 298, revenue: "$4,470" },
                { name: "Caesar Salad", count: 276, revenue: "$2,760" },
                { name: "Chocolate Cake", count: 254, revenue: "$1,905" },
                { name: "Garlic Bread", count: 210, revenue: "$1,050" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.count} orders
                    </p>
                  </div>
                  <span className="text-sm font-medium">{item.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Time</CardTitle>
            <CardDescription>Hourly distribution of sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {[
                { hour: "9AM", value: 30 },
                { hour: "10AM", value: 45 },
                { hour: "11AM", value: 60 },
                { hour: "12PM", value: 90 },
                { hour: "1PM", value: 85 },
                { hour: "2PM", value: 70 },
                { hour: "3PM", value: 45 },
                { hour: "4PM", value: 40 },
                { hour: "5PM", value: 55 },
                { hour: "6PM", value: 75 },
                { hour: "7PM", value: 95 },
                { hour: "8PM", value: 80 },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-8 bg-primary rounded-t-sm"
                    style={{ height: `${item.value * 2}px` }}
                  ></div>
                  <span className="text-xs mt-2">{item.hour}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>
            Revenue trends over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end justify-between gap-2">
            {[
              { month: "Jan", value: 65 },
              { month: "Feb", value: 70 },
              { month: "Mar", value: 75 },
              { month: "Apr", value: 80 },
              { month: "May", value: 85 },
              { month: "Jun", value: 90 },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div
                  className="w-full bg-primary rounded-t-sm"
                  style={{ height: `${item.value * 3}px` }}
                ></div>
                <span className="text-sm mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
