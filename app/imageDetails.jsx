import { View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

const ImageDetails = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
                sharedTransitionTag="image" // Same sharedTransitionTag as the source
                style={{
                    width: 400,
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain',
                    backgroundColor: '#FFFFFF',
                }}
                source={{ uri: "https://i.pinimg.com/474x/ec/34/e0/ec34e040c2d9bf41b1ce24b48cdba399.jpg" }}
            />
        </View>
    );
};

export default ImageDetails;
