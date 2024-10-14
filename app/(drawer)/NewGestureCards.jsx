import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const data = [
    {
        id: 1,
        name: "Rose",
        url: "https://i.pinimg.com/564x/27/08/c8/2708c8dc25951a021e61b17e0ba49d5c.jpg",
        place: " Iran (Persia), France",
        time: "500 BC (ancient Persia)"
    },
    {
        id: 2,
        name: "Tulip",
        url: "https://i.pinimg.com/474x/79/9e/e5/799ee5b99de306f49891885994f545d3.jpg",
        place: "Netherlands",
        time: "1055 AD"
    },
    {
        id: 3,
        name: "Cherry Blossom (Sakura)",
        url: "https://i.pinimg.com/474x/c1/d2/69/c1d2697d907bff9752bb1d4c8618e41b.jpg",
        place: "Japan",
        time: "710 AD (Nara period in Japan)"
    },
    {
        id: 4,
        name: "Lotus",
        url: "https://i.pinimg.com/474x/3c/e4/55/3ce4555687e8e085dce6145386fb88c9.jpg",
        place: "India, Egypt",
        time: "1000 BC (ancient Egypt and India)"
    },
    {
        id: 5,
        name: "Daffodil",
        url: "https://i.pinimg.com/474x/93/bc/00/93bc0089f1874a0086c455efaddbadd2.jpg",
        place: "United Kingdom",
        time: "300 BC"
    },
    {
        id: 6,
        name: "Sunflower",
        url: "https://i.pinimg.com/474x/09/05/50/0905501e3eae0d8f1e8170913afd0c72.jpg",
        place: "United States, Russia",
        time: "1000 BC"
    },
    {
        id: 7,
        name: "Orchid",
        url: "https://i.pinimg.com/474x/cd/2c/60/cd2c60d81edbfe29dfc9dd1019581643.jpg",
        place: "Thailand, China",
        time: "1200 AD"
    },
    {
        id: 8,
        name: "Carnation",
        url: "https://i.pinimg.com/474x/20/d4/ce/20d4ce9e2294a310a933c99e83fb5c8f.jpg",
        place: "Spain, Italy",
        time: "200 AD"
    },
    {
        id: 9,
        name: "Jasmine",
        url: "https://i.pinimg.com/474x/d5/eb/58/d5eb58e965af611b56aa7c4a814c04d0.jpg",
        place: "India, Egypt",
        time: "500 AD"
    },
    {
        id: 10,
        name: "Lily",
        url: "https://i.pinimg.com/474x/66/f2/25/66f22505b4b6974f37543b296758dbad.jpg",
        place: "France, China",
        time: "2000 BC (ancient Greece and China)"
    },

]


const { width: WIDTH } = Dimensions.get('window');

const IMG_WIDTH = WIDTH * 0.8

const NewGestureCards = () => {
    const imageIndex = useSharedValue(0);
    return (
        <GestureHandlerRootView>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center'
            }}>
                {
                    data.map((item, index) => {
                        return (
                            <Card key={index} item={item} index={index} imageIndex={imageIndex} />
                        )
                    })
                }
            </View>
        </GestureHandlerRootView>
    )
}

export default NewGestureCards


const Card = ({ item, index, imageIndex }) => {
    const translateX = useSharedValue(0);
    const onGestureEventHandle = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: () => {
            if (translateX.value > 200) {
                if (imageIndex.value < data.length - 1) {
                    translateX.value = withTiming(500);
                } else {
                    translateX.value = withTiming(0);
                }
                imageIndex.value = withTiming(Math.min(imageIndex.value + 1, data.length - 1))
            } else if (translateX.value < -200) {
                if (imageIndex.value < data.length - 1) {
                    translateX.value = withTiming(-500);
                } else {
                    translateX.value = withTiming(0);
                }
                imageIndex.value = withTiming(Math.min(imageIndex.value + 1, data.length - 1))
            } else {
                translateX.value = withTiming(0);
            }
        }
    })
    const fadeBoxLeft = useAnimatedStyle(() => {
        return {

            opacity: interpolate(
                translateX.value,
                [0, -150],
                [0, 1]
            )
        }
    })
    const fadeBoxRight = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                translateX.value,
                [0, 150],
                [0, 1]
            )
        }
    })
    const iStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        imageIndex.value,
                        [index - 1, index, index + 1],
                        [-30, 0, 0]
                    )
                },
                {
                    scale: interpolate(
                        imageIndex.value,
                        [index - 1, index, index + 1],
                        [0.9, 1, 1]
                    )
                },
                {
                    translateX: translateX.value
                },
                {
                    rotate: `${interpolate(
                        translateX.value,
                        [-500, 0, 500],
                        [-15, 0, 15] // Numeric interpolation
                    )}deg`, // Append 'deg' after interpolation
                },
            ],
            opacity: interpolate(
                imageIndex.value,
                [index - 1, index, index + 1],
                [1 - 1 / 5, 1, 1]
            )
        }
    })
    return (
        <PanGestureHandler onGestureEvent={onGestureEventHandle}>
            <Animated.View style={[{
                position: 'absolute',
                borderRadius: 20,
                overflow: 'hidden',
                zIndex: data.length - index
            }, iStyle]}>
                <Image style={{
                    width: IMG_WIDTH,
                    aspectRatio: 1 / 1.5
                }} source={{ uri: item.url }} />
                <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems:'center'
                }, fadeBoxLeft]}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:WIDTH * 0.2}}>😢</Text>
                        <Text style={{fontSize:WIDTH * 0.1, color:'white'}}>SAD</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems:'center'
                }, fadeBoxRight]}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:WIDTH * 0.2}}>😃</Text>
                        <Text style={{fontSize:WIDTH * 0.1, color:'white'}}>HAPPY</Text>
                    </View>
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    )
}