import React, { useEffect, useState } from "react";
import { db } from "../../../App";
import { connect } from "react-redux";
import { AppState } from "../../store/store";
import {
  Comic,
  Creator,
  UserComics,
} from "../../store/actions/actionsTypes/ActionsTypes";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Header from "../../components/header/Header";
import cartPlus from "../../assets/comic/cart-plus.png";
import addWhish from "../../assets/comic/add_whishlist.png";
import { comicDetailsStyles } from "./comicDetailsStyles";
import {
  getRelatedComicsByCreatorsIdAction,
  getComicByIdAction,
  resetRelatedComicsAction,
  resetSelectedComicAction,
} from "../../store/actions/comicsActions/comicsActions";
import { NavigationStackProp } from "react-navigation-stack";
import { color } from "../../utils/themes/colors";
import comicDetailsBg from "../../assets/screensBgs/comicDetailsBg.png";
import {
  getUserComicsAction,
} from "../../store/actions/userActions/userActions";
import Loading from "../../components/loading/Loading";

type ComicDetailsProps = {
  navigation: NavigationStackProp;
  getSelectedComic: typeof getComicByIdAction;
  selectedComic: Comic;
  resetSelectedComic: typeof resetSelectedComicAction;
  getRelatedComics: typeof getRelatedComicsByCreatorsIdAction;
  relatedComics: Comic[];
  resetRelatedComics: typeof resetRelatedComicsAction;
  getUserComics: typeof getUserComicsAction;
  userComics: UserComics;
};

