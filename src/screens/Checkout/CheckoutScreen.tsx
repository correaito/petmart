import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface CheckoutScreenProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  cartItems?: any[];
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onNavigate,
  onBack,
  cartItems = []
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [saveAddress, setSaveAddress] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    console.log('Finalizando pedido:', {
      deliveryInfo,
      paymentMethod,
      cardInfo,
      cartItems,
      saveAddress,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Compra</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Entrega</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CEP</Text>
            <TextInput
              style={styles.input}
              value={deliveryInfo.cep}
              onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, cep: text }))}
              placeholder="00000-000"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={deliveryInfo.address}
              onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, address: text }))}
              placeholder="Sua rua, avenida..."
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Número</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.number}
                onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, number: text }))}
                placeholder="123"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Complemento</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.complement}
                onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, complement: text }))}
                placeholder="Apto, bloco, etc."
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Bairro</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.neighborhood}
                onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, neighborhood: text }))}
                placeholder="Bairro"
              />
            </View>

            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Cidade</Text>
              <TextInput
                style={styles.input}
                value={deliveryInfo.city}
                onChangeText={(text) => setDeliveryInfo(prev => ({ ...prev, city: text }))}
                placeholder="Cidade"
              />
            </View>
          </View>

          {/* Save Address Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSaveAddress(!saveAddress)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, saveAddress && styles.checkboxChecked]}>
              {saveAddress && <Ionicons name="checkmark" size={16} color={colors.text.light} />}
            </View>
            <Text style={styles.checkboxText}>Salvar endereço para compras futuras</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>

          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'credit' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('credit')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentIcon}>
              <Ionicons name="card-outline" size={24} color={paymentMethod === 'credit' ? colors.primary : colors.text.secondary} />
            </View>
            <Text style={[styles.paymentText, paymentMethod === 'credit' && styles.paymentTextSelected]}>
              Cartão de Crédito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'pix' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('pix')}
            activeOpacity={0.7}
          >
            <View style={styles.paymentIcon}>
              <Ionicons name="logo-usd" size={24} color={paymentMethod === 'pix' ? colors.primary : colors.text.secondary} />
            </View>
            <Text style={[styles.paymentText, paymentMethod === 'pix' && styles.paymentTextSelected]}>
              Pix
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Information - Only show when credit card is selected */}
        {paymentMethod === 'credit' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados do Cartão</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Número do Cartão</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="lock-closed" size={20} color={colors.text.secondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.inputWithIconText}
                  value={cardInfo.number}
                  onChangeText={(text) => setCardInfo(prev => ({ ...prev, number: text }))}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome no Cartão</Text>
              <TextInput
                style={styles.input}
                value={cardInfo.name}
                onChangeText={(text) => setCardInfo(prev => ({ ...prev, name: text }))}
                placeholder="Como está impresso no cartão"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.inputThird]}>
                <Text style={styles.inputLabel}>Validade</Text>
                <TextInput
                  style={styles.input}
                  value={cardInfo.expiry}
                  onChangeText={(text) => setCardInfo(prev => ({ ...prev, expiry: text }))}
                  placeholder="MM/AA"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, styles.inputThird]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cardInfo.cvv}
                  onChangeText={(text) => setCardInfo(prev => ({ ...prev, cvv: text }))}
                  placeholder="123"
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>

          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemInfo}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemCategory}>Quantidade: {item.quantity}</Text>
              </View>
              <Text style={styles.orderItemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>R$ {shipping.toFixed(2)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.8}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  inputIcon: {
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  inputWithIconText: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  inputThird: {
    width: '31%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    flex: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentOptionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  paymentText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  paymentTextSelected: {
    color: colors.primary,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: spacing.md,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  orderItemCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  orderItemPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  totalLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  checkoutText: {
    color: colors.text.light,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});

