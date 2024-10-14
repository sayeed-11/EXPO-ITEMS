import { View, Text, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';



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

const PerspectiveCarousel = () => {
    const scrollX = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x;
    })
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Animated.FlatList
                onScroll={handleScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                removeClippedSubviews={false}
                data={data}
                pagingEnabled
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index }) => {
                    return (
                        <Card item={item} index={index} scrollX={scrollX} />
                    )
                }}
            />
        </View>
    )
}

export default PerspectiveCarousel


const Card = ({ item, index, scrollX }) => {
    const iStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [-WIDTH * 0.3, 0, WIDTH * 0.3],
                        Extrapolation.CLAMP
                    )
                },
                {
                    perspective: 100
                },
                {
                    rotateY: `${interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [-10, 0, 10], // Numeric interpolation,
                        Extrapolation.CLAMP
                    )}deg`, // Append 'deg' after interpolation

                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                        [0.8, 1, 0.8],
                        Extrapolation.CLAMP
                    )
                },
            ],
        }
    })

    const imgStyle = useAnimatedStyle(() => {
        return{
            borderRadius : interpolate(
                scrollX.value,
                [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
                [5, 20, 5]
            )
        }
    })
    return (
        <Animated.View style={[{
            width: WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
        }, iStyle]}>
            <Animated.Image  style={[{
                width: WIDTH * 0.75,
                aspectRatio: 1 / 1.5,
            }, imgStyle]} source={{ uri: item.url }} />
        </Animated.View>
    )
}





// const iStyle = useAnimatedStyle(() => {
//     return {
//         transform: [
//             {
//                 translateX: interpolate(
//                     scrollX.value,
//                     [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
//                     [-WIDTH * 0.5, 0, WIDTH * 0.5]
//                 )
//             }
//         ]
//     }
// })