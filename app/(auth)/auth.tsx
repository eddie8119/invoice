import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Text>create account</Text>
        <TextInput label="Email" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
