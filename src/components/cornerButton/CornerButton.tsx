import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles/cornerBtnStyles";
import fbIcon from "../../assets/socialIcons/facebookIcon.png";
import googleIcon from "../../assets/socialIcons/googleIcon.png";

type ButtonProps = {
  social?: boolean;
  fbBtn?: boolean;
  googleBtn?: boolean;
  textBtn: string;
  btnColor: string;
  textColor: string;
};

const CornerButton: React.FC<ButtonProps> = ({
  social,
  fbBtn,
  googleBtn,
  textBtn,
  btnColor,
  textColor
}) => (
  <>
    <View style={styles.borderCornerBtn}>
      <View style={styles.borderLeftBtn}></View>
      <View style={styles.borderInsideBtn}></View>
      <View style={styles.borderRightBtn}></View>
    </View>
    <View style={styles.cornerButton}>
      <View style={[styles.leftAngle, { borderBottomColor: btnColor }]}></View>
      <View
        style={[
          styles.inside,
          { backgroundColor: btnColor },
          !social ? { alignItems: "center" } : { paddingLeft: "2%" }
        ]}
      >
        {social ? (
          <View style={styles.socialBtn}>
            <Image
              source={fbBtn ? fbIcon : googleBtn && googleIcon}
              style={styles.icon}
            />
            <Text style={[styles.text, { color: textColor }]}>
              {textBtn}
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>{textBtn}</Text>
        )}
      </View>
      <View style={[styles.rightAngle, { borderTopColor: btnColor }]}></View>
    </View>
  </>
);

export default CornerButton;
