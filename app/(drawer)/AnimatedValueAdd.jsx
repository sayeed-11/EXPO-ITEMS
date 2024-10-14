import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'

const AnimatedValueAdd = () => {
    const [number, setNumber] = useState(["0"]);
    const translateX = useSharedValue(-23);
    useEffect(() => {
        translateX.value = withTiming(-23 * number.length);
    }, [number])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20
        }}>
            <Animated.View style={{
                // backgroundColor:'gray',
                width: Dimensions.get('window').width,
                height: 70,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor:'gray',
                position:"absolute",
                bottom:100,
                right : '-100%',
                transform:[{translateX : translateX  }]
            }}>
                {
                    number.map((item, index) => {
                        return (
                            <AnimText key={index} item={item} />
                        )
                    })
                }
            </Animated.View>
            <View style={{
                flexDirection: 'row',
                gap: 10
            }}>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setNumber([...number, "1"]) }}>
                    <Text>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setNumber([...number, "2"]) }}>
                    <Text>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setNumber([...number, "3"]) }}>
                    <Text>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setNumber([...number, "4"]) }}>
                    <Text>4</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {
                setNumber(number.slice(0, -1))
            }} style={{
                width : 200,
                height : 30,
                backgroundColor : 'yellow'
            }}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setNumber(["0"])
            }} style={{
                width : 200,
                height : 30,
                backgroundColor : 'yellow'
            }}>
                <Text>Remove all</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AnimatedValueAdd


const AnimText = ({ item }) => {
    const scale = useSharedValue(0);
    const translateX = useSharedValue(10);
    
    useEffect(() => {
    scale.value = withTiming(1 );
    translateX.value =withTiming(0 , {duration : 200});
    },[])
    return (
        <Animated.Text style={[{
            // backgroundColor:'yellow',
            fontSize: 40,

        }, {transform : [
            {scale : scale}
        ]}]}>{item}</Animated.Text>
    )
}