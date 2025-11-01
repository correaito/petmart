import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Validação das credenciais fixas
    if (emailOrUsername.toLowerCase() === 'usuario@mail.com' && password === '12345') {
      onLoginSuccess();
    } else {
      Alert.alert(
        'Credenciais inválidas',
        'Por favor, verifique seu email/nome de usuário e senha.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google', 'Login com Google em desenvolvimento');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Facebook', 'Login com Facebook em desenvolvimento');
  };

  const handleCreateAccount = () => {
    Alert.alert('Criar Conta', 'Funcionalidade em desenvolvimento');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo e Título */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="paw" size={48} color={colors.primary} />
            <Text style={styles.logoText}>PetMart</Text>
          </View>
          <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtitle}>Que bom te ver!</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo Email/Usuário */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email ou Nome de Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email ou nome de usuário"
              placeholderTextColor={colors.text.secondary}
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          {/* Campo Senha */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>Senha</Text>
            </View>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.text.secondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Link Esqueceu Senha */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          {/* Botão Entrar */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Botões Sociais */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.7}
          >
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-google" size={20} color={colors.primary} />
              <Text style={styles.socialButtonText}>Continuar com Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleFacebookLogin}
            activeOpacity={0.7}
          >
            <View style={styles.socialButtonContent}>
              <Ionicons name="logo-facebook" size={20} color={colors.primary} />
              <Text style={styles.socialButtonText}>Continuar com Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Link Criar Conta */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <TouchableOpacity
            onPress={handleCreateAccount}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  welcomeTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  formContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    height: 50,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
  },
  eyeIcon: {
    padding: spacing.xs,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.md,
    color: '#FF6B6B',
    fontWeight: typography.fontWeight.medium,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    marginHorizontal: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  socialButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  socialButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  footerText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  footerLink: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});

