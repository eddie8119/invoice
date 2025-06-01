import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
  form: {
    gap: 24,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },

  // Input icon
  inputIcon: {
    paddingHorizontal: 16,
  },

  // Helper text
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },

  // Error state
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },

  // Success state
  success: {
    borderColor: 'green',
  },
  successText: {
    color: 'green',
    fontSize: 12,
    marginTop: 4,
  },
});
