import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavigateComps/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  <NavigationEvents onWillFocus={clearErrorMessage} />;

  return (
    <View style={styles.container}>
      <ScrollView>
        <AuthForm
          headerText="Sign Up For Rating"
          errorMessage={state.errorMessage}
          submitButtonText="Sign Up"
          onSubmit={signup}
          upPage={true}
        />
        <View style={{ alignItems: "center" }}>
          <NavLink
            text="Already have an account? Sign in instead."
            routeName="Signin"
          />
        </View>
      </ScrollView>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //View ekranın tamamını kaplaması için
    justifyContent: "center",
  },
});

export default SignupScreen;
