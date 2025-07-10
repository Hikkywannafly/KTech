import { FC } from "react";
import { CheckSquareIcon, ClockIcon, StarIcon, TrendingUpIcon } from "lucide-react";

const Dashboard: FC = () => {
  const stats = [
    {
      title: "Tổng công việc",
      value: "24",
      change: "+12%",
      icon: CheckSquareIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Hoàn thành hôm nay",
      value: "8",
      change: "+3",
      icon: TrendingUpIcon,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Công việc quan trọng",
      value: "5",
      change: "+2",
      icon: StarIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Sắp đến hạn",
      value: "3",
      change: "-1",
      icon: ClockIcon,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Hoàn thành báo cáo tuần",
      priority: "high",
      dueDate: "2024-01-15",
      completed: false
    },
    {
      id: 2,
      title: "Gọi khách hàng mới",
      priority: "medium",
      dueDate: "2024-01-14",
      completed: true
    },
    {
      id: 3,
      title: "Cập nhật website",
      priority: "low",
      dueDate: "2024-01-16",
      completed: false
    }
  ];

  return (
    <div className="space-y-6">

      {/* <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Chào mừng bạn trở lại! Đây là tổng quan công việc của bạn.
        </p>
      </div> */}

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} dark:bg-opacity-20`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  so với tuần trước
                </span>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* Recent Tasks */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Công việc gần đây
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hạn: {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
