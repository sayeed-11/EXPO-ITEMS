import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

const { width: WIDTH } = Dimensions.get('window');

const SWITCH_WIDTH = WIDTH * 0.15;

const SwitchGesture = () => {
    const [num, setNum] = useState(0)
    const translateX = useSharedValue(0);
    const updateNum = (change) => {
        setNum((prev) => prev + change);
    };
    const onGestureEventHandle = useAnimatedGestureHandler({
        onActive: (event) => {
            const distance = Math.abs(event.translationX)
            if (distance <= SWITCH_WIDTH) {
                translateX.value = event.translationX
            }

        },
        onEnd: () => {
            const finalX = translateX.value;  // Store the final translateX before resetting

            if (finalX > SWITCH_WIDTH / 2) {
                runOnJS(updateNum)(1);  // Increment num
            } else if (finalX < -SWITCH_WIDTH / 2) {
                runOnJS(updateNum)(-1);  // Decrement num
            }

            // Animate translateX back to 0
            translateX.value = withTiming(0);
        }
    })
    const switchStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                }
            ]
        }
    })

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <View style={styles.numBox}>
                    <Text>{num}</Text>
                </View>
                <View style={styles.switchBox}>
                    <PanGestureHandler onGestureEvent={onGestureEventHandle}>
                        <Animated.View style={[styles.switch, switchStyle]} />
                    </PanGestureHandler>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

export default SwitchGesture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100
    },
    numBox: {
        width: WIDTH * 0.8,
        height: WIDTH * 0.4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    switch: {
        width: SWITCH_WIDTH,
        aspectRatio: 1,
        backgroundColor: 'yellow',
        borderRadius: 10
    },
    switchBox: {
        width: SWITCH_WIDTH * 3,
        height: SWITCH_WIDTH,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})