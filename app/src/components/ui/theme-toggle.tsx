import { View, Text, Pressable, Platform, Appearance } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [preference, setPreference] = useState<'light' | 'dark' | 'system'>('system');



  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('user-theme');
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
          setPreference(savedTheme);
          if (savedTheme === 'system') {
            setColorScheme('system');
          } else {
            setColorScheme(savedTheme);
          }
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    }
    loadTheme();
  }, []);

  const handleThemeChange = async (newPreference: 'light' | 'dark' | 'system') => {
    setPreference(newPreference);
    setColorScheme(newPreference);

    try {
      await AsyncStorage.setItem('user-theme', newPreference);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  return (
    <View className="p-4 bg-app border border-border rounded-xl gap-3">
      <Text className="text-text font-semibold text-base">
        Theme Preference <Text className='text-text-muted text-sm'>(Active Mode: {colorScheme})</Text>
      </Text>

      <View className="flex-row gap-2">
        {/* Light Mode */}
        <Pressable
          onPress={() => handleThemeChange('light')}
          className={`flex-1 py-2 px-3 rounded-lg border ${preference === 'light' ? 'bg-primary border-primary' : 'border-border'
            }`}
        >
          <Text className={`text-center font-medium ${preference === 'light' ? 'text-white' : 'text-text'}`}>
            Light
          </Text>
        </Pressable>

        {/* Dark Mode */}
        <Pressable
          onPress={() => handleThemeChange('dark')}
          className={`flex-1 py-2 px-3 rounded-lg border ${preference === 'dark' ? 'bg-primary border-primary' : 'border-border'
            }`}
        >
          <Text className={`text-center font-medium ${preference === 'dark' ? 'text-white' : 'text-text'}`}>
            Dark
          </Text>
        </Pressable>

        {/* System Setting */}
        <Pressable
          onPress={() => handleThemeChange('system')}
          className={`flex-1 py-2 px-3 rounded-lg border ${preference === 'system' ? 'bg-primary border-primary' : 'border-border'
            }`}
        >
          <Text className={`text-center font-medium ${preference === 'system' ? 'text-white' : 'text-text'}`}>
            System
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
