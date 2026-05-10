import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  Dimensions, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const BANNERS = [
  {
    id: '1',
    title: 'Pães Artesanais',
    subtitle: 'Saindo do forno agora!',
    uri: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800',
  },
  {
    id: '2',
    title: 'Combos Especiais',
    subtitle: 'O café perfeito para seu dia',
    uri: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=800',
  },
  {
    id: '3',
    title: 'Momento Prosa',
    subtitle: 'Venha conversar e saborear',
    uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // Função para facilitar a navegação
  const handleCategoryPress = (nomeCategoria: string) => {
    router.push({
      pathname: '/categorias',
      params: { nome: nomeCategoria }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bom dia, Cliente! ☀️</Text>
          <Text style={styles.title}>Pão e Prosa</Text>
        </View>

        {/* Carrossel */}
        <View style={styles.carouselContainer}>
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
          >
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

        {/* Seção de Categorias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossas Delícias</Text>
          <View style={styles.categories}>
            <CategoryItem 
                emoji="🥖" 
                label="Pães" 
                onPress={() => handleCategoryPress('Pães')} 
            />
            <CategoryItem 
                emoji="☕" 
                label="Cafés" 
                onPress={() => handleCategoryPress('Cafés')} 
            />
            <CategoryItem 
                emoji="🍰" 
                label="Doces" 
                onPress={() => handleCategoryPress('Doces')} 
            />
            <CategoryItem 
                emoji="🥪" 
                label="Lanches" 
                onPress={() => handleCategoryPress('Lanches')} 
            />
          </View>
        </View>

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
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#4A2C2A', marginBottom: 15 },
  categories: { flexDirection: 'row', justifyContent: 'space-between' },
  catContainer: { alignItems: 'center' },
  catCircle: { 
    width: 65, height: 65, borderRadius: 35, backgroundColor: '#FFF', 
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#F5DEB3',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3
  },
  catLabel: { marginTop: 8, fontSize: 12, color: '#5D4037', fontWeight: '600' },
});