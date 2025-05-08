import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
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
            console.log(detail);
        }
        fetchDetail();
    }, [id_services]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service detail</Text>
                <Icon name="more-vert" size={24} color="#fff" />
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
                </View>
            )}
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
});