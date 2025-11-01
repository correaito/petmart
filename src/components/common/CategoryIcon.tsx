import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category } from '../../types';
import { colors, spacing, typography } from '../../theme';

interface CategoryIconProps {
  category: Category;
  onPress?: () => void;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  onPress 
}) => {
  // Criar cor de fundo mais clara (20% de opacidade)
  const backgroundColor = category.color + '33'; // 33 = 20% opacity in hex
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <MaterialCommunityIcons name={category.icon as any} size={28} color={category.color} />
      </View>
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 11,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 2,
  },
});

