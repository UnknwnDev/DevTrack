import { Pressable, Text, View } from 'react-native';
import {
  ArrowRight,
  Braces,
  Globe,
  Smartphone,
} from 'lucide-react-native';

const projects = [
  {
    id: '1',
    name: 'Portfolio Website',
    description: 'Personal website',
    language: 'React',
    progress: 75,
    icon: Globe,
    color: '#22D3EE',
  },
  {
    id: '2',
    name: 'DevTrack App',
    description: 'Coding tracker',
    language: 'React Native',
    progress: 45,
    icon: Smartphone,
    color: '#A78BFA',
  },
  {
    id: '3',
    name: 'API Practice',
    description: 'Backend learning',
    language: 'Node.js',
    progress: 30,
    icon: Braces,
    color: '#34D399',
  },
];

type RecentProjectsProps = {
  onProjectPress?: (projectId: string) => void;
  onViewAllPress?: () => void;
};

export function RecentProjects({
  onProjectPress,
  onViewAllPress,
}: RecentProjectsProps) {
  return (
    <View className="mt-6">
      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold text-text">
            Your projects
          </Text>
          <Text className="mt-1 text-xs text-text-muted">
            Keep building, one step at a time
          </Text>
        </View>

        <Pressable
          onPress={onViewAllPress}
          className="flex-row items-center py-2"
        >
          <Text className="mr-1 text-sm font-semibold text-primary">
            View all
          </Text>
          <ArrowRight size={16} color="#818CF8" />
        </Pressable>
      </View>

      {projects.map((project) => {
        const ProjectIcon = project.icon;

        return (
          <Pressable
            key={project.id}
            onPress={() => onProjectPress?.(project.id)}
            className="mb-3 rounded-2xl border border-border bg-card p-4"
          >
            <View className="flex-row items-center">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-bg-light">
                <ProjectIcon
                  size={23}
                  color={project.color}
                  strokeWidth={2}
                />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-bold text-text">
                  {project.name}
                </Text>
                <Text className="mt-1 text-xs text-text-muted">
                  {project.description} · {project.language}
                </Text>
              </View>

              <Text className="text-sm font-bold text-text">
                {project.progress}%
              </Text>
            </View>

            <View className="mt-4 h-1.5 overflow-hidden rounded-full bg-bg-light">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${project.progress}%`,
                  backgroundColor: project.color,
                }}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
