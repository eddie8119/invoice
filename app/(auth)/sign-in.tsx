import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height } = Dimensions.get('window');

const SignInScreen = () => {
  const handleGoogleSignIn = () => {
    // Google 登入邏輯
    console.log('Google Sign In pressed');
  };

  const handleCreateAccount = () => {
    // 創建帳戶邏輯
    console.log('Create Account pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 頂部裝飾 */}
        <View style={styles.topDecoration}>
          <View style={styles.decorationCircle1} />
          <View style={styles.decorationCircle2} />
        </View>

        {/* 主要內容 */}
        <View style={styles.content}>
          {/* Logo 區域 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>RS</Text>
            </View>
          </View>

          {/* 歡迎文字 */}
          <Text style={styles.welcomeText}>Welcome To</Text>
          <Text style={styles.brandText}>Real Scout</Text>

          <Text style={styles.subtitleText}>
            Let's Get You Closer To{'\n'}
            <Text style={styles.highlightText}>Your Ideal Home</Text>
          </Text>

          {/* 登入按鈕區域 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.8}
            >
              <View style={styles.googleIcon}>
                <Text style={styles.googleIconText}>G</Text>
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* 分隔線 */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 創建帳戶按鈕 */}
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleCreateAccount}
              activeOpacity={0.8}
            >
              <Text style={styles.createAccountText}>Create New Account</Text>
            </TouchableOpacity>
          </View>

          {/* 底部文字 */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>
              Already have an account?{' '}
              <Text style={styles.linkText}>Sign In</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default SignInScreen;
