import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: WIDTH } = Dimensions.get('window');
// const DARK1 = "#111111"
const DARK1 = "#161616"
// const DARK2 = "#111111"
// const DARK2 = "#161616"
const DARK2 = "#1D1C1C"
const YELLOW = "#FFB700"
const BROWN = "#70012B"
const GREEN = "#066839"

const Calculator3 = () => {
    return (
        <View style={{ flex: 1 }}>
            <Drawer.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{
                justifyContent: 'space-between',
                backgroundColor: "#1D1C1C",
                // backgroundColor: "#0A0A0A",
                // backgroundColor: "#161616",
                flex: 1
            }}>
                <View></View>
                <View style={{ gap: 10, paddingVertical : 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={"AC"} backgroundColor={DARK1} />
                        <Button title={"+/-"} backgroundColor={DARK1} />
                        <Button title={"%"} backgroundColor={DARK1} />
                        <Button title={"÷"} backgroundColor={DARK1} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={"7"} backgroundColor={DARK2} />
                        <Button title={"8"} backgroundColor={DARK2} />
                        <Button title={"9"} backgroundColor={DARK2} />
                        <Button title={<Ionicons name='close-outline' size={WIDTH * 0.05} />} backgroundColor={DARK1} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={"4"} backgroundColor={DARK2} />
                        <Button title={"5"} backgroundColor={DARK2} />
                        <Button title={"6"} backgroundColor={DARK2} />
                        <Button title={<Ionicons name='remove-outline' size={WIDTH * 0.05} />} backgroundColor={DARK1} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={"1"} backgroundColor={DARK2} />
                        <Button title={"2"} backgroundColor={DARK2} />
                        <Button title={"3"} backgroundColor={DARK2} />
                        <Button title={<Ionicons name='add-outline' size={WIDTH * 0.05} />} backgroundColor={DARK1} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title={"0"} backgroundColor={DARK2} />
                        <Button title={"."} backgroundColor={DARK2} />
                        <Button title={<Ionicons name='return-up-back-outline' size={WIDTH * 0.05} />} backgroundColor={DARK2} />
                        <Button title={<Ionicons name='reorder-two-outline' size={WIDTH * 0.05} color={""} />} backgroundColor={YELLOW} />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Calculator3

const Button = ({ title, backgroundColor }) => {
    return (
        <View style={{
            borderRadius: 50,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: "#000",
            elevation:5
        }}>
            <LinearGradient colors={["#000000", "#232323",]}>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: backgroundColor,
                    width: (WIDTH / 4) - 20,
                    aspectRatio: 1,
                }}>
                    <Text style={{ color: YELLOW, fontSize: WIDTH * 0.06 }}>{title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}