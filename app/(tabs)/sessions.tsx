import { useMemo, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus, Search, Clock3 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { sessions } from '@/data/mockData';
import { SessionCard } from '@/components/sessions/SessionCard';
import { SessionFilters } from '@/components/sessions/SessionFilters';

export default function SessionsScreen() {
  const [filter, setFilter] = useState('All');

  const visibleSessions = useMemo(() => {
    if (filter === 'Today') {
      return sessions.filter((session) =>
        session.date.startsWith('Today')
      );
    }

    if (filter === 'This week') {
      return sessions;
    }

    return sessions;
  }, [filter]);

  const totalMinutes = visibleSessions.reduce(
    (total, session) => total + session.durationMinutes,
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <SafeAreaView className="flex-1 bg-bg-dark" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-text">
              Sessions
            </Text>
            <Text className="mt-1 text-sm text-text-muted">
              Every focused minute counts.
            </Text>
          </View>

          <Pressable
            onPress={() => router.push('/log-session')}
            className="h-11 w-11 items-center justify-center rounded-xl bg-primary"
          >
            <Plus size={23} color="#FFFFFF" />
          </Pressable>
        </View>

        <View className="mb-5 rounded-2xl border border-border bg-card p-4">
          <View className="flex-row items-center">
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
              <Clock3 size={22} color="#818CF8" />
            </View>

            <View className="flex-1">
              <Text className="text-sm text-text-muted">
                Logged session time
              </Text>
              <Text className="mt-1 text-2xl font-bold text-text">
                {hours}h {minutes}m
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          className="mb-5 flex-row items-center rounded-xl border border-border bg-card px-4 py-3"
          onPress={() => {
            // Add a search input here when you want searchable sessions.
          }}
        >
          <Search size={18} color="#94A3B8" />
          <Text className="ml-3 text-sm text-text-muted">
            Search sessions
          </Text>
        </Pressable>

        <SessionFilters selected={filter} onSelect={setFilter} />

        <Text className="mb-4 text-lg font-bold text-text">
          {filter === 'All' ? 'Recent sessions' : `${filter}'s sessions`}
        </Text>

        {visibleSessions.length > 0 ? (
          visibleSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <View className="items-center rounded-2xl border border-border bg-card p-8">
            <Text className="font-semibold text-text">
              No sessions yet
            </Text>
            <Text className="mt-2 text-center text-sm text-text-muted">
              Log a session to start tracking your progress.
            </Text>
          </View>
        )}

        <Pressable
          onPress={() => router.push('/log-session')}
          className="mt-2 flex-row items-center justify-center rounded-2xl bg-primary p-4"
        >
          <Plus size={19} color="#FFFFFF" />
          <Text className="ml-2 font-bold text-white">
            Log a session
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
