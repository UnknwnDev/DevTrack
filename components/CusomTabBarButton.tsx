import { TouchableOpacity, View } from 'react-native';
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";

export function CustomTabBarButton({ children, onPress }: any) {
  return (
    <TouchableOpacity
      className='justify-center items-center top-[-15]'
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className='w-[60px] h-[60px] rounded-full bg-info justify-center items-center shadow-lg, elevation-md'>
        <MaterialDesignIcons name="plus" size={32} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}
