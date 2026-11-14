import { Card } from "@/components/ui/card";
import { Text, View } from "react-native";
import { getStat } from "../stats.services";
import { useEffect, useState } from "react";
import { useApiClient } from "@/lib/api/api";

interface CardProp {
  time?: boolean;
  streak?: boolean;
}

export default function StatCard({ time = false, streak = false }: CardProp) {
  const type = streak ? "streak" : "time";

  const [title, setTitle] = useState("");
  const [stat, setStat] = useState("");
  const [desc, setDesc] = useState("");

  const apiClient = useApiClient();

  useEffect(() => {
    let cancelled = false;

    async function loadStat() {
      try {
        const data = await getStat(apiClient, type);
        if (cancelled) return;

        setTitle(data.title);
        setStat(data.stat);
        setDesc(data.desc);
      } catch (error) {
        console.error("StatCard: Failed to load stat:", error);
      }
    }

    void loadStat();

    return () => {
      cancelled = true;
    };
  }, [type]);

  return (
    <Card className="grow">
      <View className="gap-1">
        <Text className="text-text-muted text-lg">{title}</Text>
        <Text className="text-text text-3xl font-semibold">{stat}</Text>
        <Text className={`${time ? "text-success" : "text-text-muted"}`}>
          {desc}
        </Text>
      </View>
    </Card>
  );
}
