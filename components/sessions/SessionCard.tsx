import { Pressable, Text, View } from 'react-native';
import { Clock3, FolderKanban } from 'lucide-react-native';
import type { CodingSession } from '@/data/mockData';

type Props = {
  session: CodingSession;
  onPress?: () => void;
};

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}

export function SessionCard({ session, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-3 rounded-2xl border border-border bg-card p-4"
    >
      <View className="flex-row items-center">
        <View
          className="mr-3 h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${session.color}20` }}
        >
          <FolderKanban size={21} color={session.color} />
        </View>

        <View className="flex-1">
          <Text className="font-bold text-text">
            {session.project}
          </Text>
          <Text className="mt-1 text-xs text-text-muted">
            {session.category} · {session.date}
          </Text>
        </View>

        <View className="items-end">
          <Clock3 size={16} color="#94A3B8" />
          <Text className="mt-1 text-sm font-bold text-text">
            {formatDuration(session.durationMinutes)}
          </Text>
        </View>
      </View>

      <Text className="mt-4 text-sm leading-5 text-text-muted">
        {session.notes}
      </Text>
    </Pressable>
  );
}
