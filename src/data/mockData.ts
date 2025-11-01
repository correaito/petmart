import { Product, Category, Banner } from '../types';

export const banners: Banner[] = [
  {
    id: '1',
    title: '20% OFF em Rações Premium',
    subtitle: 'Esta semana!',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    discount: '20% OFF',
    backgroundColor: '#6B8E6F',
  },
  {
    id: '2',
    title: 'Brinquedos para Gatos',
    subtitle: 'Novidades',
    image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800',
    backgroundColor: '#2C3E50',
  },
];

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Ração Super Premium para Cães Adultos',
    price: 150.0,
    image: require('../assets/images/product1.png'),
    category: 'Ração',
    description: 'Ração premium para cães adultos de todas as raças',
  },
  {
    id: '2',
    name: 'Arranhador para Gatos',
    price: 80.0,
    image: require('../assets/images/product2.png'),
    category: 'Brinquedos',
    description: 'Arranhador resistente com brinquedos inclusos',
  },
  {
    id: '3',
    name: 'Comedouro Automático',
    price: 120.0,
    image: require('../assets/images/product3.png'),
    category: 'Higiene',
    description: 'Comedouro automático com timer programável',
  },
  {
    id: '4',
    name: 'Coleira Inteligente',
    price: 95.0,
    image: require('../assets/images/product4.png'),
    category: 'Brinquedos',
    description: 'Coleira com GPS e monitoramento de atividades',
  },
];

// Todos os produtos da loja
export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: '5',
    name: 'Ração Premium para Gatos',
    price: 120.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Racao+Gatos',
    category: 'Ração',
  },
  {
    id: '6',
    name: 'Ração Especial para Filhotes',
    price: 85.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Racao+Filhotes',
    category: 'Ração',
  },
  {
    id: '7',
    name: 'Brinquedo de Corda para Cães',
    price: 25.0,
    image: 'https://via.placeholder.com/400x400/FF9800/ffffff?text=Corda',
    category: 'Brinquedos',
  },
  {
    id: '8',
    name: 'Shampoo Hipoalergênico para Gatos',
    price: 45.5,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Shampoo',
    category: 'Higiene',
  },
  {
    id: '9',
    name: 'Escova Dental para Cães',
    price: 35.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Escova',
    category: 'Higiene',
  },
  {
    id: '10',
    name: 'Sabão Líquido para Animais',
    price: 28.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Sabao',
    category: 'Higiene',
  },
  {
    id: '11',
    name: 'Tapete Higiênico para Cães',
    price: 65.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Tapete',
    category: 'Higiene',
  },
  {
    id: '12',
    name: 'Condicionador para Gatos',
    price: 42.0,
    image: 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=Condicionador',
    category: 'Higiene',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Cães',
    icon: 'paw',
    color: '#FF9800',
  },
  {
    id: '2',
    name: 'Gatos',
    icon: 'cat',
    color: '#FF9800',
  },
  {
    id: '3',
    name: 'Peixes',
    icon: 'fish',
    color: '#2196F3',
  },
  {
    id: '4',
    name: 'Pássaros',
    icon: 'bird',
    color: '#FF5722',
  },
  {
    id: '5',
    name: 'Brinquedos',
    icon: 'gift',
    color: '#4CAF50',
  },
  {
    id: '6',
    name: 'Alimentos',
    icon: 'food',
    color: '#4CAF50',
  },
  {
    id: '7',
    name: 'Banho',
    icon: 'water',
    color: '#4CAF50',
  },
  {
    id: '8',
    name: 'Veterinário',
    icon: 'medical-bag',
    color: '#4CAF50',
  },
  {
    id: '9',
    name: 'Adestramento',
    icon: 'school',
    color: '#9C27B0',
  },
];

// Categorias de Serviços
export const serviceCategories: Category[] = [
  {
    id: '1',
    name: 'Todos',
    icon: 'list',
    color: '#4CAF50',
  },
  {
    id: '2',
    name: 'Higiene',
    icon: 'water',
    color: '#2196F3',
  },
  {
    id: '3',
    name: 'Saúde',
    icon: 'medical',
    color: '#FF9800',
  },
  {
    id: '4',
    name: 'Adestramento',
    icon: 'school',
    color: '#9C27B0',
  },
];

