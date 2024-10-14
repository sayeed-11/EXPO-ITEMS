import { View, Text, Dimensions, FlatList, Image, Animated } from 'react-native';
import React, { useState } from 'react';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';

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

const OVERFLOW_HEIGHT = 70;
const IMAGE_WIDTH = WIDTH * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 3;

const Index = () => {
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    // const [data, setData] = useState(DATA)

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();
    }, [scrollXIndex, scrollXAnimated]);
    // React.useEffect(() => {
    //     if (index === data.length - VISIBLE_ITEMS) {
    //         const newData = [...data, ...data]
    //         setData(newData);
    //     }
    // })
    return (
        <FlingGestureHandler
            key="left"
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                    if (index === data.length - 1) {
                        return;
                    }
                    setIndex(index + 1);
                    scrollXIndex.setValue(index + 1);
                }
            }}
        >
            <FlingGestureHandler
                key="right"
                direction={Directions.RIGHT}
                onHandlerStateChange={(ev) => {
                    if (ev.nativeEvent.state === State.END) {
                        if (index === 0) {
                            return;
                        }
                        setIndex(index - 1);
                        scrollXIndex.setValue(index - 1);
                    }
                }}
            >
                <View style={{ flex: 1 }}>
                    <OverFlowItems scrollXAnimated={scrollXAnimated} data={data} index={index} />
                    <StackCarousel scrollXAnimated={scrollXAnimated} data={data} />
                </View>
            </FlingGestureHandler>
        </FlingGestureHandler>
    );
};

export default Index;

const OverFlowItems = ({ scrollXAnimated, data }) => {
    // console.log(scrollXAnimated);

    return (
        <View style={{ overflow: 'auto', height: OVERFLOW_HEIGHT }}>
            {
                data.map((item, index) => {
                    const inputRange = [- 1, 0, 1];
                    const outputRange = [OVERFLOW_HEIGHT , 0, -OVERFLOW_HEIGHT];
                    const translateY = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange,
                    });
                    // const translateY = scrollXAnimated * index
                    const scale = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8]
                    })
                    const opacity = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5]
                    })
                    return (
                        <Animated.View
                            key={item.id}
                            style={[
                                { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: OVERFLOW_HEIGHT, padding: 10 },
                                { transform: [{ translateY }] },
                                // {opacity}
                            ]}
                        >
                            <View>
                                <Text style={{ fontSize: WIDTH * 0.06, fontWeight: '900' }}>{item.name}</Text>
                                <Text style={{ fontWeight: '500', color: 'rgba(0,0,0,0.5)' }}>{item.place}</Text>
                            </View>
                            <Text style={{ fontSize: WIDTH * 0.035 }}>{item.time}</Text>
                        </Animated.View>
                    )
                })
            }
            {/* <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()} // fix: convert id to string
                renderItem={({ item }) => {
                    const inputRange = [-1, 0, 1];
                    const outputRange = [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT];
                    const translateY = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange,
                    });
                    return (
                        <Animated.View
                            style={[
                                { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
                                { transform: [{ translateY }] },
                            ]}
                        >
                            <View>
                                <Text style={{ fontSize: WIDTH * 0.06, fontWeight: '900' }}>{item.name}</Text>
                                <Text style={{ fontWeight: '500', color: 'rgba(0,0,0,0.5)' }}>{item.place}</Text>
                            </View>
                            <Text style={{ fontSize: WIDTH * 0.035 }}>{item.time}</Text>
                        </Animated.View>
                    );
                }}
            /> */}
        </View>
    );
};

const StackCarousel = ({ scrollXAnimated, data }) => {
    // console.log(scrollXAnimated);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={data}
                horizontal
                inverted
                contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 20 }}
                scrollEventThrottle={16}
                scrollEnabled={false}
                removeClippedSubviews={false}
                CellRendererComponent={({ item, index, children, style, ...props }) => {
                    const newStyle = [style, { zIndex: data.length - index }];
                    return (
                        <View style={newStyle} index={index} {...props}>
                            {children}
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id.toString()} // fix: convert id to string
                renderItem={({ item, index }) => {
                    const inputRange = [index - 1, index, index + 1];
                    const translateX = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange: [50, 0, -500],
                    });
                    const scale = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 1.3],
                    });
                    const opacity = scrollXAnimated.interpolate({
                        inputRange,
                        outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 1],
                    });
                    return (
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: -IMAGE_WIDTH / 2,
                                transform: [{ translateX }, { scale }],
                                opacity,
                                borderRadius: 15,
                                overflow: 'hidden',
                                elevation: 20,
                                borderWidth: 2, borderColor: 'white'
                            }}
                        >
                            <Image style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }} source={{ uri: item.url }} />
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
};
