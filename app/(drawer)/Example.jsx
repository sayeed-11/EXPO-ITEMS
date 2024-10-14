import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Animated, StyleSheet } from 'react-native';

const AnimatedComponent = () => {
  const [count, setCount] = useState(0); // Value that controls the animation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale set to 1

  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Animation that depends on 'count' value
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.5, // Scale up to 1.5
      friction: 2,  // Control the bounciness
      useNativeDriver: true,
    }).start(() => {
      // Reset animation back to original size after animation completes
      Animated.spring(scaleAnim, {
        toValue: 1, // Scale back to 1
        useNativeDriver: true,
      }).start();
    });
  }, [count]); // Trigger the effect whenever 'count' changes

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.countText}>{count}</Text>
      </Animated.View>
      <Button title="Increment Count" onPress={incrementCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  countText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default AnimatedComponent;
