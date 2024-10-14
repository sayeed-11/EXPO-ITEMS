import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const { width: WIDTH } = Dimensions.get('window');
// const DARK1 = "#111111"
const DARK1 = "#161616"
// const DARK2 = "#111111"
// const DARK2 = "#161616"
const DARK2 = "#1D1C1C"
const YELLOW = "#FFB700"
const BROWN = "#70012B"
const GREEN = "#066839"
const BLUE = "#003087"

const Calculator3 = () => {
    const [fontsLoaded] = useFonts({
        'Barlow-Regular': require('../../assets/myFonts/Barlow-Regular.ttf'),
    });
    return (
        <View style={{ flex: 1 }}>
            <Drawer.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{
                justifyContent: 'space-between',
                backgroundColor: "#0A0A0A",
                // backgroundColor: "#161616",
                flex: 1
            }}>
                <View></View>
                <View style={{ gap: 3.5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={"AC"} backgroundColor={DARK1}/>
                        <Button title={"+/-"} backgroundColor={DARK1}/>
                        <Button title={"%"} backgroundColor={DARK1}/>
                        <Button title={"÷"} backgroundColor={DARK1}/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={"7"} backgroundColor={DARK2}/>
                        <Button title={"8"} backgroundColor={DARK2}/>
                        <Button title={"9"} backgroundColor={DARK2}/>
                        <Button title={<Ionicons name='close-outline' size={WIDTH * 0.06} />} backgroundColor={DARK1}/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={"4"} backgroundColor={DARK2}/>
                        <Button title={"5"} backgroundColor={DARK2}/>
                        <Button title={"6"} backgroundColor={DARK2}/>
                        <Button title={<Ionicons name='remove-outline' size={WIDTH * 0.06} />} backgroundColor={DARK1}/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={"1"} backgroundColor={DARK2}/>
                        <Button title={"2"} backgroundColor={DARK2}/>
                        <Button title={"3"} backgroundColor={DARK2}/>
                        <Button title={<Ionicons name='add-outline' size={WIDTH * 0.06} />} backgroundColor={DARK1}/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title={"0"} backgroundColor={DARK2}/>
                        <Button title={"."} backgroundColor={DARK2}/>
                        <Button title={<Ionicons name='return-up-back-outline' size={WIDTH * 0.06} />} backgroundColor={DARK2}/>
                        <Button title={<Ionicons name='reorder-two-outline' size={WIDTH * 0.06} color={""}/>} backgroundColor={YELLOW} isBackColor={true}/>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Calculator3

const Button = ({ title, backgroundColor, isBackColor }) => {
    return (
        <LinearGradient dither={true} colors={[ "#161616","#111111",]}>
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isBackColor ?  backgroundColor : "null",
                width: (WIDTH / 4) - 3,
                aspectRatio: 1,
                borderWidth : 0.5,
                borderColor : "#232323"
                // borderColor : "#18181C"
                // borderColor : "#434343"
            }}>
                <Text style={{ color: '#FFFFFF', fontSize: WIDTH * 0.06, fontFamily : "Barlow-Regular" }}>{title}</Text>
            </TouchableOpacity>
          </LinearGradient>
    )
}