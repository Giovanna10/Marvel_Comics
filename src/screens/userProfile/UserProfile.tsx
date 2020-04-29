import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  getUserComicsAction,
  getSelectedComicIdInCartAction,
  getComicInCartByIdAction,
  resetSelectedComicInCartAction,
  resetSelectedComicIdInCartAction,
  addComicFromWhishesAction,
} from "../../store/actions/userActions/userActions";
import { AppState } from "../../store/store";
import {
  UserComics,
  Comic,
} from "../../store/actions/actionsTypes/ActionsTypes";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/header/Header";
import redTrash from "../../assets/red-trash-can-outline.png";
import yellowCart from "../../assets/yellow-cart.png";
import profileStyle from "./profileStyles";
import { color } from "../../utils/themes/colors";
import QuantityModal from "../../components/quantityModal/QuantityModal";
import { openQuantityModalAction } from "../../store/actions/cartActions/cartActions";
import { db } from "../../../App";
import { SafeAreaView } from "react-navigation";
import {
  addComicToCartAction,
  removeComicFromCartAction,
  resetSelectedComicIdAction,
} from "../../store/actions/comicsActions/comicsActions";
import { screenDimensions } from "../../utils/themes/sizes";

type ProfileProps = {
  userLogged: boolean;
  getUserComics: typeof getUserComicsAction;
  userComics: UserComics;
  addComicFromWhishes: typeof addComicFromWhishesAction;
  removeComicFromCart: typeof removeComicFromCartAction;
  openQuantityModal: typeof openQuantityModalAction;
  openModal: boolean;
  getComicInCartById: typeof getComicInCartByIdAction;
  resetSelectedComic: typeof resetSelectedComicInCartAction;
  selectedComicInCart: Comic;
  getSelectedComicId: typeof getSelectedComicIdInCartAction;
  resetSelectedComicId: typeof resetSelectedComicIdAction;
  selectedComicIdInCart: number;
  yearlyComics: Comic[];
  relatedComics: Comic[];
};

