import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterChip } from '../../components/common/FilterChip';
import { ProductCard } from '../../components/common/ProductCard';
import { allProducts } from '../../data/mockData';
import { colors, spacing, typography } from '../../theme';

const filters = ['Filtrar', 'Ração', 'Brinquedos', 'Higiene'];

interface ProductsScreenProps {
  onNavigate?: (screen: string) => void;
  onProductPress?: (product: any) => void;
  onAddToCart?: (product: any) => void;
  onCartPress?: () => void;
  cartItems?: any[];
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ onNavigate, onProductPress, onAddToCart, onCartPress, cartItems = [] }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = !selectedFilter || selectedFilter === 'Filtrar' || product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate?.('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nossos Produtos</Text>
        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={24} color={colors.text.primary} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar
          placeholder="O que seu pet precisa hoje?"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            selected={selectedFilter === filter}
            onPress={() => {
              if (selectedFilter === filter) {
                setSelectedFilter(null);
              } else {
                setSelectedFilter(filter);
              }
            }}
            icon={filter === 'Filtrar' ? 'tune' : undefined}
          />
        ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          key={`products-${selectedFilter}`}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productsContainer}
          columnWrapperStyle={styles.columnWrapper}
          style={styles.productsList}
          scrollIndicatorInsets={{ top: 0, left: 0, bottom: 0, right: 0 }}
          showsVerticalScrollIndicator={filteredProducts.length > 4}
          renderItem={({ item, index }) => (
            <View style={[
              styles.productWrapper,
              // Se houver apenas 1 item, fazer ele ocupar o centro
              filteredProducts.length === 1 ? styles.singleItemWrapper : {}
            ]}>
              <ProductCard
                product={item}
                onPress={() => onProductPress?.(item)}
                onAddToCart={onAddToCart}
                onNavigate={onNavigate}
              />
            </View>
          )}
          scrollEnabled={filteredProducts.length > 4}
          contentOffset={{ x: 0, y: 0 }}
        />
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
    paddingVertical: spacing.sm,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xs,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cartButton: {
    position: 'relative',
    padding: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.text.light,
    fontSize: 10,
    fontWeight: '700',
  },
  searchSection: {
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  filtersSection: {
    marginBottom: spacing.xs,
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  productsList: {
    flex: 1,
  },
  productsContainer: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
    paddingTop: spacing.xs,
    minHeight: 200,
  },
  productWrapper: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: spacing.sm,
  },
  singleItemWrapper: {
    width: '48%',
    marginHorizontal: '1%',
    alignSelf: 'flex-start',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

