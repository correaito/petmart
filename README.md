# 🐾 PetMart

Aplicativo React Native para Pet Shop, desenvolvido com Expo e TypeScript. Este é um **protótipo funcional** que demonstra as principais funcionalidades de um e-commerce de produtos e serviços para pets.

## 🔐 Credenciais de Acesso

Como este é apenas um protótipo, as credenciais de login estão fixas no código. Para acessar o app:

- **Email/Usuário**: `usuario@mail.com`
- **Senha**: `12345`

⚠️ **Nota**: Estas credenciais são apenas para demonstração do protótipo. Em produção, seria necessário implementar autenticação adequada com backend.

## 📱 Funcionalidades Implementadas

### Autenticação
- ✅ Tela de Login com validação de credenciais
- ✅ Proteção de rotas (autenticação necessária para acessar o app)
- ✅ Interface para login social (Google e Facebook - UI implementada, funcionalidade em desenvolvimento)

### Tela Inicial (Home)
- ✅ Carousel de banners promocionais
- ✅ Grid de categorias principais (Cães, Gatos, Peixes, Pássaros, Brinquedos, Alimentos, Banho, Veterinário, Adestramento)
- ✅ Seção de produtos em destaque
- ✅ Header com busca e indicador de carrinho
- ✅ Botão flutuante (FAB) para agendar serviços

### Produtos
- ✅ Tela de listagem completa de produtos
- ✅ Tela de detalhes do produto
- ✅ Adicionar produtos ao carrinho
- ✅ Filtros por categoria (preparado para implementação)
- ✅ Busca de produtos (UI implementada)

### Carrinho de Compras
- ✅ Visualização de itens no carrinho
- ✅ Ajuste de quantidade dos produtos
- ✅ Remoção de itens
- ✅ Cálculo automático de subtotal e total
- ✅ Botão para limpar carrinho
- ✅ Navegação para checkout

### Checkout (Finalização de Pedido)
- ✅ Formulário de endereço de entrega
- ✅ Seleção de método de pagamento (Cartão de Crédito ou PIX)
- ✅ Formulário de dados do cartão
- ✅ Resumo do pedido com itens, subtotal, frete e total
- ✅ Validação de formulários

### Serviços
- ✅ Tela de listagem de serviços (Banho, Tosa, Consulta Veterinária, Adestramento)
- ✅ Filtros por categoria de serviço
- ✅ Navegação para agendamento

### Agendamento de Serviços
- ✅ Seleção de serviço (pré-selecionado ou manual)
- ✅ Seleção de data e horário
- ✅ Formulário de informações do pet
- ✅ Resumo do agendamento

### Perfil do Usuário
- ✅ Visualização de dados pessoais
- ✅ Edição de perfil (nome, email, telefone)
- ✅ Gerenciamento de endereços cadastrados
- ✅ Histórico de pedidos
- ✅ Opção de logout

### Navegação
- ✅ Navegação por tabs na parte inferior (Início, Produtos, Serviços, Perfil)
- ✅ Navegação em stack para telas de detalhes
- ✅ Botões de voltar contextuais
- ✅ Indicadores visuais de tela ativa

### Componentes Reutilizáveis
- ✅ Header com busca e carrinho
- ✅ ProductCard (card de produto)
- ✅ CategoryIcon (ícone circular de categoria)
- ✅ FABButton (botão flutuante de ação)
- ✅ FilterChip (filtro selecionável)
- ✅ SearchBar (barra de busca)
- ✅ BannerCarousel (carousel de banners)
- ✅ CategoriesGrid (grid de categorias)
- ✅ FeaturedProducts (seção de produtos em destaque)

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 20.x ou superior)
- npm ou yarn
- Expo Go app instalado no seu celular (iOS ou Android)

### Instalação

```bash
# Instalar dependências
npm install
```

