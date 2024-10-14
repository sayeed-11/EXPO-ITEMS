import { View, Text, Dimensions, Image, FlatList } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { clamp, useAnimatedGestureHandler, useSharedValue, withTiming, withDecay, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const MIN_TRANSLATE_Y = 0;
const MAX_TRANSLATE_Y = 500;
const HEIGHT = height
const springConfig = velocity => {
    'worklet';
    return {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        velocity,
    };
};

const GestureVelocity = () => {
    const translateY = useSharedValue(0);
    const handleGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            // Save the current translateY value in context at the start of the gesture
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            // Update translateY as the user drags
            const newTranslateY = event.translationY + context.translateY;
            // translateY.value = clamp(newTranslateY, MIN_TRANSLATE_Y, MAX_TRANSLATE_Y);
            // console.log(translateY.value);
            if (newTranslateY < 0) newTranslateY = 0
            if (newTranslateY > HEIGHT * 0.9) newTranslateY = HEIGHT * 0.9;
            translateY.value = newTranslateY
            // translateY.value = newTranslateY

            console.log(translateY.value);

        },
        onEnd: (event, context) => {
            if (event.velocityY < -20 && translateY.value > 0)
                translateY.value = withSpring(0, springConfig(event.velocityY));
            else if (event.velocityY > 20 && translateY.value < HEIGHT * 0.9)
                translateY.value = withSpring(
                    HEIGHT * 0.9,
                    springConfig(event.velocityY),
                );
            else if (translateY.value < HEIGHT * 0.9 / 2)
                translateY.value = withSpring(0, springConfig(event.velocityY));
            else
                translateY.value = withSpring(
                    HEIGHT * 0.9,
                    springConfig(event.velocityY),
                );
        },
    });
    return (
        // <View style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "gray" }}>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <Animated.View style={{
                    width: width,
                    height: HEIGHT,
                    // backgroundColor: '#000',
                    position: "absolute",
                    bottom: 0,
                    transform: [{ translateY: translateY }]
                }}>
                    <View>
                        <Image style={{ width: width, aspectRatio : 1/0.7}} source={{ uri: "https://i.pinimg.com/564x/1a/0f/00/1a0f00231da447bb63b10af1bf9c1dcd.jpg" }} />
                    </View>
                    <View>
                        <FlatList
                        data={[1,2,3,4,5,6,7,8,9,10]}
                        renderItem={({item, index}) => {
                            return(
                                <View key={index} 
                                style={{
                                    width : width,
                                    height : 300,
                                    backgroundColor : "red",
                                    marginBottom : 10
                                }}
                                >

                                </View>
                            )
                        }}
                        />
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
        // </View>
    )
}

export default GestureVelocity