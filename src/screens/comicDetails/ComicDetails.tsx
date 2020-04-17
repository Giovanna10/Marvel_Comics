import React, { useEffect, useState } from "react";
import { db } from "../../../App";
import { connect } from "react-redux";
import { AppState } from "../../store/store";
import { Comic, Creator } from "../../store/actions/actionsTypes/ActionsTypes";
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
import addWhish from "../../assets/comic/add_wishlist.png";
import { comicDetailsStyles } from "./comicDetailsStyles";
import {
  getRelatedComicsByCreatorsIdAction,
  getComicByIdAction,
  setComponentUnmountAction,
} from "../../store/actions/comicsActions/comicsActions";
import { NavigationStackProp } from "react-navigation-stack";
import { color } from "../../utils/themes/colors";
import comicDetailsBg from "../../assets/screensBgs/comicDetailsBg.png";

type ComicDetailsProps = {
  navigation: NavigationStackProp;
  getSelectedComic: typeof getComicByIdAction;
  selectedComic: Comic;
  getRelatedComics: typeof getRelatedComicsByCreatorsIdAction;
  relatedComics: Comic[];
  setComponentUnmount: typeof setComponentUnmountAction;
};

const ComicDetails: React.FC<ComicDetailsProps> = ({
  navigation,
  getSelectedComic,
  selectedComic,
  getRelatedComics,
  relatedComics,
  setComponentUnmount,
}) => {
  const styles = comicDetailsStyles;

  const addToCart = (title: string, comic: Comic) => {
    try {
      db.collection("Cart").doc(title).set(comic);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToWishes = (title: string, comic: Comic) => {
    try {
      db.collection("Wishlist").doc(title).set(comic);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [offset, setOffset] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRelatedComics(selectedComic.creators.items);
    return () => setComponentUnmount();
  }, [getRelatedComics, selectedComic]);

  const handleLoadMore = () => {
    setOffset(offset + 8);
    if (!loading) {
      getRelatedComics(selectedComic.creators.items, offset);
      setLoading(true);
    }
  };

  const handleComicPress = (item: Comic) => {
    getSelectedComic(item.id, relatedComics);
    navigation.navigate("ComicDetails");
  };

  const renderComic = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleComicPress(item)}
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

  console.log(relatedComics);


  return (
    <>
      <Header />
      <ImageBackground source={comicDetailsBg} style={styles.background}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* HEADING */}
          <View style={styles.headingContainer}>
            <View style={styles.comicContainer}>
              <Image
                source={{
                  uri: `${selectedComic.thumbnail.path}/portrait_xlarge.jpg`,
                }}
                style={styles.comicInHeading}
              />
              <Text style={styles.comicDetails}>
                {selectedComic.pageCount} pages
              </Text>
            </View>
            <View style={styles.titlesContainer}>
              <Text style={styles.title}>{selectedComic.title}</Text>
              <Text
                style={[
                  styles.title,
                  {
                    marginVertical:
                      selectedComic.title.length > 40
                        ? "10%"
                        : selectedComic.title.length > 19
                          ? "15%"
                          : "20%",
                  },
                ]}
              >
                Cost: {selectedComic.price} $
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(selectedComic.title, selectedComic)}
              >
                <View style={styles.btnTextContainer}>
                  <Text style={styles.btnText}>Add to Cart</Text>
                </View>
                <View style={styles.btnIconContainer}>
                  <Image source={cartPlus} style={styles.btnIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToWishes(selectedComic.title, selectedComic)}
              >
                <View style={styles.btnTextContainer}>
                  <Text style={styles.btnText}>Add to Whishlist</Text>
                </View>
                <View style={styles.btnIconContainer}>
                  <Image source={addWhish} style={styles.btnIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* DETAILS */}
          <View style={styles.detailsContainer}>
            {selectedComic.description !== null ? (
              <>
                <Text style={[styles.title, { marginBottom: "5%" }]}>
                  Summary
                </Text>
                <Text style={[styles.comicSubtitle, { marginBottom: "5%" }]}>
                  {selectedComic.description}
                </Text>
              </>
            ) : null}

            <Text style={[styles.title, { marginBottom: "5%" }]}>Creators</Text>
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
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedComic: state.comics.selectedComic,
  relatedComics: state.comics.relatedComics,
});

const mapDispatchToProps = (dispatch) => ({
  getSelectedComic: (comicId: number, comics: Comic[]) =>
    dispatch(getComicByIdAction(comicId, comics)),
  getRelatedComics: (creators: Creator[], offset: number) =>
    dispatch(getRelatedComicsByCreatorsIdAction(creators, offset)),
  setComponentUnmount: () => dispatch(setComponentUnmountAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComicDetails);
