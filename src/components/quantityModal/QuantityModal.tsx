import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Animated, FlatList, Text, TouchableHighlight } from "react-native";
import modalStyles from "./styles/modalStyles";
import { AppState } from "../../store/store";
import { closeQuantityModalAction } from "../../store/actions/userActions/userActions";

type ModalProps = {
    openModal : boolean;
    closeQuantityModal: typeof closeQuantityModalAction;
}

//LA VARIABILE open RIMANE TRUE... VEDERE COME RESETTARE LO STATE

const QuantityModal: React.FC<ModalProps> = ({closeQuantityModal, openModal}) => {
  const styles = modalStyles;

  const numbersList = [];
  for (let i = 0; i <= 10; i++) {
    numbersList.push(i);
  }

  const [transitionModal] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(transitionModal, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderQuantities = ({ item }) => (
    <Text style={{ alignSelf: "center" }}>{item}</Text>
  );

  return (
    <>
      {openModal ? (
        <TouchableHighlight
          style={{
            backgroundColor: "#000000ab",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
          onPress={() => closeQuantityModal()}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
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
              renderItem={renderQuantities}
              // onScrollBeginDrag={}
            />
          </Animated.View>
        </TouchableHighlight>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
    openModal: state.user.openModal
})

const mapDispatchToProps = dispatch => ({
    closeQuantityModal: () => dispatch(closeQuantityModalAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuantityModal);
