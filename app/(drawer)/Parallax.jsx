import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';

const { widht: WIDTH } = Dimensions.get('window');
const IMG_HEIGHT = 250;

const Parallax = () => {
    const scrollY = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollY.value = e.contentOffset.y;
    })
    // const scrollRef = useAnimatedRef();
    // const scrollOffset = useScrollViewOffset(scrollRef);
    const iStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT/2, 0, IMG_HEIGHT*0.25]
                    )
                },
                {
                    scale:interpolate(
                        scrollY.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1.5]
                    )
                }
            ]
        }
    })
    return (
        <View>
            {/* <Drawer.Screen 
            options={{
                headerTransparent : true,
                headerBackground : () => (<View style={{
                    backgroundColor:'red',
                    width : WIDTH,
                    height : 100
                    }}>
                    <Text>IMAGE</Text>
                </View>),
                headerLeft : () => <Text>BACK</Text>
            }}
            /> */}
            <Animated.ScrollView
                // ref={scrollRef}
                onScroll={handleScroll}
                bounces={true}
                scrollEventThrottle={16}
            >
                <Animated.Image style={[{
                    width: WIDTH,
                    height: IMG_HEIGHT,
                    objectFit: 'cover'
                }, iStyle]} source={{ uri: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600" }} />
                <View style={{
                    width: WIDTH,
                    height: 1000,
                    backgroundColor:'white'
                }}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquid vero accusamus veniam nemo. Sit explicabo sed deserunt quis, tenetur illum ex, enim soluta eligendi tempora tempore et repellat commodi.</Text>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default Parallax