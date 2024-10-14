import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
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

const { width } = Dimensions.get('window')

// Create a separate component for the animated item
const AnimatedItem = ({ item, index, refValue, prevValue, currValue }) => {
    const iStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            refValue.value,
            [index - 1, index, index + 1],
            [0.9, 1, 1.3],
        )
        const translateY = interpolate(
            refValue.value,
            [index - 1, index, index + 1],
            [-30, 1, 500],
        )
        const opacity = interpolate(
            refValue.value,
            [index - 1, index, index + 1],
            [1 - 1 / 5, 1, 0],
            // [1, 1, 0],
        )
        return {
            transform: [{ translateY}, { scale }],
            opacity: opacity
        }
    })

    const iWidth = useAnimatedStyle(() => {
        return {
            width: interpolate(
                refValue.value,
                [index - 1, index, index + 1],
                [width * 0.90, width * 0.90, 0]
            )
        }
    })

    // useEffect(() =>{
    //     if(currValue.value === 5){

    //     }
    // })
    return (
        <FlingGestureHandler
            key={'down'}
            direction={Directions.DOWN}
            onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                    if (currValue.value !== data.length - 1) {
                        refValue.value = withTiming(currValue.value += 1); // Use withSpring to animate
                        prevValue.value = currValue.value;
                    }
                }
            }}
        >
            <FlingGestureHandler
                key={'left'}
                direction={Directions.LEFT}
                onHandlerStateChange={(ev) => {
                    if (ev.nativeEvent.state === State.END) {
                        if (currValue.value !== data.length - 1) {
                            refValue.value = withTiming(currValue.value += 1); // Use withSpring to animate
                            prevValue.value = currValue.value;
                        }
                    }
                }}
            >
                <FlingGestureHandler
                    key={'up'}
                    direction={Directions.UP}
                    onHandlerStateChange={ev => {
                        if (ev.nativeEvent.state === State.END) {
                            if (currValue.value !== 0) {
                                refValue.value = withTiming(currValue.value -= 1);
                                prevValue.value = currValue.value - 1;
                            }
                        }
                    }}
                >
                    <FlingGestureHandler
                        key={'right'}
                        direction={Directions.RIGHT}
                        onHandlerStateChange={ev => {
                            if (ev.nativeEvent.state === State.END) {
                                if (currValue.value !== 0) {
                                    refValue.value = withTiming(currValue.value -= 1);
                                    prevValue.value = currValue.value - 1;
                                }
                            }
                        }}
                    >
                        <Animated.View style={[iStyle, {
                            width: width * 0.8,
                            aspectRatio: 1 / 1.5,
                            position: "absolute",
                            zIndex: -index,
                            borderRadius: 20, overflow: 'hidden',
                            borderWidth : 2,
                            borderColor:'white',
                            elevation:20
                        }]}>
                            <Animated.Image
                                style={[{ width: '100%', height: '100%' }]}
                                source={{ uri: item.url }}
                            />
                            <TouchableOpacity onPress={() => {
                                console.log(index);

                            }} style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                // backgroundColor: 'red'
                            }} />
                        </Animated.View>
                    </FlingGestureHandler>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </FlingGestureHandler>
    )
}

const Carousel = () => {
    // const isTrue = true;
    const refValue = useSharedValue(0);
    const prevValue = useSharedValue(0);
    const currValue = useSharedValue(0);

    // const onScroll = useAnimatedScrollHandler((e) => {
    //     refValue.value = e.contentOffset.x
    // })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
            {
                data.map((item, index) => {
                    return (
                        <AnimatedItem key={index} item={item} index={index} refValue={refValue} prevValue={prevValue} currValue={currValue} />
                    )
                })
            }
        </View>
    )
}

export default Carousel