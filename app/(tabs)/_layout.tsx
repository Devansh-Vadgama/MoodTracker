import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#0D1B2A', // dark blue background
          borderTopWidth: 0,
          height: 60,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          switch (route.name) {
            case 'index': iconName = 'home'; break;
            case 'log': iconName = 'add-circle'; break;
            case 'history': iconName = 'calendar'; break;
            default: iconName = 'help-circle';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 28 : 24}
              color={focused ? '#4FC3F7' : '#aaa'} // bright blue when focused
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="log" />
      <Tabs.Screen name="history" />
    </Tabs>
  );
}
