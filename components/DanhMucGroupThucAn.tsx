import React, { useEffect, useState } from "react";
import { 
  FlatList, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { BASE_URL } from "../apiConfig";

interface FoodCategory {
  id_group_loai_mon_an: number;
  ten_group_loai_mon_an: string;
  img: string;
}

export default function DanhMucGroupThucAn() {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/danh_sach_group_loai_mon_an`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: FoodCategory }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: `${BASE_URL}/assets/images/${item.img}` }} 
          style={styles.categoryImage}
        />
      </View>
      <Text style={styles.categoryName}>{item.ten_group_loai_mon_an}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant App</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>📧</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cuisine Title */}
      <Text style={styles.sectionTitle}>Cuisine</Text>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_group_loai_mon_an.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    backgroundColor: "#ffffff",
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bc2d2d",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 15,
    position: "relative",
  },
  iconText: {
    fontSize: 20,
  },
  notificationBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#bc2d2d",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  listContainer: {
    padding: 10,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#bc2d2d",
    textAlign: "center",
  },
});
