import React, { useState } from "react";
import { FlatList, ImageBackground, Text, Animated, View } from "react-native";
import { News } from "../../store/actions/actionsTypes/ActionsTypes";
import { screenDimensions } from "../../utils/themes/sizes";
import { listStyles } from "./styles/listStyles";

type ListProps = {
  news: News[];
};

const NewsList: React.FC<ListProps> = ({ news }) => {
  const styles = listStyles;

  const [indicator] = useState(new Animated.Value(0));
  const [wholeWidth, setWholeWidth] = useState(1);
  const [visibleWidth, setVisibleWidth] = useState(0);

  const indicatorSize =
    wholeWidth > visibleWidth
      ? (visibleWidth * visibleWidth) / wholeWidth
      : visibleWidth;

  const difference =
    visibleWidth > indicatorSize ? visibleWidth - indicatorSize : 1;

  const renderNews = ({ item }) => (
    <ImageBackground
      source={{ uri: item.coverImage }}
      style={styles.coverImage}
      imageStyle={{ opacity: 0.15 }}
    >
      <Text
        // numberOfLines={4}
        style={[styles.title, { marginVertical: "2%" }]}
      >
        {item.title}
      </Text>
      <Text style={[styles.subtitle, { marginBottom: "5%" }]}>
        {item.source}
      </Text>
      <Text
        numberOfLines={screenDimensions.height < 670 ? 4 : 10}
        style={styles.body}
      >
        {item.body}
      </Text>
    </ImageBackground>
  );

  return (
    <View style={styles.newsContainer}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderNews}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(width) => {
          setWholeWidth(width);
        }}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => setVisibleWidth(width)}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: indicator } } },
        ])}
        pagingEnabled
      />
      <Animated.View
        style={[
          styles.indicator,
          {
            width: indicatorSize,
            transform: [
              {
                translateX: Animated.multiply(
                  indicator,
                  visibleWidth / wholeWidth
                ).interpolate({
                  inputRange: [0, difference],
                  outputRange: [0, difference],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default NewsList;