### Executar o Projeto

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou usar um dos seguintes comandos:
npm run android  # Para Android
npm run ios      # Para iOS (requer macOS)
npm run web      # Para navegador web
```

### Testando no Dispositivo

1. Após executar `npm start`, um QR code aparecerá no terminal
2. Abra o app **Expo Go** no seu celular
3. Escaneie o QR code
4. O app será carregado no seu dispositivo
5. Na tela de login, use as credenciais mencionadas acima

## 📁 Estrutura do Projeto

```
petshop_app/
├── src/
│   ├── assets/              # Recursos visuais
│   │   └── images/          # Imagens de produtos e serviços
│   ├── components/          # Componentes reutilizáveis
│   │   ├── common/          # Componentes genéricos
│   │   │   ├── CategoryIcon.tsx
│   │   │   ├── FABButton.tsx
│   │   │   ├── FilterChip.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── SearchBar.tsx
│   │   └── home/            # Componentes específicos da home
│   │       ├── BannerCarousel.tsx
│   │       ├── CategoriesGrid.tsx
│   │       └── FeaturedProducts.tsx
│   ├── screens/             # Telas da aplicação
│   │   ├── Cart/            # Tela do carrinho
│   │   ├── Checkout/        # Tela de checkout
│   │   ├── Home/            # Tela inicial
│   │   ├── Login/           # Tela de login
│   │   ├── ProductDetail/   # Detalhes do produto
│   │   ├── Products/        # Listagem de produtos
│   │   ├── Profile/         # Perfil do usuário
│   │   ├── Scheduling/      # Agendamento de serviços
│   │   └── Services/        # Listagem de serviços
│   ├── navigation/          # Configuração de navegação
│   ├── theme/               # Design system
│   │   ├── colors.ts        # Paleta de cores
│   │   ├── spacing.ts       # Espaçamentos padronizados
│   │   └── typography.ts    # Tipografia
│   ├── types/               # Definições de tipos TypeScript
│   ├── data/                # Dados mockados
│   │   └── mockData.ts      # Produtos, categorias, banners, serviços
│   └── utils/               # Utilitários
│       └── constants.ts     # Constantes do app
├── App.tsx                  # Componente raiz e gerenciamento de estado
├── app.json                 # Configuração do Expo
├── package.json             # Dependências do projeto
└── tsconfig.json            # Configuração do TypeScript
```

## 🎨 Design System

### Cores Principais
- **Primary**: #4CAF50 (Verde)
- **Secondary**: #A5D6A7 (Verde claro)
- **Background**: #FFFFFF (Branco)
- **Text Primary**: #212121 (Preto)
- **Text Secondary**: #757575 (Cinza)
- **Border**: #E0E0E0 (Cinza claro)

### Tipografia
- Sistema de tipografia padronizado com tamanhos e pesos consistentes
- Uso de fontes nativas do React Native

### Espaçamento
- Sistema de espaçamento padronizado (xs, sm, md, lg, xl)

## 🛠️ Tecnologias Utilizadas

- **React Native** (0.81.5)
- **Expo** (~54.0.20)
- **TypeScript** (~5.9.2)
- **React** (19.1.0)
- **React Navigation** (@react-navigation/native, @react-navigation/bottom-tabs)
- **Expo Vector Icons** (Ionicons)

## 📊 Estado Atual do Projeto

### ✅ Implementado
- Fluxo completo de autenticação (com credenciais fixas)
- Navegação completa entre todas as telas
- Carrinho de compras funcional
- Sistema de checkout completo (UI e lógica)
- Agendamento de serviços
- Perfil do usuário com edição
- Componentes reutilizáveis modulares
- Design system consistente
- TypeScript para type safety

### 🚧 Preparado para Integração
- Integração com backend/API
- Autenticação real (substituir credenciais fixas)
- Processamento real de pagamentos
- Sistema de notificações push
- Integração com serviços de busca de CEP
- Validação de cartão de crédito real

### 📝 Observações

- O app utiliza **dados mockados** para produtos, serviços e informações do usuário
- As funcionalidades de **login social** (Google e Facebook) têm a UI implementada, mas não estão conectadas a serviços reais
- O **checkout** simula o processo de compra, mas não processa pagamentos reais
- O **agendamento de serviços** é funcional na interface, mas não persiste os dados
- Este é um **protótipo funcional** para demonstração das capacidades e fluxos do app

## 👨‍💻 Arquitetura e Boas Práticas

O projeto foi desenvolvido seguindo boas práticas de engenharia de software:

- ✅ **Clean Architecture**: Separação clara de responsabilidades
- ✅ **Componentização**: Componentes modulares e reutilizáveis
- ✅ **Single Responsibility Principle (SRP)**: Cada componente tem uma única responsabilidade
- ✅ **DRY (Don't Repeat Yourself)**: Código não duplicado
- ✅ **KISS (Keep It Simple, Stupid)**: Soluções simples e diretas
- ✅ **TypeScript**: Type safety em todo o projeto
- ✅ **Design System**: Padrões visuais consistentes

## 📝 Licença

Este é um projeto protótipo desenvolvido para fins de demonstração.

---

**Desenvolvido com ❤️ usando React Native e Expo**
