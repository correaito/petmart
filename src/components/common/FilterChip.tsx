import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  icon?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({ 
  label, 
  selected = false, 
  onPress,
  icon 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={16}
          color={selected ? colors.text.light : colors.text.primary}
          style={styles.icon}
        />
      )}
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: spacing.md,
    minHeight: 36,
    alignSelf: 'flex-start',
    maxWidth: 150,
    flexShrink: 1,
  },
  selected: {
    backgroundColor: colors.secondary,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    color: colors.text.primary,
    lineHeight: 16,
    fontWeight: typography.fontWeight.regular,
    flexShrink: 1,
  },
  selectedLabel: {
    color: colors.text.light,
    fontWeight: typography.fontWeight.semibold,
  },
});

