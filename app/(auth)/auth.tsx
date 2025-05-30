import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Text>create account</Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          placeholder="Email"
          mode="outlined"
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          mode="outlined"
        />
        <Button mode="contained">
          {isSignUp ? 'Sign Up' : 'welcome back'}
        </Button>
        <Button mode="text">
          {isSignUp
            ? 'Already have an account? Sign In'
            : 'dont have an account? Sign Up'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
