import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Platform, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/Home/HomeScreen';
import { ProductsScreen } from './src/screens/Products/ProductsScreen';
import { ServicesScreen } from './src/screens/Services/ServicesScreen';
import { ProfileScreen } from './src/screens/Profile/ProfileScreen';
import { ProductDetailScreen } from './src/screens/ProductDetail/ProductDetailScreen';
import { CartScreen } from './src/screens/Cart/CartScreen';
import { CheckoutScreen } from './src/screens/Checkout/CheckoutScreen';
import { SchedulingScreen } from './src/screens/Scheduling/SchedulingScreen';
import { LoginScreen } from './src/screens/Login/LoginScreen';
import { Product } from './src/types';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | number;
  quantity: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Ração Premium para Cães Adultos',
      category: 'Ração',
      price: 89.90,
      image: 'https://images.pexels.com/photos/2726370/pexels-photo-2726370.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      quantity: 2,
    },
    {
      id: '3',
      name: 'Shampoo Hipoalergênico para Gatos',
      category: 'Higiene',
      price: 65.50,
      image: 'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      quantity: 1,
    },
  ]);

  const handleNavigate = (screen: string) => {
    setActiveTab(screen);
    if (screen !== 'ProductDetail' && screen !== 'Cart' && screen !== 'Checkout' && screen !== 'Scheduling' && screen !== 'Home' && screen !== 'Services') {
      setSelectedProduct(null);
      setSelectedService(null);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('ProductDetail');
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
    setActiveTab('Products');
  };

  const handleCartPress = () => {
    setActiveTab('Cart');
  };

  const handleBackFromCart = () => {
    setActiveTab('Home');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setActiveTab('Checkout');
  };

  const handleBackFromCheckout = () => {
    setActiveTab('Cart');
  };

  const handleUpdateCartItem = (id: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: quantity,
        }];
      }
    });
  };

  const handleScheduleService = (service: any) => {
    setSelectedService(service);
    setActiveTab('Scheduling');
  };

  const handleBackFromScheduling = () => {
    // Se há um selectedService, significa que veio de Services
    // Se não há, significa que veio de Home
    if (selectedService) {
      // Veio de Services, volta para Services
      setSelectedService(null);
      handleNavigate('Services');
    } else {
      // Veio de Home, volta para Home
      handleNavigate('Home');
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderScreen = () => {
    // Se não estiver autenticado, mostrar tela de login
    if (!isAuthenticated) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }

    // Caso contrário, mostrar o app principal
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onNavigate={handleNavigate} onProductPress={handleProductPress} onAddToCart={handleAddToCart} onCartPress={handleCartPress} cartItems={cartItems} />;
      case 'Products':
        return <ProductsScreen onNavigate={handleNavigate} onProductPress={handleProductPress} onAddToCart={handleAddToCart} onCartPress={handleCartPress} cartItems={cartItems} />;
      case 'ProductDetail':
        return selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onNavigate={handleNavigate}
            onBack={handleBackFromDetail}
            onAddToCart={handleAddToCart}
            onCheckout={handleCheckout}
          />
        ) : null;
      case 'Cart':
        return <CartScreen onNavigate={handleNavigate} onBack={handleBackFromCart} onClearCart={handleClearCart} onUpdateCart={handleUpdateCartItem} onCheckout={handleCheckout} cartItems={cartItems} />;
      case 'Checkout':
        return <CheckoutScreen onNavigate={handleNavigate} onBack={handleBackFromCheckout} cartItems={cartItems} />;
      case 'Scheduling':
        return (
          <SchedulingScreen
            onNavigate={handleNavigate}
            onBack={handleBackFromScheduling}
            preSelectedService={selectedService}
          />
        );
      case 'Services':
        return <ServicesScreen onNavigate={handleNavigate} onCartPress={handleCartPress} cartItems={cartItems} onSchedule={handleScheduleService} />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onProductPress={handleProductPress} onAddToCart={handleAddToCart} onCartPress={handleCartPress} cartItems={cartItems} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      {isAuthenticated && activeTab !== 'ProductDetail' && activeTab !== 'Scheduling' && (
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#4CAF50' : '#757575'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.activeLabel]}>
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Products')}
        >
          <Ionicons 
            name="grid" 
            size={24} 
            color={activeTab === 'Products' ? '#4CAF50' : '#757575'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Products' && styles.activeLabel]}>
            Produtos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Services')}
        >
          <Ionicons
            name="cut"
            size={24}
            color={activeTab === 'Services' ? '#4CAF50' : '#757575'}
          />
          <Text style={[styles.navLabel, activeTab === 'Services' && styles.activeLabel]}>
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Ionicons 
            name="person" 
            size={24} 
            color={activeTab === 'Profile' ? '#4CAF50' : '#757575'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Profile' && styles.activeLabel]}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
    paddingTop: 8,
    height: 65,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#757575',
    marginTop: 4,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
