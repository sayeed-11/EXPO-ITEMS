import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';

const data = new Array(20).fill(0).map((item, index) => item + index);

const { width: WIDTH } = Dimensions.get('window')
const ScrollAnimation = () => {
    const [activeIndex, setIndex] = useState(0)
    const scrollRef = useRef();
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollToIndex({ index: activeIndex, animated: true });
        }
    }, [activeIndex])
    return (
        <View style={{
            gap: 10,
            flex: 1
        }}>
            <View>
                <FlatList
                    ref={scrollRef}
                    data={data}
                    initialScrollIndex={activeIndex}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => String(item)}
                    getItemLayout={(data, index) => (   // This calculates item layout for scrolling
                        {
                            length: WIDTH * 0.15,  // Item size
                            offset: ((WIDTH * 0.15) + 5) * index,  // Item's position
                            index,
                        }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                width: WIDTH * 0.15,
                                aspectRatio: 1,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: index === 0 ? 5 : 0,
                                marginRight: 5,
                                backgroundColor: activeIndex === index ? "black" : "white",
                            }}>
                                <Text style={{ color: activeIndex === index ? "white" : "black", }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={{
                flex: 1,
            }}>
                <FlatList
                    data={data}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item)}
                    onScroll={(e) => {
                        const idx = e.nativeEvent.contentOffset.y / ((WIDTH * 0.17) + 10 );
                        setIndex(Number(idx.toFixed(0)));
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{
                                width: WIDTH * 0.95,
                                height: WIDTH * 0.17,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: index === 0 ? 10 : 0,
                                marginBottom: 10,
                                backgroundColor: activeIndex === index ? "black" : "white",
                            }} onPress={() => setIndex(index)}>
                                <Text style={{ color: activeIndex === index ? "white" : "black", }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default ScrollAnimation