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
import {
  Comic,
  News,
  UserComics,
  User,
} from "../../store/actions/actionsTypes/ActionsTypes";
import NewsList from "../../components/newsList/NewsList";
import { NavigationStackProp } from "react-navigation-stack";
import { color } from "../../utils/themes/colors";
import {
  getUserComicsAction,
  getUserInfoAction,
} from "../../store/actions/userActions/userActions";

type ReleasesProps = {
  navigation: NavigationStackProp;
  getUserInfo: typeof getUserInfoAction;
  userInfo: User;
  getUserComics: typeof getUserComicsAction;
  userComics: UserComics;
  getComicsNews: typeof getComicsNewsAction;
  news: News[];
  getYearlyComics: typeof getYearlyComicsAction;
  yearlyComics: Comic[];
  getSelectedComic: typeof getComicByIdAction;
  selectedComic: Comic;
};

const Releases: React.FC<ReleasesProps> = ({
  navigation,
  getUserInfo,
  userInfo,
  getUserComics,
  userComics,
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
    userInfo.name.length === 0 && getUserInfo();
    userComics.whished.length === 0 && getUserComics();
  }, []);

  const handleLoadMore = () => {
    setOffset(offset + 8);
    if (!loading) {
      getYearlyComics(offset);
      setLoading(true);
    }
  };

  const handleComicPress = (item: Comic) => {
    getSelectedComic(item.id, false, yearlyComics);
    navigation.navigate("ComicDetails");
  };

  const renderComic = ({ item }) => {
    const title = item.title.split("#")[0]
    return(
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
        {title}
      </Text>
      <Text style={styles.comicSubtitle}>#{item.comicNumber}</Text>
      <Text style={styles.comicDate}>{item.modificationDate}</Text>
    </TouchableOpacity>
  )};

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
        data={yearlyComics}
        keyExtractor={(item) => `Key-${item.id}`}
        renderItem={renderComic}
        bounces={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        onMomentumScrollBegin={() => setLoading(false)}
        onEndReachedThreshold={0.7}
        onEndReached={handleLoadMore}
        ListFooterComponent={
          loading && (
            <ActivityIndicator
              size="small"
              color={color.yellow}
              style={{ marginBottom: "8%" }}
            />
          )
        }
      />
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  news: state.comics.comicsNews,
  yearlyComics: state.comics.yearlyComics,
  selectedComic: state.comics.selectedComic,
  userInfo: state.user.user,
  userComics: state.user.userComics,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfoAction()),
  getUserComics: () => dispatch(getUserComicsAction()),
  getComicsNews: () => dispatch(getComicsNewsAction()),
  getYearlyComics: (offset: number) => dispatch(getYearlyComicsAction(offset)),
  getSelectedComic: (comicId: number, boolean: boolean, comics: Comic[]) =>
    dispatch(getComicByIdAction(comicId, boolean, comics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
