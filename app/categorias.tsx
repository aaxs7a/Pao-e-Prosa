import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  Image,
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// 1. Importamos o hook do carrinho
import { useCart } from './context/CartContext'; 

const PRODUTOS = [
  { id: '1', nome: 'Pão Francês', preco: 'R$ 1,50', cat: 'Pães', img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400' },
  { id: '2', nome: 'Croissant', preco: 'R$ 8,90', cat: 'Pães', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400' },
  { id: '3', nome: 'Café Latte', preco: 'R$ 6,50', cat: 'Cafés', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400' },
  { id: '4', nome: 'Capuccino', preco: 'R$ 9,00', cat: 'Cafés', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400' },
  { id: '5', nome: 'Bolo de Fubá', preco: 'R$ 12,00', cat: 'Doces', img: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=400' },
  { id: '6', nome: 'Misto Quente', preco: 'R$ 10,50', cat: 'Lanches', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400' },
];

export default function CategoriasScreen() {
  const { nome } = useLocalSearchParams();
  const router = useRouter();
  
  // 2. Pegamos a função de adicionar do nosso contexto
  const { addToCart } = useCart();

  const produtosFiltrados = PRODUTOS.filter(item => item.cat === nome);

  // Função para adicionar e avisar o usuário
  const handleAdd = (item: any) => {
    addToCart(item);
    Alert.alert("Oba!", `${item.nome} foi para o carrinho! 🧺`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{nome}</Text>
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.productImage} />
            <View style={styles.info}>
              <View>
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.productPrice}>{item.preco}</Text>
              </View>
              
              {/* O seu TouchableOpacity atualizado aqui embaixo */}
              <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => handleAdd(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.addButtonText}>Adicionar +</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center', paddingTop: 60, backgroundColor: '#FFF' },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backText: { fontSize: 24, fontWeight: 'bold', color: '#8B4513' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A2C2A' },
  list: { padding: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', marginBottom: 15, borderRadius: 15, overflow: 'hidden', elevation: 2 },
  productImage: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#4A2C2A' },
  productPrice: { fontSize: 16, color: '#8B4513', fontWeight: '600' },
  addButton: { backgroundColor: '#DEB887', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});