const Profile: React.FC<ProfileProps> = ({
  getUserComics,
  userComics,
  addComicFromWhishes,
  removeComicFromCart,
  openQuantityModal,
  openModal,
  getComicInCartById,
  resetSelectedComic,
  selectedComicInCart,
  getSelectedComicId,
  resetSelectedComicId,
  selectedComicIdInCart,
}) => {
  const styles = profileStyle;
    
  const [selected, setSelected] = useState<Comic>({
    id: 0,
    title: "",
    comicNumber: "",
    description: "",
    modificationDate: "",
    creationDate: "",
    pageCount: 0,
    price: 0,
    thumbnail: { path: "", extension: "" },
    images: [],
    creators: { items: [], returned: 0 },
    characters: [],
    qtyInCart: 0,
  });

  useEffect(() => {
    getSelectedComicId(selectedComicInCart);
  }, [selectedComicInCart]);

  useEffect(() => {
    const selectedInWhishes = userComics.whished.find(
      (comic) => comic.id === selectedComicIdInCart
    );
    setSelected(selectedInWhishes);
  }, [userComics.whished, selectedComicIdInCart]);

  useEffect(() => {
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
    try {
      selected !== undefined &&
        db
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .collection("Whishlist")
          .doc(selected.title)
          .delete();
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  }, [selected]);

  useEffect(() => {
    return () => {
      resetSelectedComic();
      resetSelectedComicId();
    };
  }, []);

  const addToCartList = (id: number, item: Comic) => {
    resetSelectedComic();
    resetSelectedComicId();
    getSelectedComicId(item);
    addComicFromWhishes(item);
    getComicInCartById(id, userComics.whished);
  };

  const deleteComicFromWishList = (id: number) => {
    const comicFoundInWhish = userComics.whished.find(
      (comic) => comic.id === id
    );
    try {
      db.collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .collection("Whishlist")
        .doc(comicFoundInWhish.title)
        .delete();
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  };

  const deleteComicFromCart = (id: number, item: Comic) => {
    getSelectedComicId(item);
    const comicFoundInCart = userComics.inCart.find((comic) => comic.id === id);
    removeComicFromCart(comicFoundInCart);
    try {
      db.collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .collection("Cart")
        .doc(comicFoundInCart.title)
        .delete();
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
  };

  const handleQuantityInCart = (comicId: number) => {
    getComicInCartById(comicId, userComics.inCart);
    getSelectedComicId(selectedComicInCart);
    openQuantityModal();
  };

  const renderWhishedComics = ({ item, index }) => {
    return (
      <View style={styles.comic_separator_container}>
        {/* COMIC */}
        <View style={styles.comicContainerWhish}>
          <Image
            source={{
              uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
            }}
            style={styles.comic}
          />
          <View style={styles.comicDescriptionContainer}>
            <Text numberOfLines={2} style={styles.comicTitle}>
              {item.title}
            </Text>
            {item.price !== 0 && (
              <Text style={styles.comicDetails}>Price: {item.price} $</Text>
            )}
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => addToCartList(item.id, item)}
              style={styles.leftIconContainer}
            >
              <Image source={yellowCart} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteComicFromWishList(item.id)}
              style={styles.rightIconContainer}
            >
              <Image source={redTrash} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* SEPARATOR */}
        {index < userComics.whished.length - 1 ? (
          <View style={styles.verticalSeparator} />
        ) : null}
      </View>
    );
  };

  const renderCartComics = ({ item, index }) => {
    return (
      <View style={styles.comic_separator_container}>
        {/* COMIC */}

        <View style={styles.comicContainerCart}>
          {item.thumbnail !== undefined ? (
            <>
              <Image
                source={{
                  uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
                }}
                style={styles.comic}
              />
              <View style={styles.comicDescriptionContainer}>
                <Text numberOfLines={2} style={styles.comicTitle}>
                  {item.title}
                </Text>
                {item.price !== 0 && (
                  <Text style={styles.comicDetails}>Price: {item.price} $</Text>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={[styles.comic, { backgroundColor: "#0000008c" }]} />
              <View style={styles.comicDescriptionContainer}>
                <Text numberOfLines={2} style={styles.comicTitle}>
                  {item.title}
                </Text>
              </View>
            </>
          )}
          <View style={[styles.iconContainer, { alignItems: "center" }]}>
            <TouchableHighlight
              style={styles.leftIconContainer}
              onPress={() => handleQuantityInCart(item.id)}
            >
              <View style={styles.qntContainer}>
                <View style={{ width: "70%" }}>
                  <Text>{item.qtyInCart}</Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Icon name="chevron-down" size={15} />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => deleteComicFromCart(item.id, item)}
              style={styles.rightIconContainer}
            >
              <Image source={redTrash} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* SEPARATOR */}
        {index < userComics.inCart.length - 1 ? (
          <View style={styles.verticalSeparator} />
        ) : null}
      </View>
    );
  };

  const cartTotalPrice = userComics.inCart.reduce((prev, cur) => {
    return prev + cur.price;
  }, 0);

  return (
    <LinearGradient
      style={{ flex: 1, height: "100%" }}
      colors={["#ae0000", "#000000"]}
      start={{ x: 1, y: 0.1 }}
      end={{ x: 1, y: 0.4 }}
    >
      <Header />
      {/* WHISHLIST */}
      <View style={{ flex: 3 }}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>WHISHLIST</Text>
        </View>
        {userComics.whished.length > 0 ? (
          <View
            style={{
              flex: 3,
            }}
          >
            <FlatList
              data={userComics.whished}
              keyExtractor={(item) => `Key-${item.id}`}
              renderItem={renderWhishedComics}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 3,
            }}
          >
            <Icon name="playlist-remove" size={65} color={color.yellow} />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: color.white }}
            >
              {" "}
              Your whishlist is empty.{" "}
            </Text>
          </View>
        )}
      </View>
      {/* CART */}
      <View style={{ flex: 4 }}>
        <View
          style={[
            styles.listTitleContainer,
            { borderTopWidth: 0.5, borderTopColor: color.mattYellow },
          ]}
        >
          <Text style={styles.listTitle}>CART</Text>
        </View>
        {userComics.inCart.length > 0 ? (
          <View style={{ flex: 4 }}>
            <FlatList
              data={userComics.inCart}
              keyExtractor={(item) => `Key-${item.id}`}
              renderItem={renderCartComics}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 4 }}
          >
            <Icon name="cart-minus" size={65} color={color.yellow} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: color.white,
                marginTop: "2%",
              }}
            >
              {" "}
              Your cart is empty.{" "}
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: color.black,
            flex: 1,
          }}
        >
          <SafeAreaView>
            <View style={styles.totalDetailsContainer}>
              <Text style={styles.totalDetailsTitles}>
                TOT. QTY:
                <Text style={styles.totalDetailsValues}>
                  {" "}
                  {userComics.inCart.length}{" "}
                </Text>
              </Text>
              <Text style={styles.totalDetailsTitles}>
                SUBTOTAL:
                <Text style={styles.totalDetailsValues}>
                  {" "}
                  {cartTotalPrice.toFixed(2)} ${" "}
                </Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButtonContainer}>
              <Text style={styles.checkoutButtonLabel}> CHECKOUT </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
      {openModal && <QuantityModal />}
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
  userComics: state.user.userComics,
  openModal: state.cart.openModal,
  selectedComicInCart: state.user.selectedComic,
  selectedComicIdInCart: state.user.selectedComicId,
  yearlyComics: state.comics.yearlyComics,
  relatedComics: state.comics.relatedComics,
});

const mapDispatchToProps = (dispatch) => ({
  getUserComics: () => dispatch(getUserComicsAction()),
  addComicFromWhishes: (selectedComic: Comic) =>
    dispatch(addComicFromWhishesAction(selectedComic)),
  removeComicFromCart: (selectedComic: Comic) =>
    dispatch(removeComicFromCartAction(selectedComic)),
  getComicInCartById: (comicId: number, comicsArray: Comic[]) =>
    dispatch(getComicInCartByIdAction(comicId, comicsArray)),
  resetSelectedComic: () => dispatch(resetSelectedComicInCartAction()),
  getSelectedComicId: (selectedComic: Comic) =>
    dispatch(getSelectedComicIdInCartAction(selectedComic)),
  resetSelectedComicId: () => dispatch(resetSelectedComicIdInCartAction()),
  openQuantityModal: () => dispatch(openQuantityModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
