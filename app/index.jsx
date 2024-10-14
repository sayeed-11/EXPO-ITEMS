import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Stack, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: WIDTH } = Dimensions.get('window');

const Index = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Image style={StyleSheet.absoluteFillObject} source={{ uri: "https://i.pinimg.com/474x/a8/66/68/a86668bd11f2821c49d5abebb7f2af05.jpg" }} />
            <LinearGradient style={[StyleSheet.absoluteFillObject, {

            }]} colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
                    <Text style={{ color: "#FFF", fontSize: WIDTH * 0.25 }}>42°</Text>
                    <Text style={{ color: "#FFF", fontSize: WIDTH * 0.1, fontWeight: 200 }}>Sunny</Text>
                    <View style={{flexDirection : 'row', gap:WIDTH * 0.05, marginTop : WIDTH * 0.1}}>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.04, opacity:0.5 }}>SUNDAY</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.04, opacity:0.5 }}>|</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.04, opacity:0.5 }}>OCT11</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.04, opacity:0.5 }}>|</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.04, opacity:0.5 }}>17:48</Text>
                    </View>
                </View>
                <View style={{ flex: 1,justifyContent: 'flex-end', paddingHorizontal : WIDTH * 0.07, gap : WIDTH * 0.05 , paddingBottom : WIDTH * 0.15 }}>
                    <Text style={{ color: "#FFF", fontSize: WIDTH * 0.05  }}>Guiling</Text>
                    <View style={{flexDirection : "row", gap : WIDTH * 0.05, alignItems:'center'}}>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.05, paddingHorizontal : WIDTH * 0.03,paddingVertical : WIDTH * 0.01,backgroundColor:'rgba(0,0,0,0.2)', borderRadius : 5  }}>48</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.05 }}>Heavy</Text>
                        <Text style={{ color: "#FFF", fontSize: WIDTH * 0.05 }}>East Wind</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Index;
