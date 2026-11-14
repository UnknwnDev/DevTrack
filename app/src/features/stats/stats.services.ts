import { useApiClient } from "@/lib/api/api";
import { Activity, StatData } from "./types";
import { ApiClient } from "@/lib/api/types";
import { localDateKey } from "@/utils/utils";

interface ActivitiesResponse {
  message: string;
  activities: Array<any>;
}

function getTodayDuration(activities: Activity[]): number {
  const today = localDateKey(new Date().toISOString());

  return activities.reduce((total, activity) => {
    return localDateKey(activity.start_time) === today
      ? total + activity.duration
      : total;
  }, 0);
}

function getStreak(activities: Activity[]): number {
  const sessionDays = new Set(
    activities.map((activity) => localDateKey(activity.start_time)),
  );

  const today = new Date();
  const todayKey = localDateKey(today.toISOString());

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = localDateKey(yesterday.toISOString());

  let currentKey = sessionDays.has(todayKey)
    ? todayKey
    : sessionDays.has(yesterdayKey)
      ? yesterdayKey
      : null;

  if (!currentKey) return 0;

  let streak = 0;

  while (sessionDays.has(currentKey)) {
    streak++;

    const previousDay = new Date(`${currentKey}T12:00:00`);
    previousDay.setDate(previousDay.getDate() - 1);
    currentKey = localDateKey(previousDay.toISOString());
  }

  return streak;
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function calculateAverageDuration(activities: Activity[]): number {
  if (activities.length === 0) return 0;

  const totalSeconds = activities.reduce(
    (total, activity) => total + activity.duration,
    0,
  );

  return totalSeconds / activities.length;
}

function getPercentage(todaySeconds: number, activities: Activity[]): number {
  const averageSeconds = calculateAverageDuration(activities);

  if (averageSeconds === 0) return 0;

  return ((todaySeconds - averageSeconds) / averageSeconds) * 100;
}

function formatPercentage(percentage: number): string {
  if (percentage === 0) return "Start Tracking";

  const sign = percentage > 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}% vs avg`;
}

export async function getStat(
  apiClient: ApiClient,
  type: string,
): Promise<StatData> {
  const data = await apiClient<ActivitiesResponse>("/activities", {
    method: "GET",
  });

  const activities = data.activities as Activity[];

  if (type === "time") {
    const seconds = getTodayDuration(activities);
    const percentage = getPercentage(seconds, activities);
    return {
      title: "TODAY",
      stat: formatDuration(seconds),
      desc: formatPercentage(percentage),
    };
  }

  const streak = getStreak(activities);
  return {
    title: "STREAK",
    stat: `${streak} ${streak === 1 ? "day" : "days"}`,
    desc: "",
  };
}
