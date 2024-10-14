import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { width: WIDTH } = Dimensions.get('window');
const SIZE = WIDTH * 0.9;
const RADIUS = SIZE / 2;
const BOX_SIZE = WIDTH * 0.2

const PanGesture = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, contxt) => {
            translateX.value = event.translationX + contxt.translateX;
            translateY.value = event.translationY + contxt.translateY;
        },
        onEnd: () => {
            const distance = Math.sqrt((translateX.value ** 2) + (translateY.value ** 2));
            console.log(distance);
            
            if (distance < RADIUS + BOX_SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        }
    })
    const boxStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        }
    })
    return (
        <GestureHandlerRootView>
            <View style={styles.constainer}>
                <View style={styles.circle}>
                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View style={[styles.box, boxStyle]} />
                    </PanGestureHandler>
                </View>
            </View>
        </GestureHandlerRootView>
    )
}

export default PanGesture

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: BOX_SIZE,
        aspectRatio: 1,
        backgroundColor: 'red',
        borderRadius: 10
    },
    circle: {
        width: SIZE,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 500,
        justifyContent: "center",
        alignItems: 'center'
    }
})