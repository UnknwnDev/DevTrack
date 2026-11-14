export type ActivityData = {
  id: string;
  start_time: string;
  end_time: string | null;
  duration: number;
  goal_id: string | null;
  user_id: string;
};

export type Activity = {
  goalTitle: string;
  projectTitle: string;
  duration: string;
  time: string;
};
