import { Button } from "@/components/ui/button";
import { Text, View } from "react-native";
import ActivityCard from "./activity-card";
import { useApiClient } from "@/lib/api/api";
import { useEffect, useState } from "react";
import { getActivitiesID } from "../activity.services";

interface ListProps {
  date: Date;
}

export default function ActivityList({ date }: ListProps) {
  const apiClient = useApiClient();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadIDs() {
      try {
        const result = await getActivitiesID(apiClient, date);
        if (!cancelled) setIds(result);
      } catch (error) {
        console.error("ActivityList: Failed to load activities:", error);
        if (!cancelled) setIds([]);
      }
    }

    void loadIDs();

    return () => {
      cancelled = true;
    };
  }, [apiClient, date]);

  return (
    <View>
      <View className="flex-row justify-between">
        <Text className="text-text-muted text-lg">TODAY'S ACTIVITY</Text>
        <Button textClassName="text-primary" label="See all" variant="ghost" />
      </View>
      {ids.length > 0 ? ids.map((id) => <ActivityCard id={id} />) : <></>}
    </View>
  );
}
