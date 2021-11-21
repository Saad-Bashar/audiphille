import React, { useState } from "react"
import { View, SafeAreaView, ScrollView, Image } from "react-native"
import Text from "../components/text/text"
import { colors, spacing } from "../theme"
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import { useDispatch, useSelector } from "react-redux"
import { reset, selectCart, selectTotalAmount } from "../redux/cartSlice"
import { CartItem } from "./CartScreen"
import Button from "../components/Button"
import { StackNavigationProp } from "@react-navigation/stack"
import Modal from "react-native-modal"
import LottieView from "lottie-react-native"
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SHIPPING_PRICE = 50
const VAT = 500

const schema = Yup.object().shape({
    name: Yup.string().max(4, 'Must not').required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    })

export default function CheckoutScreen({
    navigation,
}: {
    navigation: StackNavigationProp<any>
}) {
    const cartItems = useSelector(selectCart)
    const totalAmount = useSelector(selectTotalAmount)
    const dispatch = useDispatch()
    const [isModalVisible, setModalVisible] = useState(false)

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: ''
        },
        validationSchema: schema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
            <ScrollView>
                <View
                    style={{
                        padding: spacing[4],
                        borderRadius: 12,
                        backgroundColor: "#fff",
                        margin: spacing[5],
                    }}
                >
                    <Text preset="h6">CHECKOUT</Text>
                    <Text
                        textColor={colors.primary}
                        style={{ marginTop: spacing[4] }}
                    >
                        Billing details
                    </Text>
                    <Input 
                        label="Name" 
                        placeholder="John Doe" 
                        onChangeText={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <Text style={{ color: 'red'}}>{formik.errors.name}</Text>
                    ) : null}
                    <Input
                        label="Email address"
                        placeholder="johndoe@gmail.com"
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Text style={{ color: 'red'}}>{formik.errors.email}</Text>
                    ) : null}
                    <Input label="Phone" placeholder="+880147859958" />
                    <Text
                        textColor={colors.primary}
                        style={{ marginTop: spacing[4] }}
                    >
                        Shipping info
                    </Text>
                    <Input
                        label="Your address"
                        placeholder="1137 Williams Avenue"
                    />
                    <Input label="ZIP Code" placeholder="10001" />
                    <Input label="City" placeholder="New York" />
                    <Input label="Country" placeholder="United States" />
                    <Text
                        textColor={colors.primary}
                        style={{ marginTop: spacing[4] }}
                    >
                        Payment details
                    </Text>
                    <Text preset="title" style={{ marginTop: spacing[4] }}>
                        Payment method
                    </Text>
                    <Checkbox selected={true} text="Cash on Delivery" />
                    <Checkbox
                        disable
                        selected={false}
                        text="Online payment (Not available)"
                    />
                </View>

                <View
                    style={{
                        paddingHorizontal: spacing[5],
                        paddingVertical: spacing[8],
                        borderRadius: 12,
                        backgroundColor: "#fff",
                        margin: spacing[5],
                    }}
                >
                    <Text preset="h6">SUMMARY</Text>
                    <View style={{ marginTop: spacing[6] }}>
                        {cartItems.map((item: CartItem, index: number) => {
                            const {
                                featuredImage,
                                name,
                                quantityPrice,
                                amount,
                            } = item
                            return (
                                <View
                                    key={name}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: colors.grey,
                                                borderRadius: 8,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: spacing[5],
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: 36,
                                                    width: 36,
                                                }}
                                                resizeMode="contain"
                                                source={featuredImage.source}
                                            />
                                        </View>
                                        <View
                                            style={{ marginLeft: spacing[4] }}
                                        >
                                            <Text preset="title">{name}</Text>
                                            <Text textColor="#757575">
                                                ${quantityPrice}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text textColor="#757575">x{amount}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ marginTop: spacing[6] }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text textColor="#757575">Total</Text>
                            <Text preset="h6">{`$ ${totalAmount}`}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text textColor="#757575">Shipping</Text>
                            <Text preset="h6">{`$ ${SHIPPING_PRICE}`}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text textColor="#757575">Vat included</Text>
                            <Text preset="h6">{`$ ${VAT}`}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text textColor="#757575">Grand total</Text>
                            <Text textColor={colors.primary} preset="h6">{`$ ${
                                totalAmount + SHIPPING_PRICE + VAT
                            }`}</Text>
                        </View>

                        <Button
                            title="CONTINUE & PAY"
                            style={{ width: "100%", marginTop: spacing[6] }}
                            onPress={formik.handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
            {isModalVisible && (
                <Modal isVisible={isModalVisible}>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: spacing[8],
                            borderRadius: 12,
                        }}
                    >
                        <LottieView
                            autoPlay
                            style={{ height: 50, width: 50, left: -4 }}
                            source={require("../assets/images/success.json")}
                            loop={false}
                        />
                        <Text uppercase preset="h5">
                            Thank you
                        </Text>
                        <Text uppercase preset="h5">
                            for your order
                        </Text>
                        <Text
                            textColor="#757575"
                            style={{ paddingVertical: spacing[4] }}
                        >
                            You will receive a confirmation email shortly
                        </Text>
                        <View
                            style={{
                                backgroundColor: colors.grey,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                paddingHorizontal: 25,
                                paddingVertical: spacing[4],
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderBottomWidth: 1,
                                    borderColor: "#9c9c9c",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: colors.grey,
                                            borderRadius: 8,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: spacing[5],
                                        }}
                                    >
                                        <Image
                                            style={{ height: 36, width: 36 }}
                                            resizeMode="contain"
                                            source={
                                                cartItems[0].featuredImage
                                                    .source
                                            }
                                        />
                                    </View>
                                    <View style={{ marginLeft: spacing[0] }}>
                                        <Text preset="title">
                                            {cartItems[0].name}
                                        </Text>
                                        <Text textColor="#757575">
                                            ${cartItems[0].quantityPrice}
                                        </Text>
                                    </View>
                                </View>
                                <Text textColor="#757575">
                                    x{cartItems[0].amount}
                                </Text>
                            </View>
                            {
                                cartItems.length > 1 && (
                                    <View
                                    style={{ alignSelf: "center", marginTop: 10 }}
                                >
                                    <Text textColor="#777">
                                        and {cartItems.length - 1} other item(s)
                                    </Text>
                                </View>)
                            }
                          
                        </View>
                        <View
                            style={{
                                paddingHorizontal: spacing[5],
                                paddingVertical: spacing[4],
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                backgroundColor: "#000",
                            }}
                        >
                            <Text textColor="#fafafa">GRAND TOTAL</Text>
                            <Text
                                textColor="white"
                                preset="h5"
                                style={{ paddingTop: spacing[2] }}
                            >{`$ ${totalAmount + SHIPPING_PRICE + VAT}`}</Text>
                        </View>
                        <Button
                            title="BACK TO HOME"
                            onPress={() => {
                                setModalVisible(false)
                                dispatch(reset())
                                navigation.navigate("Home")
                            }}
                            style={{ marginTop: spacing[6], width: "100%" }}
                        />
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    )
}