const ComicDetails: React.FC<ComicDetailsProps> = ({
  navigation,
  getSelectedComic,
  resetSelectedComic,
  selectedComic,
  getRelatedComics,
  relatedComics,
  resetRelatedComics,
  getUserComics,
  userComics,
}) => {
  const styles = comicDetailsStyles;

  const [offset, setOffset] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWhish, setAddedToWhish] = useState(false);

  useEffect(() => {
    const comicFoundInCart = userComics.inCart.find(
      (comic) => comic.id === selectedComic.id
    );
    comicFoundInCart && setAddedToCart(true);

    const comicFoundInWhish = userComics.whished.find(
      (comic) => comic.id === selectedComic.id
    );
    comicFoundInWhish && setAddedToWhish(true);
  }, [selectedComic, userComics]);

  useEffect(() => {
    getRelatedComics(selectedComic.creators.items);
  }, [selectedComic]);

  useEffect(() => {
    return () => {
      resetRelatedComics();
      setAddedToCart(false);
      setAddedToWhish(false);
      resetSelectedComic();
    };
  }, []);

  const addToCartList = () => {
    try {
      db.collection("Cart").doc(selectedComic.title).set(selectedComic);
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  };

  const addToWhishes = () => {
    try {
      db.collection("Whishlist").doc(selectedComic.title).set(selectedComic);
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  };

  const handleLoadMore = () => {
    setOffset(offset + 8);
    if (!loading) {
      getRelatedComics(selectedComic.creators.items, offset);
      setLoading(true);
    }
  };

  const handleComicPress = (id: number) => {
    setAddedToCart(false);
    setAddedToWhish(false);
    getSelectedComic(id, relatedComics);
    navigation.navigate("ComicDetails");
  };

  const renderComic = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleComicPress(item.id)}
      style={styles.comicListContainer}
    >
      <Image
        source={{
          uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
        }}
        style={styles.comic}
      />
      <View style={styles.comicDescriptionContainer}>
        <Text numberOfLines={4} style={styles.comicTitle}>
          {item.title}
        </Text>
        <Text style={styles.comicSubtitle}>#{item.comicNumber}</Text>
        <Text style={styles.comicDetails}>{item.modificationDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header />
      {selectedComic ? (
        <ImageBackground source={comicDetailsBg} style={styles.background}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* HEADING */}
            <View style={styles.headingContainer}>
              <View style={styles.comicContainer}>
                <Image
                  source={{
                    uri: `${selectedComic.thumbnail.path}/portrait_xlarge.jpg`,
                  }}
                  style={styles.comicInHeading}
                />
                {selectedComic.pageCount !== 0 ? (
                  <Text style={styles.comicDetails}>
                    {selectedComic.pageCount} pages
                  </Text>
                ) : null}
              </View>
              <View style={styles.titlesContainer}>
                <Text style={[styles.title, { position: "absolute" }]}>
                  {selectedComic.title}
                </Text>
                {selectedComic.price !== 0 ? (
                  <Text
                    style={[styles.title, { position: "absolute", top: "40%" }]}
                  >
                    Cost: {selectedComic.price} $
                  </Text>
                ) : null}
                {/* BUTTONS */}
                <View style={{ position: "absolute", bottom: "6%" }}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: addedToCart ? "#4EAF24" : color.yellow,
                      },
                    ]}
                    onPress={() => addToCartList()}
                  >
                    <View style={styles.btnTextContainer}>
                      <Text style={styles.btnText}>
                        {addedToCart ? "Added to Cart" : "Add to Cart"}
                      </Text>
                    </View>
                    <View style={styles.btnIconContainer}>
                      <Image source={cartPlus} style={styles.btnIcon} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: addedToWhish
                          ? "#4EAF24"
                          : color.yellow,
                      },
                    ]}
                    onPress={() => addToWhishes()}
                  >
                    <View style={styles.btnTextContainer}>
                      <Text style={styles.btnText}>
                        {addedToWhish ? "Added to Whishes" : "Add to Whishlist"}
                      </Text>
                    </View>
                    <View style={styles.btnIconContainer}>
                      <Image source={addWhish} style={styles.btnIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* DETAILS */}
            <View style={styles.detailsContainer}>
              {selectedComic.description !== null ? (
                <>
                  <Text style={[styles.title, { marginBottom: "5%" }]}>
                    Summary
                  </Text>
                  <Text
                    numberOfLines={8}
                    style={[styles.comicSubtitle, { marginBottom: "5%" }]}
                  >
                    {selectedComic.description.replace(/<br>/gi, "")}
                  </Text>
                </>
              ) : null}

              <Text style={[styles.title, { marginBottom: "5%" }]}>
                Creators
              </Text>
              <View>
                {selectedComic.creators.items.map((creator) => (
                  <Text
                    key={creator.name}
                    style={[styles.comicSubtitle, { marginBottom: "0.5%" }]}
                  >
                    {"   "}· {creator.name}{" "}
                    {creator.role && ` -  ${creator.role}`}
                  </Text>
                ))}
              </View>
              {relatedComics.length > 0 ? (
                <>
                  <Text style={[styles.title, { marginVertical: "5%" }]}>
                    Related Comics
                  </Text>
                  <FlatList
                    data={relatedComics}
                    keyExtractor={(item) => `Key-${item.id}`}
                    renderItem={renderComic}
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 5 }}
                    onMomentumScrollBegin={() => setLoading(false)}
                    onEndReachedThreshold={0.7}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={
                      loading && (
                        <ActivityIndicator size="small" color={color.yellow} />
                      )
                    }
                  />
                </>
              ) : null}
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Loading />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedComic: state.comics.selectedComic,
  relatedComics: state.comics.relatedComics,
  userComics: state.user.userComics,
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedComic: (comicId: number, comics: Comic[]) =>
    dispatch(getComicByIdAction(comicId, comics)),
  resetSelectedComic: () => dispatch(resetSelectedComicAction()),
  getRelatedComics: (creators: Creator[], offset: number) =>
    dispatch(getRelatedComicsByCreatorsIdAction(creators, offset)),
  resetRelatedComics: () => dispatch(resetRelatedComicsAction()),
  getUserComics: () => dispatch(getUserComicsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);
