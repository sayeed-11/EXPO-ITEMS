import { View, Text, TouchableNativeFeedback, Animated } from 'react-native'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const Decay = () => {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const call = () => {
        Animated.spring(
            position,
            {
                toValue: { x: 50, y: 100 },
                // duration: 300,
                useNativeDriver: true,
                damping:8,
                speed : 2,
                // bounciness : 10
            }
        ).start();
    }
    return (
        <View style={{
            flex: 1,
            // justifyContent:'center',
            // alignItems:'center'
        }}>
            <AnimatedView style={[{
                width: 300,
                height: 70,
                backgroundColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                transform: [
                    {
                        translateX: position.x
                    },
                    {
                        translateY: position.y
                    }
                ]
            }]}>
                <Text>BOX</Text>
            </AnimatedView>

            <TouchableOpacity 
            style={{
                position:'absolute',
                bottom:20,
                left:20
            }} onPress={call}>
                <Text>CALL</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Decay