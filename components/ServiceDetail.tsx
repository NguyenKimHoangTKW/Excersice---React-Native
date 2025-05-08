import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BASE_URL } from "../apiConfig";
function unixTimestampToDate(unixTimestamp: number) {
    var date = new Date(unixTimestamp * 1000);
    var weekdays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    var dayOfWeek = weekdays[date.getDay()];
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var formattedDate = dayOfWeek + ', ' + day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
    return formattedDate;
}
export default function ServiceDetail({ route, navigation }: { route: any, navigation: any }) {
    const { id_services } = route.params;
    const [detail, setDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [updateName, setUpdateName] = useState("");
    const [updatePrice, setUpdatePrice] = useState("");
    const [updating, setUpdating] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function fetchDetail() {
            try {
                const res = await fetch(`${BASE_URL}/info-nail`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_services: id_services
                    })
                });
                const data = await res.json();
                setDetail(data.data);
            } catch (e) { }
            setLoading(false);
        }
        fetchDetail();
    }, [id_services]);

    const openUpdateModal = () => {
        if (detail) {
            setUpdateName(detail.name_services || "");
            setUpdatePrice(detail.price ? String(detail.price) : "0");
            setUpdateModalVisible(true);
        }
    };

    const handleUpdateService = async () => {
        if (!updateName.trim()) {
            Alert.alert("Thông báo", "Vui lòng nhập tên dịch vụ");
            return;
        }
        if (!updatePrice || isNaN(Number(updatePrice))) {
            Alert.alert("Thông báo", "Giá phải là số");
            return;
        }
        setUpdating(true);
        try {
            const response = await fetch(`${BASE_URL}/update-nail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_services: id_services,
                    name_services: updateName,
                    price: Number(updatePrice)
                })
            });
            const res = await response.json();
            if (res.success) {
                setUpdateModalVisible(false);
                setDetail((prev: any) => ({ ...prev, name_services: updateName, price: Number(updatePrice) }));
                Alert.alert("Thành công", "Cập nhật dịch vụ thành công!");
            } else {
                Alert.alert("Thông báo", res.message || "Cập nhật thất bại");
            }
        } catch (e) {
            Alert.alert("Thông báo", "Có lỗi xảy ra!");
        }
        setUpdating(false);
    };

    const handleDeleteService = async () => {
        setDeleting(true);
        try {
            const response = await fetch(`${BASE_URL}/delete-nail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_services })
            });
            const res = await response.json();
            if (res.success) {
                setDeleteModalVisible(false);
                Alert.alert("Thành công", "Đã xóa dịch vụ!");
                navigation.goBack();
            } else {
                Alert.alert("Thông báo", res.message || "Xóa thất bại");
            }
        } catch (e) {
            Alert.alert("Thông báo", "Có lỗi xảy ra!");
        }
        setDeleting(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service detail</Text>
                <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                    <Icon name="more-vert" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            {!detail ? (
                <Text style={{ textAlign: "center", marginTop: 40 }}>Không tìm thấy dịch vụ</Text>
            ) : (
                <View style={{ padding: 16 }}>
                    <Text>
                        <Text style={styles.bold}>Service name: </Text>
                        {detail.name_services}
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                        <Text style={styles.bold}>Price: </Text>
                        {Number(detail.price).toLocaleString()} ₫
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                        <Text style={styles.bold}>Creator: </Text>
                        {detail.username || "N/A"}
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                        <Text style={styles.bold}>Time: </Text>
                        {unixTimestampToDate(detail.time_create)}
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                        <Text style={styles.bold}>Final update: </Text>
                        {unixTimestampToDate(detail.time_update)}
                    </Text>
                    <TouchableOpacity
                        style={styles.updateBtn}
                        onPress={openUpdateModal}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.updateBtnText}>Update Service</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
                visible={updateModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setUpdateModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cập nhật dịch vụ</Text>
                        <Text style={styles.label}>Tên dịch vụ *</Text>
                        <TextInput
                            style={styles.input}
                            value={updateName}
                            onChangeText={setUpdateName}
                            placeholder="Nhập tên dịch vụ"
                        />
                        <Text style={styles.label}>Giá dịch vụ *</Text>
                        <TextInput
                            style={styles.input}
                            value={updatePrice}
                            onChangeText={setUpdatePrice}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                                onPress={() => setUpdateModalVisible(false)}
                                disabled={updating}
                            >
                                <Text style={{ color: '#333' }}>Huỷ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, { backgroundColor: '#e85d75' }]}
                                onPress={handleUpdateService}
                                disabled={updating}
                            >
                                <Text style={{ color: '#fff' }}>{updating ? 'Đang cập nhật...' : 'Cập nhật'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={deleteModalVisible}
                animationType="fade"
                transparent
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteModalContent}>
                        <Text style={styles.deleteTitle}>Warning</Text>
                        <Text style={styles.deleteMessage}>
                            Are you sure you want to remove this service? This operation cannot be returned
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={handleDeleteService}
                                disabled={deleting}
                            >
                                <Text style={{ color: '#00bfae', fontWeight: 'bold', fontSize: 16 }}>
                                    {deleting ? 'DELETING...' : 'DELETE'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => setDeleteModalVisible(false)}
                                disabled={deleting}
                            >
                                <Text style={{ color: '#00bfae', fontWeight: 'bold', fontSize: 16 }}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e85d75",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        justifyContent: "space-between",
    },
    headerTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        letterSpacing: 1,
    },
    bold: { fontWeight: "bold" },
    updateBtn: {
        backgroundColor: '#e85d75',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 24,
        alignSelf: 'flex-start',
    },
    updateBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#e85d75',
        textAlign: 'center',
    },
    label: {
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 8,
        color: '#333',
        fontSize: 15,
    },
    input: {
        backgroundColor: '#f8f8fc',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 8,
        color: '#333',
    },
    modalBtn: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        minWidth: 100,
    },
    deleteModalContent: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        elevation: 10,
        alignItems: 'flex-start',
    },
    deleteTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    deleteMessage: {
        fontSize: 15,
        color: '#333',
        marginBottom: 8,
    },
    deleteBtn: {
        marginRight: 24,
    },
    cancelBtn: {},
});