import { auth } from "@/lib/auth";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Komponen PieChart yang lebih compact
const PieChart = () => {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <div className="absolute inset-0 rounded-full border-6 border-primary"></div>
      <div
        className="absolute inset-0 rounded-full border-6 border-green-500 transform -rotate-90"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      ></div>
      <div
        className="absolute inset-0 rounded-full border-6 border-purple-500 transform -rotate-180"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-sm font-bold">1.2k</span>
          <span className="text-xs block text-muted-foreground">Users</span>
        </div>
      </div>
    </div>
  );
};

// Komponen Stat Card yang compact
const StatCard = ({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}) => {
  const isPositive = change.startsWith("+");

  return (
    <Card className={`border-l-4 ${color}`}>
      <CardContent className="">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{value}</p>
            <p
              className={`text-xs ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change} dari bulan lalu
            </p>
          </div>
          <div className="p-2 bg-muted rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// Komponen Recent Activity yang compact
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "membuat project baru",
      time: "5m",
      color: "bg-blue-500",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "mengupdate profil",
      time: "1h",
      color: "bg-green-500",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "menyelesaikan tugas",
      time: "2h",
      color: "bg-purple-500",
    },
    {
      id: 4,
      user: "Lisa Brown",
      action: "mengupload file",
      time: "3h",
      color: "bg-yellow-500",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
            <div className="flex-1 text-sm">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action}
            </div>
            <Badge variant="secondary" className="text-xs">
              {activity.time}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Komponen Quick Actions yang compact
const QuickActions = () => {
  const actions = [
    { icon: "📊", label: "Statistik", color: "hover:bg-blue-50" },
    { icon: "👥", label: "User", color: "hover:bg-green-50" },
    { icon: "⚙️", label: "Settings", color: "hover:bg-purple-50" },
    { icon: "📋", label: "Laporan", color: "hover:bg-yellow-50" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-16 flex flex-col gap-1 ${action.color}`}
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Komponen Progress Bar
const ProgressBar = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => {
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const DashboardPage = async () => {
  const session = await auth();
  const userName = session?.user?.fullName || "Pengguna";

  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const currentDay = days[now.getDay()];
  const currentDate = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  return (
    <main className="min-h-screen p-4 bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Great to be back, {userName}! 👋
            </h1>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-sm text-muted-foreground">
              {currentDay}, {currentDate}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Pengguna"
            value="1,248"
            change="+12.5%"
            color="border-l-primary"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            }
          />
          <StatCard
            title="Aktivitas Hari Ini"
            value="342"
            change="+8.2%"
            color="border-l-green-500"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
          <StatCard
            title="Pertumbuhan"
            value="24.3%"
            change="+3.1%"
            color="border-l-purple-500"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
          />
          <StatCard
            title="Kepuasan"
            value="94%"
            change="+2.4%"
            color="border-l-yellow-500"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart Section */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-center">
                Distribusi Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PieChart />
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Aktif
                    </span>
                    <span className="font-medium">42%</span>
                  </div>
                  <ProgressBar percentage={42} color="bg-primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Baru
                    </span>
                    <span className="font-medium">33%</span>
                  </div>
                  <ProgressBar percentage={33} color="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Returning
                    </span>
                    <span className="font-medium">25%</span>
                  </div>
                  <ProgressBar percentage={25} color="bg-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-center">
                Distribusi Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <QuickActions />

          <Card className="bg-gradient-to-br from-primary to-primary/80">
            <CardContent className="p-4 text-primary-foreground">
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Tips Produktivitas</h3>
                <p className="text-sm">
                  Gunakan fitur reminder untuk mengatur jadwal harian Anda dan
                  tingkatkan produktivitas hingga 40%.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
