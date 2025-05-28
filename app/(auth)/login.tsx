import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const { height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height * 0.9,
  },
  topDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  decorationCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(51, 122, 183, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    top: -80,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(51, 122, 183, 0.05)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#337ab7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  brandText: {
    fontSize: 32,
    textAlign: 'center',
    color: '#212529',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#495057',
    lineHeight: 28,
    marginBottom: 48,
  },
  highlightText: {
    color: '#337ab7',
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 32,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  googleIconText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  googleButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dee2e6',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  createAccountButton: {
    backgroundColor: '#337ab7',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#337ab7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createAccountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTextContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  bottomText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  linkText: {
    color: '#337ab7',
    fontWeight: '600',
  },
});

export default LoginScreen;
