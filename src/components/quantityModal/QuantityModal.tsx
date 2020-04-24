import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
  Platform,
} from "react-native";
import modalStyles from "./styles/modalStyles";
import { AppState } from "../../store/store";
import { closeQuantityModalAction } from "../../store/actions/userActions/userActions";
import { screenDimensions } from "../../utils/themes/sizes";
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

type ModalProps = {
  openModal: boolean;
  closeQuantityModal: typeof closeQuantityModalAction;
};

//LA VARIABILE open RIMANE TRUE... VEDERE COME RESETTARE LO STATE

const QuantityModal: React.FC<ModalProps> = ({
  closeQuantityModal,
  openModal,
}) => {
  const styles = modalStyles;

  const numbersList = [];
  for (let i = 0; i <= 50; i++) {
    numbersList.push(i);
  }

  const [increase, setIncrease] = useState(false);
  const [transitionModal] = useState(new Animated.Value(0));
  const [animatedHeight] = useState(new Animated.Value(320));

  useEffect(() => {
    Animated.timing(transitionModal, {
      toValue: 1,
      duration: 300,
    }).start();
  }, []);

  useEffect(() => {
    increase
      ? Animated.timing(animatedHeight, {
          toValue: screenDimensions.height,
          duration: 500,
        }).start()
      : Animated.timing(animatedHeight, {
          toValue: 320,
          duration: 500,
        }).start();
  }, [increase]);

  useEffect(() => {
    return () => closeQuantityModal();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerListContainer}>
      <View
        style={[
          styles.headerTitleContainer,
          increase
            ? {
                paddingTop: Platform.OS === "ios" ? "15%" : "5%",
                paddingBottom: Platform.OS === "ios" ? "10%" : "5%",
                width: "90%",
              }
            : { paddingTop: "5%", paddingBottom: "5%", width: "100%" },
        ]}
      >
        <Text style={styles.headerTitleList}>Select quantity</Text>
      </View>
      {increase && (
        <TouchableHighlight
          onPress={() => setIncrease(false)}
          style={[
            styles.headerBackContainer,
            increase
              ? {
                  paddingTop: Platform.OS === "ios" ? "15%" : "5%",
                  paddingBottom: Platform.OS === "ios" ? "10%" : "5%",
                }
              : { paddingTop: "5%", paddingBottom: "5%" },
          ]}
        >
          <Text style={styles.headerBackList}>X</Text>
        </TouchableHighlight>
      )}
    </View>
  );

  const renderQuantities = ({ item }) => (
    <TouchableOpacity style={styles.listItemContainer}>
      <Text style={styles.listItem}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {openModal ? (
        <>
          {!increase && (
            <TouchableHighlight
              style={{
                backgroundColor: "#000000ab",
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }}
              onPress={() => closeQuantityModal()}
            >
              <View />
            </TouchableHighlight>
          )}
          <Animated.View
            style={[
              increase ? styles.modalExpandedContainer : styles.modalContainer,
              {
                height: animatedHeight,
                transform: [
                  {
                    translateY: transitionModal.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <FlatList
              data={numbersList}
              keyExtractor={(item) => `key-${item}`}
              ListHeaderComponent={renderHeader}
              stickyHeaderIndices={[0]}
              renderItem={renderQuantities}
              bounces={false}
              showsVerticalScrollIndicator={false}
              onScrollBeginDrag={() => setIncrease(true)}
            />
          </Animated.View>
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  openModal: state.user.openModal,
});

const mapDispatchToProps = (dispatch) => ({
  closeQuantityModal: () => dispatch(closeQuantityModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuantityModal);
