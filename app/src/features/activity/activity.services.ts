import { ApiClient } from "@/lib/api/types";
import { Activity, ActivityData } from "./types";
import { localDateKey } from "@/utils/utils";

interface ActivitiesResponse {
  message: string;
  activities: Array<ActivityData>;
}

interface ActivityResponse {
  message: string;
  activity: ActivityData;
}

interface GoalResponse {
  message: string;
  goal: {
    id: string;
    user_id: string;
    created_at: string;
    completed: boolean;
    proj_id: string;
    title: string;
    updated_at: string;
  };
}

interface ProjectResponse {
  message: string;
  project: {
    desc: string;
    id: string;
    user_id: string;
    created_at: string;
    name: string;
    updated_at: string;
  };
}

function extractActivityIDs(
  date: Date | null,
  activities: ActivityData[],
): ActivityData["id"][] {
  if (!date) {
    return activities.map((activity) => activity.id);
  }

  const dateKey = localDateKey(date.toISOString());

  return activities
    .filter((activity) => localDateKey(activity.start_time) === dateKey)
    .map((activity) => activity.id);
}

export async function getActivitiesID(
  apiClient: ApiClient,
  date: Date | null,
): Promise<ActivityData["id"][]> {
  const data = await apiClient<ActivitiesResponse>("/activities", {
    method: "GET",
  });

  const activities = data.activities as ActivityData[];

  return extractActivityIDs(date, activities);
}

export async function getActivity(
  apiClient: ApiClient,
  id: string,
): Promise<Activity> {
  const data = await apiClient<ActivityResponse>(`/activities/${id}`, {
    method: "GET",
  });

  const activity = data.activity;
  const hours = Math.floor(activity.duration / 3600);
  const minutes = Math.floor((activity.duration % 3600) / 60);

  const goalData = await apiClient<GoalResponse>(`/goals/${activity.goal_id}`);

  const goal = goalData.goal;

  const projectData = await apiClient<ProjectResponse>(
    `/projects/${goal.proj_id}`,
  );

  const project = projectData.project;

  console.log(goal);
  return {
    goalTitle: goal.title ?? "No goal",
    projectTitle: project.name ?? "—",
    duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
    time: new Date(activity.start_time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}
