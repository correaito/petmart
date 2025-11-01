import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { colors, spacing, typography } from '../../theme';

interface ProductDetailScreenProps {
  product: Product;
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  onCheckout?: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onNavigate,
  onBack,
  onAddToCart,
  onCheckout
}) => {
  const [selectedWeight, setSelectedWeight] = useState('2,5 kg');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  const weights = ['1 kg', '2,5 kg', '10 kg'];

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleGoToCart = () => {
    setShowAddToCartModal(false);
    onNavigate?.('Cart');
  };

  const handleContinueShopping = () => {
    setShowAddToCartModal(false);
    onBack?.();
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
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FF6B6B" : colors.text.primary} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={typeof product.image === 'string' ? { uri: product.image } : product.image}
            style={styles.productImage}
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          
          {product.description && (
            <Text style={styles.description}>{product.description}</Text>
          )}

          {/* Weight Selection */}
          <View style={styles.weightSection}>
            {weights.map((weight) => (
              <TouchableOpacity
                key={weight}
                style={[
                  styles.weightButton,
                  selectedWeight === weight && styles.weightButtonActive
                ]}
                onPress={() => setSelectedWeight(weight)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.weightText,
                  selectedWeight === weight && styles.weightTextActive
                ]}>
                  {weight}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price and Quantity */}
          <View style={styles.priceSection}>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={handleDecrease}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={20} color={colors.text.primary} />
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={handleIncrease}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          activeOpacity={0.8}
          onPress={() => {
            onAddToCart?.(product, quantity);
            setShowAddToCartModal(true);
          }}
        >
          <Ionicons name="cart-outline" size={20} color={colors.text.light} />
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Confirmation Modal */}
      <Modal
        visible={showAddToCartModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddToCartModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
              <Text style={styles.modalTitle}>Produto adicionado!</Text>
              <Text style={styles.modalSubtitle}>
                {product.name} foi adicionado ao seu carrinho
              </Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={handleContinueShopping}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonSecondaryText}>Continuar Comprando</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={handleGoToCart}
                activeOpacity={0.8}
              >
                <Ionicons name="cart-outline" size={20} color={colors.text.light} />
                <Text style={styles.modalButtonPrimaryText}>Ir para o Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: spacing.lg,
  },
  productName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  weightSection: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  weightButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
  },
  weightButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  weightText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  weightTextActive: {
    color: colors.text.light,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  price: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    paddingHorizontal: spacing.xs,
  },
  quantityButton: {
    padding: spacing.sm,
  },
  quantity: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginHorizontal: spacing.md,
    minWidth: 30,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addToCartButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 12,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.text.light,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    marginLeft: spacing.sm,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.xl,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  modalActions: {
    width: '100%',
  },
  modalButtonSecondary: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.background,
    marginBottom: spacing.sm,
  },
  modalButtonSecondaryText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  modalButtonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.light,
    marginLeft: spacing.xs,
  },
});

