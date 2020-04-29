import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { db } from "../../../App";
import { connect } from "react-redux";
import { AppState } from "../../store/store";
import {
  Comic,
  Creator,
  UserComics,
  Character,
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
  addComicToCartAction,
  getSelectedComicIdAction,
  resetSelectedComicIdAction,
} from "../../store/actions/comicsActions/comicsActions";
import { NavigationStackProp } from "react-navigation-stack";
import { color } from "../../utils/themes/colors";
import comicDetailsBg from "../../assets/screensBgs/comicDetailsBg.png";
import { getUserComicsAction } from "../../store/actions/userActions/userActions";
import Loading from "../../components/loading/Loading";
import {
  getSelectedComicIdInCharacterAction,
  addComicFromCharacterAction,
  resetSelectedComicIdInCharacterAction,
  setFromCharacterAction,
  resetFromCharacterAction,
} from "../../store/actions/charactersActions/charactersActions";

type ComicDetailsProps = {
  navigation: NavigationStackProp;
  yearlyComics: Comic[];
  getRelatedComics: typeof getRelatedComicsByCreatorsIdAction;
  resetRelatedComics: typeof resetRelatedComicsAction;
  relatedComics: Comic[];
  getUserComics: typeof getUserComicsAction;
  userComics: UserComics;
  getSelectedComic: typeof getComicByIdAction;
  resetSelectedComic: typeof resetSelectedComicAction;
  selectedComic: Comic;
  getSelectedComicId: typeof getSelectedComicIdAction;
  resetSelectedComicId: typeof resetSelectedComicIdAction;
  selectedComicId: number;
  selectedCharacter: Character;
  getComicIdFromCharacter: typeof getSelectedComicIdInCharacterAction;
  resetSelectedComicIdInCharacter: typeof resetSelectedComicIdInCharacterAction;
  comicIdFromCharacter: number;
  addComicToCart: typeof addComicToCartAction;
  fromCharacter: boolean;
  resetFromCharacter: typeof resetFromCharacterAction;
  addComicFromCharacter: typeof addComicFromCharacterAction;
};

const ComicDetails: React.FC<ComicDetailsProps> = ({
  navigation,
  yearlyComics,
  getRelatedComics,
  resetRelatedComics,
  relatedComics,
  getUserComics,
  userComics,
  getSelectedComic,
  resetSelectedComic,
  selectedComic,
  getSelectedComicId,
  resetSelectedComicId,
  selectedComicId,
  selectedCharacter,
  getComicIdFromCharacter,
  resetSelectedComicIdInCharacter,
  comicIdFromCharacter,
  addComicToCart,
  fromCharacter,
  resetFromCharacter,
  addComicFromCharacter,
}) => {
  const styles = comicDetailsStyles;

  const [offset, setOffset] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWhish, setAddedToWhish] = useState(false);
  const [comparisonArray, setComparisonArray] = useState<Comic[] | Character[]>(
    []
  );
  const [comicId, setComicId] = useState(0);
  const [comicInRelated, setComicInRelated] = useState(false);

  useEffect(() => {
    fromCharacter
      ? getComicIdFromCharacter(selectedComic)
      : getSelectedComicId(selectedComic);
    relatedComics.length === 0 &&
      getRelatedComics(selectedComic.creators.items);
  }, [selectedComic]);

  useEffect(() => {
    fromCharacter
      ? setComicId(comicIdFromCharacter)
      : setComicId(selectedComicId);
  }, [selectedComicId, comicIdFromCharacter]);

  useEffect(() => {
    const comicFoundInCart = userComics.inCart.find(
      (comic) => comic.id === comicId
    );
    comicFoundInCart && setAddedToCart(true);
    const comicFoundInWhish = userComics.whished.find(
      (comic) => comic.id === comicId
    );
    comicFoundInWhish && setAddedToWhish(true);
  }, [comicId, userComics]);

  useEffect(() => {
    !comicInRelated
      ? setComparisonArray(yearlyComics)
      : setComparisonArray(relatedComics);
  }, [comicInRelated, yearlyComics, relatedComics]);

  useEffect(() => {
    const selected = fromCharacter
      ? selectedCharacter.comics.items.find(
          (comic) => parseInt(comic.id, 10) === comicId
        )
      : comparisonArray.find((comic) => comic.id === comicId);

    try {
      selected !== undefined &&
        db
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .collection("Cart")
          .doc(selected.title)
          .set(selected);
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  }, [fromCharacter, selectedCharacter.comics.items, comparisonArray]);

  useEffect(() => {
    return () => {
      resetRelatedComics();
      resetFromCharacter();
      setAddedToCart(false);
      setAddedToWhish(false);
      resetSelectedComic();
      resetSelectedComicId();
      resetSelectedComicIdInCharacter();
    };
  }, []);

  const addToCartList = () => {
    fromCharacter
      ? addComicFromCharacter(selectedComic)
      : addComicToCart(selectedComic);
  };

  const addToWhishes = () => {
    try {
      db.collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .collection("Whishlist")
        .doc(selectedComic.title)
        .set(selectedComic);
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
    resetFromCharacter();
    resetSelectedComic();
    resetSelectedComicId();
    resetSelectedComicIdInCharacter();
    getSelectedComic(id, false, relatedComics);
    setComicInRelated(true);
    navigation.navigate("ComicDetails");
  };

  const renderComic = ({ item }) => {
    const title = item.title.split("#")[0];
    return (
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
          <Text numberOfLines={2} style={styles.comicTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.comicSubtitle}>#{item.comicNumber}</Text>
          <Text style={styles.comicDetails}>{item.modificationDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
                    onPress={addToCartList}
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
  yearlyComics: state.comics.yearlyComics,
  relatedComics: state.comics.relatedComics,
  userComics: state.user.userComics,
  selectedComic: state.comics.selectedComic,
  selectedComicId: state.comics.selectedComicId,
  selectedCharacter: state.characters.singleCharacter,
  fromCharacter: state.characters.fromCharacter,
  comicIdFromCharacter: state.characters.selectedComicId,
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedComic: (comicId: number, boolean: boolean, comics: Comic[]) =>
    dispatch(getComicByIdAction(comicId, boolean, comics)),
  getSelectedComicId: (selectedComic: Comic) =>
    dispatch(getSelectedComicIdAction(selectedComic)),
  resetSelectedComicId: () => dispatch(resetSelectedComicIdAction()),
  getComicIdFromCharacter: (selectedComic: Comic) =>
    dispatch(getSelectedComicIdInCharacterAction(selectedComic)),
  resetSelectedComicIdInCharacter: () =>
    dispatch(resetSelectedComicIdInCharacterAction()),
  addComicToCart: (selectedComic: Comic) =>
    dispatch(addComicToCartAction(selectedComic)),
  resetFromCharacter: () => dispatch(resetFromCharacterAction()),
  addComicFromCharacter: (selectedComic: Comic) =>
    dispatch(addComicFromCharacterAction(selectedComic)),
  resetSelectedComic: () => dispatch(resetSelectedComicAction()),
  getRelatedComics: (creators: Creator[], offset: number) =>
    dispatch(getRelatedComicsByCreatorsIdAction(creators, offset)),
  resetRelatedComics: () => dispatch(resetRelatedComicsAction()),
  getUserComics: () => dispatch(getUserComicsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);
