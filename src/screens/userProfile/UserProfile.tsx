import React, { useState } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { getUserComicsAction } from "../../store/actions/userActions/userActions";
import { AppState } from "../../store/store";
import { UserComics } from "../../store/actions/actionsTypes/ActionsTypes";
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
import { size } from "../../utils/themes/sizes";
import QuantityModal from "../../components/quantityModal/QuantityModal";
import {
  openQuantityModalAction,
  closeQuantityModalAction,
} from "../../store/actions/userActions/userActions";
import { db } from "../../../App";
import { SafeAreaView } from "react-navigation";

type ProfileProps = {
  userLogged: boolean;
  userComics: UserComics;
  openModal: boolean;
  openQuantityModal: typeof openQuantityModalAction;
  closeQuantityModal: typeof closeQuantityModalAction;
  getUserComics: typeof getUserComicsAction;
};

const Profile: React.FC<ProfileProps> = ({
  userComics,
  openQuantityModal,
  openModal,
  getUserComics,
}) => {
  const styles = profileStyle;

  const [quantity, setQuantity] = useState(1);

  const addToCartList = (id: number) => {
    const comicFoundInWhish = userComics.whished.find(
      (comic) => comic.id === id
    );
    try {
      db.collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .collection("Cart")
        .doc(comicFoundInWhish.title)
        .set(comicFoundInWhish);
    } catch (error) {
      console.log(error.message);
    }
    getUserComics();
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

  const deleteComicFromCart = (id: number) => {
    const comicFoundInCart = userComics.inCart.find((comic) => comic.id === id);
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

  const renderWhishedComics = ({ item, index }) => {
    const title = item.title.split(" (")[0];
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
              {title}
            </Text>
            {item.price !== 0 && (
              <Text style={styles.comicDetails}>Price: {item.price} $</Text>
            )}
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => addToCartList(item.id)}
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
    const title = item.title.split(" (")[0];
    return (
      <View style={styles.comic_separator_container}>
        {/* COMIC */}
        <View style={styles.comicContainerCart}>
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
            {item.price !== 0 && (
              <Text style={styles.comicDetails}>Price: {item.price} $</Text>
            )}
          </View>
          <View style={[styles.iconContainer, { alignItems: "center" }]}>
            <TouchableHighlight
              style={styles.leftIconContainer}
              onPress={() => openQuantityModal()}
            >
              <View style={styles.qntContainer}>
                <View style={{ width: "70%" }}>
                  <Text>{quantity}</Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Icon name="chevron-down" size={15} />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => deleteComicFromCart(item.id)}
              style={[styles.rightIconContainer, { marginTop: 10 }]}
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
      <View>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>WHISHLIST</Text>
        </View>
        {userComics.whished.length > 0 ? (
        <FlatList
          data={userComics.whished}
          keyExtractor={(item) => `Key-${item.id}`}
          renderItem={renderWhishedComics}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        ) : (
          <View style={{alignItems: 'center', marginVertical: 65}}>
            <Icon name="playlist-remove" size={65} color={color.yellow} />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: color.white}}> Your wishlist is empty. </Text>
          </View>
        )}
        {/* CART */}
      </View>
      <View>
        <View
          style={[
            styles.listTitleContainer,
            { borderTopWidth: 0.2, borderTopColor: color.mattYellow },
          ]}
        >
          <Text style={styles.listTitle}>CART</Text>
        </View>
        {userComics.inCart.length > 0 ? (
        <FlatList
          data={userComics.inCart}
          keyExtractor={(item) => `Key-${item.id}`}
          renderItem={renderCartComics}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        ) : (
          <View style={{alignItems: 'center', marginVertical: 71}}>
            <Icon name="cart-minus" size={65} color={color.yellow} />
            <Text style={{fontSize: 15, fontWeight: 'bold', color: color.white}}> Your cart is empty. </Text>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: color.black,
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
          <TouchableOpacity>
            <View style={styles.checkoutButtonContainer}>
              <Text style={styles.checkoutButtonLabel}> CHECKOUT </Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {openModal && <QuantityModal />}
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
  userComics: state.user.userComics,
  openModal: state.user.openModal,
});

const mapDispatchToProps = (dispatch) => ({
  openQuantityModal: () => dispatch(openQuantityModalAction()),
  getUserComics: () => dispatch(getUserComicsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
