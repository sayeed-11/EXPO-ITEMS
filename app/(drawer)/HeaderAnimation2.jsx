import { View, Text, Animated, Dimensions, FlatList } from 'react-native'
import React from 'react'
import { useRef } from 'react'
import { Drawer } from 'expo-router/drawer';

const HeaderAnimation2 = () => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const diffClamp = Animated.diffClamp(scrollY, 0, 90)
    const translateY = diffClamp.interpolate({
        inputRange : [0, 90],
        outputRange : [0, -90]
})
  return (
    <View>
         <Drawer.Screen options={{
            headerShown:false
        }}/>
      <Animated.View style={{
        width : Dimensions.get('window').width,
        height:90,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        position:"absolute",
        top:0,
        transform:[{translateY : translateY}],
        zIndex:100
      }}>
        <Text>HEADER</Text>
      </Animated.View>
      <FlatList
      contentContainerStyle={{
        paddingTop : 90
      }}
      onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
      }}
      data={[1,2,3,4,5,6,7,8,9,10]}
      renderItem={({item}) => {
        return(
            <View key={item}
            style={{
                width: Dimensions.get('window').width,
                aspectRatio : 1/0.5,
                backgroundColor:'gray',
                marginBottom:10
            }}
            />
        )
      }}
      />
    </View>
  )
}

export default HeaderAnimation2