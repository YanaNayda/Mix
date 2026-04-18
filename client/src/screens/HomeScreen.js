import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from './tabs/MainScreen';
import LibraryScreen from './tabs/LibraryScreen';
import MyBarScreen from './tabs/MyBarScreen';
import ProfileScreen from './tabs/ProfileScreen';
import LevelMapScreen from './tabs/LevelMapScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#f8fafc' },
        headerTitleStyle: { fontWeight: '700', color: '#0f172a' },
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e2e8f0',
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Main',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'library' : 'library-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBar"
        component={MyBarScreen}
        options={{
          title: 'My Bar',
          tabBarLabel: 'My Bar',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'beer' : 'beer-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LevelMap"
        component={LevelMapScreen}
        options={{
          title: 'Level map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
