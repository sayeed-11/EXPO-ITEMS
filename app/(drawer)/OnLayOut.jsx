import { View, Text, Dimensions, Alert } from 'react-native';
import React from 'react';

const { width: WIDTH } = Dimensions.get('window');

const OnLayOut = () => {
    const onLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        console.log(`x: ${x}, y: ${y}, width: ${width}, height: ${height}`);
    };

    const handleMagicTap = () => {
        Alert.alert('Magic Tap Activated', 'You triggered the magic tap action!');
    };

    return (
        <View>
            <View
                onLayout={onLayout}
                style={{
                    width: WIDTH,
                    height: 200, // Fixed or dynamic height to ensure layout works
                    // backgroundColor: 'red',
                    padding: 20, // Reduced padding to prevent layout issues
                }}
            
            >
               <Text dataDetectorType={'link'} selectionColor={'red'} selectable={true}>0123456789</Text>
            </View>
        </View>
    );
};

export default OnLayOut;
