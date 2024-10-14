import { View, Text, Dimensions, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { transform } from 'typescript';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
const GAP = (WIDTH * 0.1) / 3
const BLUE = "#4F48EC"
const RED = "#CA1F3D"
// const BLUE = "#0A5984"
// const BLUE = "#0055FF"
const WHITE = "#FFFFFF"
const DARK = "#000000"
const HISTORY_STORAGE_HEIGHT = HEIGHT * 0.97

const DISPLAY_FONT_SIZE_LARGE = WIDTH * 0.195;
const DISPLAY_FONT_SIZE_SMALL = WIDTH * 0.15;


const Calculator = () => {
    const [fontsLoaded] = useFonts({
        'Barlow-Regular': require('../../assets/myFonts/Barlow-Regular.ttf'),
    });

    const [displayValue, setDisplayValue] = useState("0");
    const AnimatedfontSize = useSharedValue(DISPLAY_FONT_SIZE_LARGE);
    const translateX = useSharedValue(-100);

    useEffect(() => {
        if (displayValue.length > 9) {
            AnimatedfontSize.value = withTiming(DISPLAY_FONT_SIZE_SMALL)
        } else {
            AnimatedfontSize.value = withTiming(DISPLAY_FONT_SIZE_LARGE)
        }
    }, [displayValue])

    const scrollRef = useRef();

    const handleClear = () => {
        setDisplayValue("0");
    }
    const addOrRemoveSign = () => {
        if (displayValue[0] === "-") {
            setDisplayValue(displayValue.slice(1, displayValue.length))
        } else {
            setDisplayValue("-" + displayValue)
        }
    }
    const handleValue = (value) => {
        if (displayValue === "0" || displayValue === "ERROR" || displayValue === "Infinity") {
            if (!isNaN(value)) {
                setDisplayValue(value)
            }
        } else {
            const lastDigit = displayValue.slice(-1);
            if (isNaN(lastDigit)) {
                if (isNaN(value)) {
                    setDisplayValue((displayValue.slice(0, -1)) + value)
                    setDisplayValue((((displayValue.slice(0, -1)) + value).replaceAll("*", "×")).replaceAll("/", "÷"));
                } else {
                    setDisplayValue(((displayValue + value).replaceAll("*", "×")).replaceAll("/", "÷"));
                }
            } else {
                setDisplayValue(((displayValue + value).replaceAll("*", "×")).replaceAll("/", "÷"));
            }
        }

        translateX.value = withTiming(-80 * displayValue.length)
    }
    const handleBack = () => {
        if (displayValue !== "0") {
            setDisplayValue(displayValue.slice(0, -1))
        }
        if (displayValue.length === 1 || displayValue === "ERROR" || displayValue === "Infinity") {
            setDisplayValue("0");
        }
    }
    const handleEval = () => {
        try {
            const evalValue = eval((displayValue.replaceAll("×", "*")).replaceAll("÷", "/"));
            if (Number.isInteger(evalValue)) {
                setDisplayValue(String(evalValue))
            } else {
                setDisplayValue(String(evalValue.toFixed(2)))
            }
        } catch (error) {
            setDisplayValue("ERROR")
        }
    }





    if (!fontsLoaded) {
        return (
            <View></View>
        )
    }

    return (
        <View style={styles.container}>
            <Drawer.Screen options={{ headerShown: false }} />

            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.bar}>
                    <Ionicons name='menu-outline' size={WIDTH * 0.1} />
                </View>
                <View style={styles.display}>
                    {/* <View>
                        <Text>123456</Text>
                    </View> */}
                    <ScrollView 
                    // horizontal
                    contentContainerStyle ={{
                        width : 40 * displayValue.length,
                        backgroundColor:'green',
                        alignSelf:'flex-end',
                        
                    }}
                    
                    >
                        <View style={[styles.displayTextView,]}>
                            {
                                displayValue.split().map((item, index) => {
                                    return (
                                        <Animated.Text
                                            key={index}
                                            style={styles.displayText}
                                        >{item}</Animated.Text>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <Button title={"AC"} bgColor={RED} textColor={WHITE} onPress={handleClear} />
                        <Button title={"+/-"} bgColor={BLUE} textColor={WHITE} onPress={addOrRemoveSign} />
                        <Button title={"%"} bgColor={BLUE} textColor={WHITE} onPress={() => { handleValue("%") }} />
                        <Button title={"÷"} bgColor={BLUE} textColor={WHITE} onPress={() => { handleValue("/") }} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title={7} bgColor={WHITE} onPress={() => { handleValue("7") }} />
                        <Button title={8} bgColor={WHITE} onPress={() => { handleValue("8") }} />
                        <Button title={9} bgColor={WHITE} onPress={() => { handleValue("9") }} />
                        <Button title={<Ionicons name='close-outline' size={WIDTH * 0.08} />} bgColor={BLUE} textColor={WHITE} onPress={() => { handleValue("*") }} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title={4} bgColor={WHITE} onPress={() => { handleValue("4") }} />
                        <Button title={5} bgColor={WHITE} onPress={() => { handleValue("5") }} />
                        <Button title={6} bgColor={WHITE} onPress={() => { handleValue("6") }} />
                        <Button title={<Ionicons name='remove-outline' size={WIDTH * 0.08} />} bgColor={BLUE} textColor={WHITE} onPress={() => { handleValue("-") }} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title={1} bgColor={WHITE} onPress={() => { handleValue("1") }} />
                        <Button title={2} bgColor={WHITE} onPress={() => { handleValue("2") }} />
                        <Button title={3} bgColor={WHITE} onPress={() => { handleValue("3") }} />
                        <Button title={<Ionicons name='add-outline' size={WIDTH * 0.08} />} bgColor={BLUE} textColor={WHITE} onPress={() => { handleValue("+") }} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title={"."} bgColor={WHITE} onPress={() => { handleValue(".") }} />
                        <Button title={0} bgColor={WHITE} onPress={() => { handleValue("0") }} />
                        <Button title={<Ionicons name='return-up-back-outline' size={WIDTH * 0.08} />} bgColor={WHITE} onPress={handleBack} />
                        <Button title={<Ionicons name='reorder-two-outline' size={WIDTH * 0.08} />} bgColor={BLUE} textColor={WHITE} onPress={handleEval} />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Calculator

const styles = StyleSheet.create({
    bar: {
        paddingHorizontal: GAP
    },
    display: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        position: 'relative',
        flexDirection:'row',
        backgroundColor:'gray',
        alignItems:'center'
        // height : 70,
        // width : WIDTH
    },
    displayTextView: {
        // alignItems: 'flex-end',
        // minWidth: WIDTH,
        // paddingHorizontal: GAP,
        // backgroundColor: 'gray',
        // position: 'absolute',
        // zIndex: 40,
        // height : 70,
        // backgroundColor: 'red',
        overflow: 'auto',
        
    },
    displayText: {
        // fontSize: WIDTH * 0.195,
        fontFamily: 'Barlow-Regular',
        fontSize: DISPLAY_FONT_SIZE_LARGE
    },
    container: {
        flex: 1,
        paddingVertical: 10,
        // backgroundColor: '#04417C',
        // backgroundColor: '#04417C',
        // backgroundColor: '#0A5984',
        // backgroundColor: '#D9D9D9',
        // backgroundColor: '#F4FFFD',
        backgroundColor: '#E6E6E6',
        position: 'relative'
    },
    safeContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    button: {
        width: "20%",
        aspectRatio: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        width: WIDTH,
        flexDirection: 'row',
        gap: GAP,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: WIDTH * 0.1,
        fontFamily: 'Barlow-Regular'
    },
    buttonContainer: {
        gap: GAP
    },
    history: {
        position: 'absolute',
        width: WIDTH,
        height: HISTORY_STORAGE_HEIGHT,
        backgroundColor: "#FFF",
        zIndex: 100,
        bottom: 0
    },
    historyBarView: {
        width: WIDTH,
        backgroundColor: BLUE,
        paddingVertical: 10
    },
    historyBar: {
        width: WIDTH * 0.3,
        height: 5,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius: 10
    }
})

const Button = ({ title, bgColor, textColor, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: bgColor }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    )
}