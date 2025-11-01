import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, FABButton } from '../../components/common';
import { BannerCarousel, FeaturedProducts, CategoriesGrid } from '../../components/home';
import { banners, featuredProducts, categories } from '../../data/mockData';
import { colors, spacing } from '../../theme';

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
  onProductPress?: (product: any) => void;
  onAddToCart?: (product: any) => void;
  onCartPress?: () => void;
  cartItems?: any[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onProductPress, onAddToCart, onCartPress, cartItems = [] }) => {
  return (
    <View style={styles.container}>
      <Header onCartPress={onCartPress} cartItemsCount={cartItems.length} />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.bannerSection}>
          <BannerCarousel banners={banners} />
        </View>
        
        <FeaturedProducts products={featuredProducts} onProductPress={onProductPress} onAddToCart={onAddToCart} onNavigate={onNavigate} />
        
        <CategoriesGrid categories={categories} />
      </ScrollView>
      
      <FABButton
        label="Agendar Serviço"
        onPress={() => onNavigate?.('Scheduling')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  bannerSection: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
});

