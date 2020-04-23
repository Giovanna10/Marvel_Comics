import React, { useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store/store";
import {
  User,
  UserComics,
} from "../../store/actions/actionsTypes/ActionsTypes";
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  SafeAreaView,
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

type ProfileProps = {
  userLogged: boolean;
  userInfo: User;
  userComics: UserComics;
  openModal: boolean;
  openQuantityModal: typeof openQuantityModalAction;
  closeQuantityModal: typeof closeQuantityModalAction;
};

const Profile: React.FC<ProfileProps> = ({
  userInfo,
  userComics,
  openQuantityModal,
  openModal,
}) => {
  const styles = profileStyle;

  const [quantity, setQuantity] = useState(1);

  const renderCartComics = ({ item, index }) => {
    const title = item.title.split(" (")[0];
    return (
      <>
        {/* COMIC */}
        <View style={styles.comicContainerCart}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Image
              source={{
                uri: `${item.thumbnail.path}/portrait_xlarge.jpg`,
              }}
              style={[styles.comic, { marginLeft: "5%" }]}
            />
          </View>
          <View style={styles.comicDescriptionContainerCart}>
            <Text numberOfLines={4} style={styles.comicTitle}>
              {title}
            </Text>
            <Text
              style={[
                styles.comicDetails,
                { position: "absolute", top: "40%" },
              ]}
            >
              Price: {item.price}
            </Text>
            <TouchableHighlight
              onPress={() => openQuantityModal()}
              style={{ position: "absolute", bottom: "10%" }}
            >
              <>
                <Text
                  style={{
                    color: color.title,
                    fontSize: size.titleTextField,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  QTY
                </Text>
                <View style={styles.qntContainer}>
                  <View style={{ width: "70%" }}>
                    <Text>{quantity}</Text>
                  </View>
                  <View style={{ width: "30%" }}>
                    <Icon name="chevron-down" size={15} />
                  </View>
                </View>
              </>
            </TouchableHighlight>
          </View>
          {/* SEPARATORS */}
          <View style={styles.verticalSeparatorCart} />
          <TouchableHighlight
            /* onPress={} */
            style={styles.trashIconContainer}
          >
            <Image source={redTrash} style={styles.icon} />
          </TouchableHighlight>
        </View>
        {index < userComics.inCart.length - 1 ? (
          <View style={styles.horizontalSeparator} />
        ) : (
          <View style={{ marginTop: "5%", width: 140 }} />
        )}
      </>
    );
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
          <View style={styles.comicDescriptionContainerWhish}>
            <Text numberOfLines={2} style={styles.comicTitle}>
              {title}
            </Text>
            <Text style={styles.comicDetails}>Price: {item.price}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableHighlight
              /* onPress={} */ style={styles.cartIconContainer}
            >
              <Image source={yellowCart} style={styles.smallIcon} />
            </TouchableHighlight>
            <TouchableHighlight
              /* onPress={} */ style={styles.smallTrashIconContainer}
            >
              <Image source={redTrash} style={styles.smallIcon} />
            </TouchableHighlight>
          </View>
        </View>
        {/* SEPARATOR */}
        {index < userComics.whished.length - 1 ? (
          <View style={styles.verticalSeparatorWhish} />
        ) : null}
      </View>
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1, height: "100%" }}
      colors={["#000000", "#ae0000"]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 1, y: 2 }}
    >
      <Header />
      {/* USER INFO */}
      <View
        style={[
          styles.userContainer,
          Platform.OS === "android" && { paddingTop: "15%" },
        ]}
      >
        <View style={styles.userImageContainer}>
          <Image source={{ uri: userInfo.image }} style={styles.userImage} />
        </View>
        <View
          style={[
            styles.userNameContainer,
            Platform.OS === "ios" && { paddingVertical: "10%" },
          ]}
        >
          <Text style={styles.userName}>{userInfo.name}</Text>
        </View>
      </View>
      {/* CART */}
      <FlatList
        data={userComics.inCart}
        keyExtractor={(item) => `Key-${item.id}`}
        renderItem={renderCartComics}
        ListHeaderComponent={() => (
          <View style={styles.cartListTitleContainer}>
            <View style={styles.cartTitleContainer}>
              <Text style={styles.listTitle}>CART</Text>
            </View>
          </View>
        )}
        bounces={false}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      />
      {/* WHISHLIST */}
      <SafeAreaView style={{ marginBottom: "8%" }}>
        <View style={{ marginBottom: "1%" }}>
          <View style={styles.listTitleContainer}>
            <Text style={styles.listTitle}>WHISHLIST</Text>
          </View>
          <FlatList
            data={userComics.whished}
            keyExtractor={(item) => `Key-${item.id}`}
            renderItem={renderWhishedComics}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      {openModal && <QuantityModal />}
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userLogged: state.user.loggedIn,
  userInfo: state.user.user,
  userComics: state.user.userComics,
  openModal: state.user.openModal,
});

const mapDispatchToProps = (dispatch) => ({
  openQuantityModal: () => dispatch(openQuantityModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
