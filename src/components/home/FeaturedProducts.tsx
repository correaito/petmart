import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { colors, spacing, typography } from '../../theme';

interface FeaturedProductsProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onNavigate?: (screen: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onProductPress, onAddToCart, onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos em Destaque</Text>
      <View style={styles.grid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productWrapper}>
            <ProductCard
              product={product}
              onPress={() => onProductPress?.(product)}
              onAddToCart={onAddToCart}
              onNavigate={onNavigate}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '48%',
  },
});

