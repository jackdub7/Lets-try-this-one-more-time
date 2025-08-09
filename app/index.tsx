import React, { useState } from 'react';
import { View } from 'react-native';
import AuthenticationScreen from '@/components/AuthenticationScreen';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'swimmer' | 'coach' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setUserRole(user.role);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthentication = (role: 'swimmer' | 'coach') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: '#F8FAFC' }} />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthenticationScreen onAuthenticate={handleAuthentication} />
    </View>
  );
}