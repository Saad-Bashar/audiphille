import React from "react"
import {
	View,
	SafeAreaView,
	Image,
	Pressable,
	ScrollView,
	Alert,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Text from "../components/text/text"
import {
	addToCart,
	deleteItemFromCart,
	reset,
	selectCart,
	selectTotalAmount,
} from "../redux/cartSlice"
import { colors, spacing } from "../theme"
import CounterButton from "../components/Counter"
import { FeaturedImageType } from "../data/products"
import Button from "../components/Button"
import LottieView from "lottie-react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AntDesign } from "@expo/vector-icons"

export interface CartItem {
	id: number
	name: string
	featuredImage: FeaturedImageType
	price: number
	amount: number
	quantityPrice?: number
}

export default function CartScreen({
	navigation,
}: {
	navigation: StackNavigationProp<any>
}) {
	const cartItems = useSelector(selectCart)
	const totalAmount = useSelector(selectTotalAmount)
	const dispatch = useDispatch()

	const onAmountChange = (value: number, cartItem: CartItem) => {
		if (value === 0) {
			return Alert.alert(
				"Remove item",
				"Do you wantto remove this item from your cart?",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{
						text: "OK",
						onPress: () =>
							dispatch(deleteItemFromCart({ id: cartItem.id })),
					},
				]
			)
		}

		const cartProduct = {
			...cartItem,
			quantityPrice: cartItem.price * value,
			amount: value,
		}
		return dispatch(addToCart({ cartProduct }))
	}

	if (cartItems.length === 0) {
		return (
			<View style={{ flex: 1, margin: spacing[5] }}>
				<LottieView
					autoPlay
					style={{ alignSelf: "center" }}
					source={require("../assets/images/empty-cart.json")}
					loop={false}
				/>
				<View style={{ flex: 1, justifyContent: "flex-end" }}>
					<Button
						onPress={() => navigation.navigate("Home")}
						title="EXPLORE"
						style={{ alignSelf: "center", width: "100%" }}
					/>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1, margin: spacing[5] }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginHorizontal: spacing[4],
							marginVertical: spacing[6],
						}}
					>
						<Text preset="h6">{`CART(${cartItems.length})`}</Text>
						<Pressable onPress={() => dispatch(reset())}>
							<Text
								textColor="#757575"
								centered
								style={{ textDecorationLine: "underline" }}
							>
								Remove all
							</Text>
						</Pressable>
					</View>
					{cartItems.map((cartItem: CartItem) => {
						const {
							id,
							featuredImage,
							name,
							quantityPrice,
							amount,
						} = cartItem
						return (
							<View
								key={name}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: spacing[2],
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
										source={featuredImage.source}
									/>
								</View>
								<View
									style={{ marginLeft: spacing[5], flex: 1 }}
								>
									<Text>{name}</Text>
									<Text textColor="#9c9c9c">
										$ {quantityPrice}
									</Text>
								</View>
								<CounterButton
									initialValue={amount}
									setAmount={(value: number) =>
										onAmountChange(value, cartItem)
									}
								/>
							</View>
						)
					})}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginHorizontal: spacing[4],
							marginVertical: spacing[6],
						}}
					>
						<Text preset="h6">Total</Text>
						<Text>{`$ ${totalAmount}`}</Text>
					</View>
					<View style={{ flex: 1, justifyContent: "flex-end" }}>
						<Button
							title="CHECKOUT"
							style={{ alignSelf: "center", width: "100%" }}
							onPress={() => navigation.navigate("Checkout")}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
