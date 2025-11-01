import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | number;
  quantity: number;
}

interface CartScreenProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  onClearCart?: () => void;
  onUpdateCart?: (id: string, quantity: number) => void;
  onCheckout?: () => void;
  cartItems?: any[];
}

export const CartScreen: React.FC<CartScreenProps> = ({ onNavigate, onBack, onClearCart, onUpdateCart, onCheckout, cartItems: propCartItems = [] }) => {
  const [showCoupon, setShowCoupon] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    onUpdateCart?.(id, newQuantity);
  };

  const subtotal = propCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handleClearCart = () => {
    onClearCart?.();
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.itemImage}
      />

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>

        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={16} color={colors.text.primary} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color={colors.text.primary} />
          </TouchableOpacity>

          <Text style={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        {propCartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Ionicons name="basket-outline" size={64} color={colors.text.secondary} />
            <Text style={styles.emptyCartTitle}>Seu carrinho está vazio</Text>
            <Text style={styles.emptyCartText}>Adicione alguns produtos para começar!</Text>
          </View>
        ) : (
          <View style={styles.cartItems}>
            {propCartItems.map(renderCartItem)}
          </View>
        )}

        {/* Coupon Section - Only show when cart is not empty */}
        {propCartItems.length > 0 && (
          <TouchableOpacity
            style={styles.couponSection}
            onPress={() => setShowCoupon(!showCoupon)}
            activeOpacity={0.7}
          >
            <Text style={styles.couponTitle}>Cupom de desconto</Text>
            <View style={styles.couponRight}>
              <Text style={styles.couponValue}>R$ 0,00</Text>
              <Ionicons
                name={showCoupon ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.text.secondary}
              />
            </View>
          </TouchableOpacity>
        )}

        {/* Order Summary - Only show when cart is not empty */}
        {propCartItems.length > 0 && (
          <View style={styles.summarySection}>
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
        )}
      </ScrollView>

      {/* Cart Actions - Only show when cart is not empty */}
      {propCartItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.clearCartButton}
            activeOpacity={0.8}
            onPress={handleClearCart}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text style={styles.clearCartText}>Limpar Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            activeOpacity={0.8}
            onPress={onCheckout}
          >
            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      )}
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: 100,
  },
  emptyCartTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyCartText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cartItems: {
    padding: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.backgroundGray,
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  itemCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginHorizontal: spacing.md,
    minWidth: 20,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  couponSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    padding: spacing.md,
    margin: spacing.md,
    marginTop: 0,
  },
  couponTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  couponRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  summarySection: {
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    padding: spacing.md,
    margin: spacing.md,
    marginTop: 0,
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
    gap: spacing.sm,
  },
  clearCartButton: {
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
  },
  clearCartText: {
    color: colors.error,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
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

