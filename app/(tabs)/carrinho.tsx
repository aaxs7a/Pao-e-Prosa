import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  Image,
  Linking // Adicionado para abrir o WhatsApp
} from 'react-native';
// Importamos o hook do carrinho para ler os itens salvos
import { useCart } from '../context/CartContext'; 

export default function TabTwoScreen() {
  const { items, total, removeFromCart } = useCart();

    // 1. Número da padaria (Número real com DDD)
const finalizarPedido = () => {
  if (items.length === 0) {
    Alert.alert("Carrinho Vazio", "Adicione seu produto antes de finalizar! 🥐");
    return;
  }

  const telefone = "558199472821"; // Número teste
  const listaProdutos = items
    .map((item: any) => `• ${item.nome} - ${item.preco}`)
    .join('\n');

  // Função para colar a mensagem do pedido pronta ao abrir o whatsapp
  const mensagem = `*NOVO PEDIDO - PÃO E PROSA* 🧺\n\n` +
                   `Olá! Gostaria de fazer o seguinte pedido:\n\n` +
                   `${listaProdutos}\n\n` +
                   `*TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
                   `_Por favor, confirme meu pedido!_`;

  // Mudamos aqui: usamos o link "https" que o celular entende melhor que o "whatsapp://"
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  // Tentamos abrir direto. Se falhar, aí sim avisamos.
  Linking.openURL(url).catch(() => {
    Alert.alert("Erro", "Não foi possível abrir o WhatsApp automaticamente.");
  });
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho Fixo */}
      <View style={styles.header}>
        <Text style={styles.title}>Meu Carrinho 🛒</Text>
      </View>

      {/* Lista de Itens Adicionados */}
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.img }} style={styles.itemThumb} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemPrice}>{item.preco}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => removeFromCart(index)}
              style={styles.removeBtn}
            >
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🧺</Text>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
            <Text style={styles.emptySub}>Vá até a aba inicial e escolha suas delícias!</Text>
          </View>
        }
      />

      {/* Resumo e Botão de Finalizar */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={finalizarPedido}>
            <Text style={styles.checkoutText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: 60, 
    paddingBottom: 20, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5DEB3'
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A2C2A' },
  listContent: { padding: 20 },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 12, 
    borderRadius: 15, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3
  },
  itemThumb: { width: 50, height: 50, borderRadius: 10 },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#4A2C2A' },
  itemPrice: { fontSize: 14, color: '#8B4513' },
  removeBtn: { padding: 8 },
  removeText: { color: '#FF6347', fontSize: 12, fontWeight: 'bold' },
  footer: { 
    backgroundColor: '#FFF', 
    padding: 25, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 18, color: '#4A2C2A' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#8B4513' },
  checkoutButton: { 
    backgroundColor: '#4A2C2A', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyEmoji: { fontSize: 60, marginBottom: 10 },
  emptyText: { fontSize: 18, color: '#4A2C2A', fontWeight: 'bold' },
  emptySub: { fontSize: 14, color: '#999', marginTop: 5, textAlign: 'center' }
});
