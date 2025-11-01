import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';
import { serviceCategories } from '../../data/mockData';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | number;
  category: string;
  duration?: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Banho e Tosa',
    description: 'Banho completo com produtos hipoalergênicos e tosa higiênica ou da raça.',
    price: 80.0,
    image: require('../../assets/images/service1.png'),
    category: 'Higiene',
    duration: '1h 30min',
  },
  {
    id: '2',
    name: 'Consulta Veterinária',
    description: 'Atendimento clínico geral e preventivo para a saúde do seu pet.',
    price: 150.0,
    image: require('../../assets/images/service2.png'),
    category: 'Saúde',
    duration: '45min',
  },
  {
    id: '3',
    name: 'Vacinação',
    description: 'Mantenha o calendário de vacinas do seu amiguinho em dia.',
    price: 120.0,
    image: require('../../assets/images/service3.png'),
    category: 'Saúde',
    duration: '30min',
  },
  {
    id: '4',
    name: 'Adestramento',
    description: 'Aulas de obediência e comportamento com profissionais qualificados.',
    price: 200.0,
    image: require('../../assets/images/service4.png'),
    category: 'Adestramento',
    duration: '1h',
  },
];

// Usando serviceCategories do mockData

interface ServicesScreenProps {
  onNavigate?: (screen: string) => void;
  onCartPress?: () => void;
  cartItems?: any[];
  onSchedule?: (service?: any) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigate, onCartPress, cartItems = [], onSchedule }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    if (!selectedCategory || selectedCategory === '1') return true;
    return service.category === serviceCategories.find(cat => cat.id === selectedCategory)?.name;
  });

  const renderServiceCard = ({ item }: { item: Service }) => (
    <View style={styles.serviceCard}>
      <Image 
        source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
        style={styles.serviceImage} 
      />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          {item.duration && (
            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={12} color={colors.text.secondary} />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          )}
        </View>

        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>

        <View style={styles.serviceFooter}>
          <Text style={styles.servicePrice}>R$ {item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.scheduleButton}
            activeOpacity={0.8}
            onPress={() => onSchedule?.(item)}
          >
            <Text style={styles.scheduleButtonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCategoryChip = (category: typeof serviceCategories[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryChip,
        selectedCategory === category.id && styles.categoryChipSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={category.icon as any}
        size={16}
        color={selectedCategory === category.id ? colors.primary : colors.text.secondary}
      />
      <Text style={[
        styles.categoryChipText,
        selectedCategory === category.id && styles.categoryChipTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Nossos Serviços</Text>
        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={24} color={colors.text.primary} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories Filter */}
      <View style={styles.categoriesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {serviceCategories.map(renderCategoryChip)}
        </ScrollView>
      </View>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum serviço encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.servicesContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderServiceCard}
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
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
    marginLeft: -spacing.lg,
  },
  cartButton: {
    position: 'relative',
    padding: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.accent,
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
    fontWeight: typography.fontWeight.bold,
  },
  categoriesSection: {
    marginBottom: spacing.xs,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  categoryChipTextSelected: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  servicesContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
  serviceCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  serviceContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  serviceCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  serviceName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  serviceDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  servicePrice: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: colors.text.light,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
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

