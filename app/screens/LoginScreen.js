import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import * as Yup from "yup";
import authApi from "../api/auth";
import AppDetailText from "../components/AppDetailText";

// import AppFormField from '../components/forms/AppFormField';
// import SubmitButton from '../components/forms/SubmitButton';
// import AppForm from '../components/forms/AppForm'
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const auth = useAuth();
  // const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    auth.logIn(result.data);
    // console.log(auth.user);
    // logIn(result.data);
    //Move to useAuth.js
    // const user = jwtDecode(result.data);
    // // console.log(user);
    // authContext.setUser(user);
    // authStorage.storeToken(result.data);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        {/* {({handleChange, handleSubmit,errors, setFieldTouched, touched}) => */}
        {/* {() =>
                <> */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          // onBlur={()=>setFieldTouched("email")}
          // onChangeText={handleChange("email")}
          placeholder="Email"
          textContentType="emailAddress"
        />
        {/* <AppDetailText style={{color: 'red'}}>{errors.email}</AppDetailText> */}
        {/* <ErrorMessage error={errors.email} visible={touched.email}/> */}

        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          // onBlur={()=>setFieldTouched("password")}
          // onChangeText={handleChange("password")}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        {/* <AppDetailText style={{color: 'red'}}>{errors.password}</AppDetailText> */}
        {/* <ErrorMessage error={errors.password} visible={touched.password}/> */}
        {/* <AppButton title="Login" onPress={handleSubmit}  /> */}
        <SubmitButton title="Login" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Register", { screen: "Register" })}
        >
          <AppDetailText style={{ color: "green" }}>New user?</AppDetailText>
        </TouchableOpacity>

        {/* </>
        } */}
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 35,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
});
export default LoginScreen;
