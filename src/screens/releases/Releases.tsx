import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Text,
  ImageBackground,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import releasesBg from "../../assets/screensBgs/releasesBg.png";
import { releasesStyles } from "./releasesStyles";
import Header from "../../components/header/Header";
import {
  getYearlyComicsAction,
  getComicsNewsAction,
  getComicByIdAction,
} from "../../store/actions/comicsActions/comicsActions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppState } from "../../store/store";
import { Comic, News } from "../../store/actions/actionsTypes/ActionsTypes";
import Loading from "../../components/loading/Loading";
import NewsList from "../../components/newsList/NewsList";
import { NavigationStackProp } from "react-navigation-stack";
import { color } from "../../utils/themes/colors";

type ReleasesProps = {
  navigation: NavigationStackProp;
  getComicsNews: typeof getComicsNewsAction;
  news: News[];
  getYearlyComics: typeof getYearlyComicsAction;
  yearlyComics: Comic[];
  getSelectedComic: typeof getComicByIdAction;
};

const Releases: React.FC<ReleasesProps> = ({
  navigation,
  getComicsNews,
  news,
  getYearlyComics,
  yearlyComics,
  getSelectedComic,
}) => {
  const styles = releasesStyles;

  const [offset, setOffset] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    news.length === 0 && getComicsNews();
    yearlyComics.length === 0 && getYearlyComics();
  }, []);

  const handleLoadMore = () => {
    setOffset(offset + 8);
    if (!loading) {
      getYearlyComics(offset);
      setLoading(true);
    }
  };  

  const handleComicPress = (item: Comic) => {
    getSelectedComic(item.id, yearlyComics);
    navigation.navigate("ComicDetails");
  };

  const renderComic = ({ item }) => (
    <TouchableOpacity
      style={styles.comicContainer}
      onPress={() => handleComicPress(item)}
    >
      <Image
        source={{
          uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
        }}
        style={styles.comic}
      />
      <Text numberOfLines={4} style={styles.comicTitle}>
        {item.title}
      </Text>
      <Text style={styles.comicSubtitle}>#{item.comicNumber}</Text>
      <Text style={styles.comicDate}>{item.modificationDate}</Text>
    </TouchableOpacity>
  );

  return (
      <>
        <Header />
        <NewsList news={news} />
        <ImageBackground
          source={releasesBg}
          imageStyle={styles.imageStyle}
          style={styles.flatlistCover}
        />
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-around" }}
          numColumns={2}
          bounces={false}
          keyExtractor={(item) => `Key-${item.id}`}
          data={yearlyComics}
          renderItem={renderComic}
          onMomentumScrollBegin={() => setLoading(false)}
          onEndReachedThreshold={0.7}
          onEndReached={handleLoadMore}
          ListFooterComponent={
            loading && <ActivityIndicator size="small" color={color.yellow} />
          }
        />
      </>
  );
};

const mapStateToProps = (state: AppState) => ({
  news: state.comics.comicsNews,
  yearlyComics: state.comics.yearlyComics,
});

const mapDispatchToProps = (dispatch) => ({
  getComicsNews: () => dispatch(getComicsNewsAction()),
  getYearlyComics: (offset: number) => dispatch(getYearlyComicsAction(offset)),
  getSelectedComic: (comicId: number, comics: Comic[]) =>
    dispatch(getComicByIdAction(comicId, comics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
