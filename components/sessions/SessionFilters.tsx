import { Pressable, ScrollView, Text } from 'react-native';

const filters = ['All', 'Today', 'This week'];

type Props = {
  selected: string;
  onSelect: (filter: string) => void;
};

export function SessionFilters({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      {filters.map((filter) => {
        const active = selected === filter;

        return (
          <Pressable
            key={filter}
            onPress={() => onSelect(filter)}
            className={`mr-2 rounded-full border px-4 py-2 ${
              active
                ? 'border-primary bg-primary'
                : 'border-border bg-card'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? 'text-white' : 'text-text-muted'
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
