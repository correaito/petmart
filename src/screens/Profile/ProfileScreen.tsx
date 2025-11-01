import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

interface Address {
  id: string;
  type: string;
  address: string;
}

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

interface Order {
  id: string;
  date: string;
  status: string;
}

export const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    phone: '(11) 98765-4321',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
  });

  const [addresses] = useState<Address[]>([
    { id: '1', type: 'Casa', address: 'Rua das Flores, 123' },
    { id: '2', type: 'Trabalho', address: 'Avenida Principal, 456' },
  ]);

  const [orders] = useState<Order[]>([
    { id: '#12345', date: '01/01/2023', status: 'Entregue' },
    { id: '#12344', date: '25/12/2022', status: 'Entregue' },
  ]);

  const handleSaveProfile = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const handleEditProfile = () => {
    setEditForm({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUserInfo({
      ...userInfo,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    });
    setShowEditModal(false);
    Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const handleEditAddress = (address: Address) => {
    Alert.alert('Editar Endereço', `Editar: ${address.type} - ${address.address}`);
  };

  const handleDeleteAddress = (address: Address) => {
    Alert.alert(
      'Excluir Endereço',
      `Tem certeza que deseja excluir o endereço ${address.type}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Aqui você removeria o endereço da lista
            console.log('Endereço excluído:', address.id);
          }
        },
      ]
    );
  };

  const renderAddressItem = (address: Address) => (
    <View key={address.id} style={styles.addressCard}>
      <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{address.type}</Text>
          <Text style={styles.listItemSubtitle}>{address.address}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.addressActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditAddress(address)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={16} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteAddress(address)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderItem = (order: Order) => (
    <TouchableOpacity key={order.id} style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>Pedido {order.id}</Text>
        <Text style={styles.listItemSubtitle}>Data: {order.date} - Status: {order.status}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveEdit}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image and Name */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: userInfo.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil" size={16} color={colors.primary} />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nome Completo</Text>
            <Text style={styles.infoValue}>{userInfo.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{userInfo.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{userInfo.phone}</Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Endereços</Text>
          {addresses.map(renderAddressItem)}

          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={colors.text.light} />
            <Text style={styles.addButtonText}>Adicionar Endereço</Text>
          </TouchableOpacity>
        </View>

        {/* Order History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
          {orders.map(renderOrderItem)}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>Petshops Favoritos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Text style={styles.listItemTitle}>Produtos Mais Comprados</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="exit-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalBackButton}
              onPress={() => setShowEditModal(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleSaveEdit}
              activeOpacity={0.7}
            >
              <Text style={styles.modalSaveText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Nome Completo</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.name}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
                placeholder="Digite seu nome completo"
              />
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>E-mail</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.email}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, email: text }))}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Telefone</Text>
              <TextInput
                style={styles.modalInput}
                value={editForm.phone}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, phone: text }))}
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
              />
            </View>
          </ScrollView>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingRight: 80,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  saveButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  saveButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgroundGray,
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'right',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    paddingRight: 80,
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  listItemSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: '#388E3C',
    borderRadius: 8,
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  addButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.light,
  },
  addressCard: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  addressActions: {
    position: 'absolute',
    top: '50%',
    right: 12,
    transform: [{ translateY: -16 }],
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    gap: spacing.xs,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalBackButton: {
    padding: spacing.xs,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  modalSaveButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  modalSaveText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  modalContent: {
    flex: 1,
    padding: spacing.md,
  },
  modalSection: {
    marginBottom: spacing.lg,
  },
  modalLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
});

