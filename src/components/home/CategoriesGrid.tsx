import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '../../types';
import { CategoryIcon } from '../common/CategoryIcon';
import { colors, spacing, typography } from '../../theme';

interface CategoriesGridProps {
  categories: Category[];
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias Principais</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <View key={category.id} style={styles.categoryWrapper}>
            <CategoryIcon
              category={category}
              onPress={() => console.log('Category pressed:', category.name)}
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
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
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
    justifyContent: 'flex-start',
  },
  categoryWrapper: {
    width: '25%',
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
});

