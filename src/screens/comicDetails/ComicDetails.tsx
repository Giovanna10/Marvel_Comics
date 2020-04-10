import React from "react";
import { db } from "../../../App";
import { connect } from "react-redux";
import { AppState } from "../../store/store";
import { Comic } from "../../store/actions/actionsTypes/ActionsTypes";
import { View, Text, Image } from "react-native";
import Header from "../../components/header/Header";
import cartPlus from "../../assets/comic/cart-plus.png";
import addWhish from "../../assets/comic/add_wishlist.png";
import { comicDetailsStyles } from "./comicDetailsStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

type ComicDetailsProps = {
  selectedComic: Comic;
};

const ComicDetails: React.FC<ComicDetailsProps> = ({ selectedComic }) => {
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
      db.collection("Cart").doc(title).set(comic);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <View style={styles.headingContainer}>
        <View style={styles.comicContainer}>
          <Image
            source={{
              uri: `${selectedComic.thumbnail.path}/portrait_xlarge.jpg`,
            }}
            style={styles.comic}
          />
          <Text style={styles.comicDetails}>
            {selectedComic.pageCount} pages
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.comicTitle, {marginBottom: '10%'}]}>{selectedComic.title}</Text>
          <Text style={[styles.comicTitle, {marginBottom: '10%'}]}>Cost: {selectedComic.price} $</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart}>
            <View style={styles.btnTextContainer}>
              <Text style={styles.btnText}>Add to Cart</Text>
            </View>
            <View style={styles.btnIconContainer}>
              <Image source={cartPlus} style={styles.btnIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => addToWishes}>
            <View style={styles.btnTextContainer}>
              <Text style={styles.btnText}>Add to Whishlist</Text>
            </View>
            <View style={styles.btnIconContainer}>
              <Image source={addWhish} style={styles.btnIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={[styles.comicTitle, {marginBottom: '5%'}]}>Summary</Text>
        <Text style={[styles.comicSubtitle, {marginBottom: '5%'}]}>{selectedComic.description}</Text>
        <Text style={[styles.comicTitle, {marginBottom: '5%'}]}>Creators</Text>
            <View>
              {selectedComic.creators.items.map(creator => (
                <Text key={creator.name} style={[styles.comicSubtitle, {marginBottom: '0.5%'}]}> · {creator.name} {creator.role && `(${creator.role})`} </Text>
              ))}
            </View>
        <Text style={[styles.comicTitle, {marginVertical: '5%'}]}>Related Comics</Text>
      </View>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedComic: state.comics.selectedComic,
});

export default connect(mapStateToProps, null)(ComicDetails);
