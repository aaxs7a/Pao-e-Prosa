import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  Dimensions, 
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../context/CartContext'; 

const { width } = Dimensions.get('window');

const BANNERS = [
  { id: '1', title: 'Pães Artesanais', subtitle: 'Saindo do forno agora!', uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800' },
  { id: '2', title: 'Combos Especiais', subtitle: 'O café perfeito para seu dia', uri: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=800' },
  { id: '3', title: 'Momento Prosa', subtitle: 'Venha conversar e saborear', uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800' },
];

const CATEGORIAS_LISTA = [
  { id: '1', emoji: '🥖', label: 'Pães' },
  { id: '2', emoji: '☕', label: 'Cafés' },
  { id: '3', emoji: '🥐', label: 'Salgados' },
  { id: '4', emoji: '🧁', label: 'Doces' },
  { id: '5', emoji: '🧃', label: 'Bebidas' },
  { id: '6', emoji: '🧀', label: 'Frios' },
  { id: '7', emoji: '🎂', label: 'Bolos' },
  { id: '8', emoji: '🥪', label: 'Lanches' },
];

const DESTAQUES = [
  { id: '101', nome: 'Brownie de Chocolate', preco: 'R$ 12,00', img: 'https://media.istockphoto.com/id/1530809675/pt/foto/brownies-on-a-plate-over-white-wooden-table.jpg?s=612x612&w=0&k=20&c=sAC4u60ruUtMhJYUI6_CwYD_yIy1S1-EtUbtcRtWw7g=' },
  { id: '102', nome: 'Coxinha Suprema', preco: 'R$ 8,50', img: 'https://media.istockphoto.com/id/1158646171/pt/foto/brasilian-snack-coxinha-dried-meat-with-catupiry.jpg?s=612x612&w=0&k=20&c=bdU36QQChAb6AQp42naSqxDqYUmqZ9sQ1JlskDFFzyc=' },
  { id: '103', nome: 'Croissant Recheado', preco: 'R$ 12,00', img: 'https://media.istockphoto.com/id/2198661767/pt/foto/fresh-croissant-sandwiches-with-ham-cheese-and-salad-leaf.jpg?s=612x612&w=0&k=20&c=BvDw83ychBm4QBJE4kF-ylbRZ9CFO7TrJH6UuMiI_dc=' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCategoryPress = (nomeCategoria: string) => {
    router.push({
      pathname: '/categorias',
      params: { nome: nomeCategoria }
    });
  };

  const handleAddDestaque = (item: any) => {
    addToCart(item);
    Alert.alert("Oba!", `${item.nome} foi para o carrinho! 🧺`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Padaria Pão e Prosa</Text>
          <Text style={styles.greeting}>Bom dia, Cliente! ☀️</Text>
        </View>

        {/* Banners */}
        <View style={styles.carouselContainer}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {BANNERS.map((item) => (
              <View key={item.id} style={styles.bannerCard}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <View style={styles.overlay}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSub}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Seção Catálogo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catálogo 📖</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIAS_LISTA.map((item) => (
              <CategoryItem 
                key={item.id}
                emoji={item.emoji} 
                label={item.label} 
                onPress={() => handleCategoryPress(item.label)} 
              />
            ))}
          </ScrollView>
        </View>

        {/* --- LISTRA MARROM DIVISORA --- */}
        <View style={styles.separator} />

        {/* Seção Destaques mais amados */}
        <View style={styles.destaquesSection}>
          <Text style={styles.sectionTitle}>Destaques mais amados ❤️</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DESTAQUES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
            renderItem={({ item }) => (
              <View style={styles.cardDestaque}>
                <Image source={{ uri: item.img }} style={styles.imgDestaque} />
                <View style={styles.infoDestaque}>
                  <Text style={styles.nomeDestaque}>{item.nome}</Text>
                  <Text style={styles.precoDestaque}>{item.preco}</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddDestaque(item)}>
                  <Text style={styles.addButtonText}>+ Adicionar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryItem({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.catContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.catCircle}>
        <Text style={{ fontSize: 25 }}>{emoji}</Text>
      </View>
      <Text style={styles.catLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { padding: 20, marginTop: 10 },
  greeting: { fontSize: 14, color: '#8B4513', fontWeight: '500' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#4A2C2A' },
  carouselContainer: { height: 220, marginVertical: 10 },
  bannerCard: { width: width - 40, marginHorizontal: 20, height: 200, borderRadius: 20, overflow: 'hidden' },
  image: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end', padding: 20 },
  bannerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  bannerSub: { color: '#FFF', fontSize: 14 },
  section: { marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A2C2A', marginBottom: 15, marginLeft: 20 },
  categoriesScroll: { paddingLeft: 20, paddingRight: 10 },
  catContainer: { alignItems: 'center', marginRight: 20 },
  catCircle: { 
    width: 65, height: 65, borderRadius: 35, backgroundColor: '#FFF', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F5DEB3',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3
  },
  catLabel: { marginTop: 8, fontSize: 12, color: '#5D4037', fontWeight: '600' },
  
  // Estilo da Listra Marrom Divisora
separator: {
    height: 3,
    backgroundColor: '#4A2C2A',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 5,
    opacity: 0.8,
  },

  destaquesSection: { marginTop: 15 },
  cardDestaque: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5DEB3',
    elevation: 3,
    paddingBottom: 10,
  },
  imgDestaque: { width: '100%', height: 100 },
  infoDestaque: { padding: 10 },
  nomeDestaque: { fontSize: 14, fontWeight: 'bold', color: '#4A2C2A' },
  precoDestaque: { fontSize: 14, color: '#8B4513', marginTop: 2 },
  addButton: {
    backgroundColor: '#4A2C2A',
    marginHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});