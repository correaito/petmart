import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Banner } from '../../types';
import { colors, spacing, typography } from '../../theme';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - spacing.md * 2;

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={BANNER_WIDTH + spacing.md}
      decelerationRate="fast"
      contentContainerStyle={styles.scrollContent}
    >
      {banners.map((banner) => (
        <View key={banner.id} style={styles.bannerContainer}>
          <View style={[styles.banner, { backgroundColor: banner.backgroundColor || colors.primary }]}>
            <Image 
              source={{ uri: banner.image }} 
              style={styles.bannerImage}
            />
            <View style={styles.bannerContent}>
              {banner.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{banner.discount}</Text>
                </View>
              )}
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  bannerContainer: {
    marginRight: spacing.md,
  },
  banner: {
    width: BANNER_WIDTH,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.4,
    resizeMode: 'cover',
  },
  bannerContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  discountBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  discountText: {
    color: colors.text.light,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  bannerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.light,
    fontWeight: typography.fontWeight.medium,
  },
});

