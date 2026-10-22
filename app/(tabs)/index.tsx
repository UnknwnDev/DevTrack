import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '@/components/home/HomeHeader';
import { TrackerCard } from '@/components/home/TrackerCard';
import { WeeklyActivity } from '@/components/home/WeeklyActivity';
import { DailyGoalCard } from '@/components/home/DailyGoalCard';
import { RecentProjects } from '@/components/home/RecentProjects';
import { QuickAction } from '@/components/home/QuickAction';

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-bg-dark"
      edges={['top']}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          name="Developer"
          onProfilePress={() => {
            console.log('Open profile');
          }}
          onNotificationsPress={() => {
            console.log('Open notifications');
          }}
        />

        <TrackerCard
          hours="12.5"
          changePercent={42}
          streakDays={5}
        />

        <WeeklyActivity totalHours="16.5" />

        <DailyGoalCard
          completedHours={1.5}
          targetHours={2}
        />

        <QuickAction
          onPress={() => {
            console.log('Open log session form');
          }}
        />

        <RecentProjects
          onProjectPress={(projectId) => {
            console.log('Open project:', projectId);
          }}
          onViewAllPress={() => {
            console.log('Open all projects');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
