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
import { useCart } from './context/CartContext'; 

const PRODUTOS = [
  // --- Pães ---
  { id: '1', nome: 'Pão Francês', preco: 'R$ 1,50', cat: 'Pães', img: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400' },
  { id: '2', nome: 'Croissant', preco: 'R$ 8,90', cat: 'Pães', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400' },
  { id: '15', nome: 'Pão de Queijo', preco: 'R$ 4,50', cat: 'Pães', img: 'https://media.istockphoto.com/id/2213277832/pt/foto/homemade-cheese-bread-traditional-brazilian-snack-in-the-basket-on-a-rustic-kitchen-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=6v7Ebr0akwz29sqrY5esJsbzpX7IWKihaus6Lt8v6a0=' },

  // --- Cafés ---
  { id: '3', nome: 'Café Latte', preco: 'R$ 6,50', cat: 'Cafés', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400' },
  { id: '4', nome: 'Capuccino', preco: 'R$ 9,00', cat: 'Cafés', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400' },
  { id: '16', nome: 'Expresso Duplo', preco: 'R$ 7,00', cat: 'Cafés', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400' },

  // --- Doces ---
  { id: '5', nome: 'Donut de Chocolate', preco: 'R$ 7,50', cat: 'Doces', img: 'https://images.unsplash.com/photo-1527515545081-5db817172677?q=80&w=400' },
  { id: '17', nome: 'Sonho de Creme', preco: 'R$ 6,00', cat: 'Doces', img: 'https://media.istockphoto.com/id/460900943/pt/foto/sonho-brasileira.webp?a=1&b=1&s=612x612&w=0&k=20&c=nC06NCo_ed_ysl-mYqB8_8aP7ZYYerOLRDyIzpu5OUo=' },

  // --- Lanches ---
  { id: '6', nome: 'Misto Quente', preco: 'R$ 10,50', cat: 'Lanches', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400' },
  { id: '18', nome: 'Hambúrguer Artesanal', preco: 'R$ 22,90', cat: 'Lanches', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400' },

  // --- Salgados ---
  { id: '7', nome: 'Coxinha de Frango', preco: 'R$ 7,00', cat: 'Salgados', img: 'https://media.istockphoto.com/id/2157614515/pt/foto/chicken-coxinha-a-brazilian-snack.webp?a=1&b=1&s=612x612&w=0&k=20&c=oe2fGGAHPHNLh5QY6vxQtyDQe_7BAgmfMk9zLeWgLco=' },
  { id: '8', nome: 'Empada de Palmito', preco: 'R$ 6,50', cat: 'Salgados', img: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=400' },

  // --- Bebidas ---
  { id: '9', nome: 'Suco de Laranja 500ml', preco: 'R$ 12,00', cat: 'Bebidas', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=400' },
  { id: '10', nome: 'Coca-Cola Lata', preco: 'R$ 6,00', cat: 'Bebidas', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400' },

  // --- Frios ---
  { id: '11', nome: 'Queijo Mussarela 200g', preco: 'R$ 14,00', cat: 'Frios', img: 'https://media.istockphoto.com/id/155396168/pt/foto/queijos-ralados-queijo.jpg?s=612x612&w=0&k=20&c=gqiWdoKEvdB4uIXxhGSPsJnpTJQsYIRZzOXDaeWVFs0=' },
  { id: '12', nome: 'Presunto de Porco 200g', preco: 'R$ 12,50', cat: 'Frios', img: 'https://media.istockphoto.com/id/492426014/pt/foto/yummy-alimentos.webp?a=1&b=1&s=612x612&w=0&k=20&c=tOieAqD9yp0vGTGGk1t0wwXe1oXJ8HhSgn3QOiqxZ2s=' },

  // --- Bolos ---
  { id: '13', nome: 'Bolo de Fubá Caseiro', preco: 'R$ 18,00', cat: 'Bolos', img: 'https://media.istockphoto.com/id/2154070865/pt/foto/homemade-corn-cake-on-white-plate-on-rustic-wooden-table-typical-brazilian-party-food.jpg?s=612x612&w=0&k=20&c=kXMdmikvfHq071qYbnhGvy8UuSUODA6p7h2HkowMa_I=' },
  { id: '14', nome: 'Bolo de Chocolate', preco: 'R$ 25,00', cat: 'Bolos', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400' },
];

export default function CategoriasScreen() {
  const { nome } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  // Filtra os produtos com base na categoria clicada
  const produtosFiltrados = PRODUTOS.filter(item => item.cat === nome);

  // Função centralizada para adicionar e avisar o usuário
  const handleAdd = (item: any) => {
    addToCart(item);
    Alert.alert("Enviado!", `${item.nome} foi para o carrinho! 🧺`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão Voltar */}
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado nesta categoria.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.productImage} />
            <View style={styles.info}>
              <View>
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.productPrice}>{item.preco}</Text>
              </View>
              
              <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleAdd(item)} // Ele chama a função que já tem o Alert!
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
  header: { 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 60, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5DEB3'
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backText: { fontSize: 24, fontWeight: 'bold', color: '#8B4513' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A2C2A', marginLeft: 10 },
  list: { padding: 20 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    marginBottom: 15, 
    borderRadius: 15, 
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: { width: 110, height: 110 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  productName: { fontSize: 17, fontWeight: 'bold', color: '#4A2C2A' },
  productPrice: { fontSize: 16, color: '#8B4513', fontWeight: '600', marginTop: 4 },
  addButton: { 
    backgroundColor: '#8B4513', // Cor um pouco mais escura para combinar com pão assado
    paddingVertical: 8, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '500',
  },
});