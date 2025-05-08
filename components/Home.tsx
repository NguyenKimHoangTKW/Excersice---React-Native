import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView, Modal, TextInput, Alert, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BASE_URL } from "../apiConfig";
import { useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

// Bảng màu ứng dụng
const COLORS = {
  primary: "#e85d75",
  primaryDark: "#d43d57",
  primaryLight: "#ff7d94",
  background: "#f8f8fc",
  card: "#ffffff",
  text: "#333333",
  textLight: "#888888",
  border: "#eeeeee",
};

export default function Home() {
  const route = useRoute();
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("0");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const username = route.params?.username || "HUYỀN TRINH";
  
  async function Get_Service() {
    try {
      const response = await fetch(`${BASE_URL}/list-nail`);
      const res = await response.json();
      if (res.success) {
        setServices(res.data);
      }
    } catch (e) {
      setServices([]);
    }
  }

  useEffect(() => {
    Get_Service();
  }, []);

  async function handleAddService() {
    if (!serviceName.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tên dịch vụ");
      return;
    }
    if (!price || isNaN(Number(price))) {
      Alert.alert("Thông báo", "Giá phải là số");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/create-nail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_services: serviceName,
          price: Number(price),
          id_account: 1
        })
      });
      const res = await response.json();
      if (res.success) {
        setModalVisible(false);
        setServiceName("");
        setPrice("0");
        Get_Service();
      } else {
        Alert.alert("Thông báo", res.message || "Thêm dịch vụ thất bại");
      }
    } catch (e) {
      Alert.alert("Thông báo", "Có lỗi xảy ra!");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Header với Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{username}</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logolab3.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title + Add button */}
      <View style={styles.serviceHeader}>
        <View style={styles.titleContainer}>
          <Icon name="spa" size={22} color={COLORS.primary} style={{ marginRight: 8 }} />
          <Text style={styles.serviceTitle}>Danh sách dịch vụ</Text>
        </View>
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ServiceDetail", { id_services: item.id_services })}
            activeOpacity={0.7}
            style={styles.cardWrapper}
          >
            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Icon name="spa" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName} numberOfLines={1}>{item.name_services}</Text>
                <Text style={styles.servicePrice}>{item.price.toLocaleString()} ₫</Text>
              </View>
              <Icon name="chevron-right" size={22} color={COLORS.textLight} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="sentiment-dissatisfied" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Không có dịch vụ nào</Text>
          </View>
        }
      />

      {/* Add Service Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryDark]}
              style={styles.modalHeader}
            >
              <TouchableOpacity 
                onPress={() => setModalVisible(false)} 
                style={styles.modalBackBtn}
              >
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Thêm dịch vụ mới</Text>
              <View style={{ width: 24 }} />
            </LinearGradient>
            
            <View style={styles.modalBody}>
              <Text style={styles.label}>Tên dịch vụ *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên dịch vụ"
                value={serviceName}
                onChangeText={setServiceName}
                placeholderTextColor="#bbb"
              />
              <Text style={styles.label}>Giá dịch vụ *</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#bbb"
              />
              <TouchableOpacity
                style={[styles.modalAddBtn, loading && styles.disabledButton]}
                onPress={handleAddService}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.modalAddBtnText}>
                  {loading ? "Đang thêm..." : "Thêm dịch vụ"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Icon name="home" size={24} color={COLORS.primary} />
          <Text style={[styles.tabLabel, { color: COLORS.primary }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Icon name="receipt" size={24} color={COLORS.textLight} />
          <Text style={styles.tabLabel}>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Icon name="groups" size={24} color={COLORS.textLight} />
          <Text style={styles.tabLabel}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Icon name="settings" size={24} color={COLORS.textLight} />
          <Text style={styles.tabLabel}>Setting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  
  // HEADER
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // LOGO
  logoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 160,
    height: 70,
  },
  
  // SERVICE HEADER
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.text,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  // SERVICE LIST
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: COLORS.card,
  },
  serviceCard: {
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(232, 93, 117, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 12,
    color: COLORS.textLight,
    fontSize: 16,
  },
  
  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalBackBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: 'center',
  },
  modalBody: {
    padding: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 8,
    color: COLORS.text,
    fontSize: 15,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    color: COLORS.text,
  },
  modalAddBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  modalAddBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  // TAB BAR
  tabBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: COLORS.card,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});