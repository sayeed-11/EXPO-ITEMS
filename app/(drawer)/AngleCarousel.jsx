import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

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
const INFO_HEIGHT = 100


const AngleCarousel = () => {
    const scrollX = useSharedValue(0);
    const scrollToY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x;
        scrollToY.value = Number((e.contentOffset.x / WIDTH));
    })
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                flex: 0.7
            }}>
                <Animated.FlatList
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={WIDTH}
                    scrollEventThrottle={16}
                    removeClippedSubviews={false}
                    onScroll={handleScroll}
                    data={data}
                    key={(item) => String(item.id)}
                    renderItem={({ item, index }) => <Card item={item} index={index} scrollX={scrollX} />}
                />
            </View>
            <View style={{
                width: WIDTH,
                height: INFO_HEIGHT,
                // backgroundColor: 'rgba(0,0,0,0.015)',
                overflow: 'hidden',
                flex: 0.3,
                transform: [{
                    translateY: -70
                }]
            }}>
                {
                    data.map((item, index) => {
                        return (
                            <Info key={index} item={item} index={index} scrollToY={scrollToY} />
                        )
                    })
                }
            </View>
        </View>
    )
}

export default AngleCarousel

const Card = ({ item, index, scrollX }) => {
    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [-WIDTH * 0.17, 0, WIDTH * 0.17],
                        Extrapolation.CLAMP
                    )
                },
                {
                    translateY: interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [40, 0, 40],
                        Extrapolation.CLAMP
                    )
                },
                {
                    rotate: `${interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [15, 0, -15],
                        Extrapolation.CLAMP
                    )
                        }deg`
                },

            ]
        }
    })
    return (
        <View style={{ width: WIDTH, justifyContent: 'center', alignItems: 'center', position: 'relatives' }}>
            <Animated.View style={[
                {
                    width: WIDTH * 0.7,
                    aspectRatio: 1 / 1.3,
                    borderRadius: 20,
                    transformOrigin: 'center',
                    // overflow: 'hidden',
                    borderWidth: 5,
                    borderColor: 'white',
                    elevation: 10
                },
                cardStyle
            ]} >
                <Image style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 18,
                }} source={{ uri: item.url }} />
                <TouchableOpacity style={{
                    backgroundColor: 'white',
                    zIndex: 100,
                    position: 'absolute',
                    padding: 10,
                    bottom: -20,
                    borderRadius: 100,
                    right: 20,
                    elevation: 5
                }}>
                    <Ionicons name='heart-outline' size={24} color={'black'} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}


const Info = ({ item, index, scrollToY }) => {
    const infoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: -scrollToY.value * INFO_HEIGHT
                },
                {
                    scale: interpolate(
                        scrollToY.value,
                        [(index - 1), index, (index + 1)],
                        [0, 1, 0],
                        Extrapolation.CLAMP
                    )
                },
            ],

            opacity: interpolate(
                scrollToY.value,
                [(index - 1), index, (index + 1)],
                [0, 1, 0],
                Extrapolation.CLAMP
            )

        }
    })
    return (
        <Animated.View style={[{
            width: WIDTH,
            height: INFO_HEIGHT,
            justifyContent: 'center',
            alignItems: "center",
            padding: 20
        }, infoStyle]}>
            <Text style={{ fontSize: WIDTH * 0.07 }}>{item.name}</Text>
            <Text>{item.place}</Text>
            <Text>{item.time}</Text>
        </Animated.View>
    )
}