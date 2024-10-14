import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const videoMinHeight = 60;
const videoMinWidth = 100;

const listData = Array(50)
  .fill(null)
  .map((x, i) => "https://i.pinimg.com/originals/f2/30/32/f23032b132911c95fd32c8a07e931d07.gif");

const ListItem = ({ onSelect }) => (
  <FlatList
    keyExtractor={(item, index) => String(index)}
    data={listData}
    renderItem={({ item }) => (
      <TouchableOpacity
        key={item}
        style={styles.row}
        onPress={() => onSelect(item)}
        activeOpacity={0.9}>
        <View style={styles.videoTumbnail}>
          <Image
            style={styles.tumbnail}
            source={{ uri: item }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Some title</Text>
        <Text style={styles.subTitle}>Some description</Text>
      </TouchableOpacity>
    )}
  />
);

const springConfig = velocity => {
  'worklet';
  return {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    velocity,
  };
};

function VideoPlayerContainer({
  translateY,
  movableHeight,
  selectedItem,
  onSelect,
  fetching,
}) {
  const videoMaxHeight = width * 0.6;
  const videoMaxWidth = width;
  const initialTranslateY = useSharedValue(100);
  const finalTranslateY = useSharedValue(0);
  const initialOpacity = useSharedValue(0);

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, movableHeight],
            [0, movableHeight],
          ),
        },
        { translateY: initialTranslateY.value },
        { translateY: finalTranslateY.value },
      ],
      opacity: initialOpacity.value,
    };
  });
  const animatedVideoStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [movableHeight - videoMinHeight, movableHeight],
        [videoMaxWidth, videoMinWidth],
        {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        },
      ),
      height: interpolate(
        translateY.value,
        [0, movableHeight - videoMinHeight, movableHeight],
        [videoMaxHeight, videoMinHeight + videoMinHeight, videoMinHeight],
        {
          extrapolateLeft: Extrapolation.CLAMP,
          extrapolateRight: Extrapolation.CLAMP,
        },
      ),
    };
  });
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      let newValue = event.translationY + ctx.startY;
      if (newValue > movableHeight) newValue = movableHeight;
      if (newValue < 0) newValue = 0;
      translateY.value = newValue;
    },
    onEnd: (evt, ctx) => {
      if (evt.velocityY < -20 && translateY.value > 0)
        translateY.value = withSpring(0, springConfig(evt.velocityY));
      else if (evt.velocityY > 20 && translateY.value < movableHeight)
        translateY.value = withSpring(
          movableHeight,
          springConfig(evt.velocityY),
        );
      else if (translateY.value < movableHeight / 2)
        translateY.value = withSpring(0, springConfig(evt.velocityY));
      else
        translateY.value = withSpring(
          movableHeight,
          springConfig(evt.velocityY),
        );
    },
  });

  useEffect(() => {
    initialTranslateY.value = withSpring(0, springConfig(20));
    initialOpacity.value = withSpring(1, springConfig(20));
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (translateY.value < movableHeight / 2) {
        translateY.value = withSpring(movableHeight, springConfig(40));
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [movableHeight]);

  const openVideo = () => {
    translateY.value = withSpring(0, springConfig(-20));
  };
  const onClose = () => {
    finalTranslateY.value = withSpring(videoMinHeight, springConfig(-20));
    setTimeout(() => onSelect(null), 150);
  };

  return (
    <Animated.View style={[styles.subContainer, animatedContainerStyles]}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={styles.fillWidth}>
          <TouchableOpacity
            style={styles.flexRow}
            activeOpacity={0.9}
            onPress={openVideo}>
            <Animated.View style={[animatedVideoStyles]}>
              <Image
                style={styles.tumbnail}
                source={{
                  uri: selectedItem,
                }}
                resizeMode="cover"
              />
            </Animated.View>
            <View>
              <Text style={styles.title}>Selected title</Text>
              <Text style={styles.subTitle}>Selected description</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.close}>
            <Button title="close" onPress={onClose} />
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.selectedItemDetails}>
        <Text style={styles.title}>Selected title</Text>
        <Text style={styles.subTitle}>Selected description</Text>
      </View>
      {fetching ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ListItem onSelect={onSelect} />
      )}
    </Animated.View>
  );
}

export default function YoutubeReanimated() {
  const [selectedItem, setSelectedVideo] = useState(null);
  const [fetching, setFetching] = useState(true);
  const containerHeight = useSharedValue(0);
  const translateY = useSharedValue(0);

  const movableHeight = useDerivedValue(() => {
    return containerHeight.value - videoMinHeight;
  });

  // clearing selected videoMinHeight, if you toggle full screen option
  useEffect(() => {
    setSelectedVideo(null);
  }, [containerHeight]);

  // on selecting an item -> open container, save item details, fetch relted details(dummy loading)
  // if choose same, just open container
  const onSelect = item => {
    if (!item) {
      setSelectedVideo(null);
      return;
    }
    if (item === selectedItem) {
      translateY.value = withSpring(0, springConfig(2));
      return;
    }
    translateY.value = withSpring(0, springConfig(2));
    setSelectedVideo(item);
    fetchData();
  };

  // dummy fetch to show loader
  const fetchData = () => {
    if (!fetching) setFetching(true);
    setTimeout(() => {
      setFetching(false);
    }, 500);
  };

  return (
    <View
      style={styles.flex}
      onLayout={e => (containerHeight.value = e.nativeEvent.layout.height)}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: 'https://www.versionmuseum.com/images/websites/youtube-website/youtube-website%5E2017%5Eyoutube-logo-redesign-cropped.jpg',
        }}
      />
      <ListItem onSelect={onSelect} />
      {selectedItem && (
        <VideoPlayerContainer
          translateY={translateY}
          movableHeight={movableHeight.value}
          selectedItem={selectedItem}
          onSelect={onSelect}
          fetching={fetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    overflow: 'hidden',
  },
  subContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fff',
  },
  fillWidth: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  row: {
    backgroundColor: '#fff',
  },
  tumbnail: {
    height: '100%',
    width: '100%',
  },
  videoTumbnail: {
    height: width / 2,
    backgroundColor: '#000',
  },
  title: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 13,
    color: '#aaa',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  selectedItemDetails: {
    backgroundColor: '#fff',
  },
  logo: {
    height: 50,
    width: 150,
  },
  close: {
    alignSelf: 'center',
  },
});