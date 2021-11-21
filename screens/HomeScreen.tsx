import React from "react"
import {
	View,
	SafeAreaView,
	Pressable,
	Image,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
	ActivityIndicator,
} from "react-native"
import Text from "../components/text/text"
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, selectCount } from "../redux/counterSlice"
import BannerTitle from "../components/BannerTitle"
import { colors, spacing } from "../theme"
import { AntDesign } from "@expo/vector-icons"
import { ImageSourcePropType } from "react-native"
import LottieView from "lottie-react-native"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/Button"
import { reset } from "../redux/cartSlice"
import { useGetPokemonByNameQuery } from "../services/pokemon"
import { useEffect } from "react"
import { fetchProducts, selectProductIfFeatured } from "../redux/productsSlice"
import { RootState } from "../redux/store"
import { FeaturedImageType } from "../data/products"
import { useGetAllProductsQuery } from "../services/products"

const FeatureBox = ({ title, image }: { title: string; image: ImageSourcePropType }) => {
	const navigation = useNavigation()

	const onFeaturePress = () => {
		switch (title) {
			case "HEADPHONES":
				return navigation.navigate("Headphones")
			case "SPEAKERS":
				return navigation.navigate("Speakers")
			case "EARPHONES":
				return navigation.navigate("Earphones")
		}
	}
	
	return (
		<Pressable
			onPress={() => onFeaturePress()}
			style={{
				margin: spacing[8],
				marginHorizontal: spacing[5],
				borderRadius: 16,
				backgroundColor: colors.grey,
				alignItems: "center",
				padding: spacing[5],
			}}
		>
			<Image style={{ top: -60 }} source={image} />
			<View
				style={{
					marginTop: -30,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text preset="h6">{title}</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: spacing[2],
					}}
				>
					<Text textColor={"#7C7C7C"} centered style={{ marginRight: spacing[3] }} preset="subtitle">
						SHOP
					</Text>
					<AntDesign name="right" color={colors.primary} size={14} />
				</View>
			</View>
		</Pressable>
	)
}

const FeaturedProduct = ({ name, category, image }: { name: string; category: string; image: FeaturedImageType }) => {
	const windowWidth = useWindowDimensions().width
	return (
		<View
			style={{
				marginVertical: spacing[5],
				backgroundColor: colors.primary,
				borderRadius: 16,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					borderWidth: 1,
					borderColor: "#D8D8D8",
					borderRadius: 400,
					height: 320,
					width: windowWidth - 40,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<View
					style={{
						borderWidth: 1,
						borderColor: "#D8D8D8",
						borderRadius: 400,
						height: 280,
						width: windowWidth - 80,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Image
						style={{ height: 172, width: 188 }}
						resizeMode="contain"
						source={image.source}
					/>
				</View>
			</View>
			<View style={{ marginTop: -spacing[6], paddingBottom: spacing[8] }}>
				<Text preset="h3" white centered>
					{name}
				</Text>
				<Text preset="h3" white centered>
					{category}
				</Text>
				<Text style={{ width: 250, paddingTop: spacing[3] }} white centered>
					Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
				</Text>
			</View>
		</View>
	)
}

export default function HomeScreen() {
	const dispatch = useDispatch()
	const status = useSelector((state: RootState) => state.products.status)
	const featuredProducts = useSelector(selectProductIfFeatured);
	
	useEffect(() => {
		if(status === 'idle') {
			dispatch(fetchProducts())
		}
	}, [dispatch, status])

	if (status === "loading") {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<BannerTitle />
				<View style={{ backgroundColor: colors.black }}>
					<Image
						style={{
							alignSelf: "center",
							width: "100%",
							aspectRatio: 577.6 / 722,
						}}
						resizeMode="contain"
						source={require("../assets/images/home-banner.png")}
					/>
					<View
						style={{
							position: "absolute",
							top: 200,
							width: "100%",
						}}
					>
						<Text white preset="h2" style={{ textAlign: "center" }}>
							Welcome
						</Text>
						<Text
							textColor={colors.grey}
							style={{
								fontWeight: "300",
								textAlign: "center",
								width: 250,
								alignSelf: "center",
							}}
						>
							Experience natural, lifelike audio and exceptional build quality made for the passionate
							music enthusiast.
						</Text>
						<View>
							<LottieView
								autoPlay
								style={{
									height: 60,
									width: 60,
									alignSelf: "center",
								}}
								source={require("../assets/images/scroll-down-arrows.json")}
							/>
						</View>
					</View>
				</View>

				{/* <Button title="RESET CART" onPress={() => dispatch(reset())} /> */}

				<View style={{ paddingTop: 64 }}>
					<FeatureBox title={"HEADPHONES"} image={require("../assets/images/home-headphone.png")} />
					<FeatureBox title={"SPEAKERS"} image={require("../assets/images/home-speaker.png")} />
					<FeatureBox title={"EARPHONES"} image={require("../assets/images/home-earphone.png")} />
				</View>

				<View
					style={{
						paddingVertical: spacing[6],
						paddingHorizontal: spacing[5],
					}}
				>
					<Text centered preset="h3">
						FEATURED
					</Text>
					<Text centered preset="h3">
						PRODCUTS
					</Text>

					{
						featuredProducts.map((product, index) => {
							const {name, category, featuredImage} = product
							return (
								<FeaturedProduct
									key={name}
									name={name}
									category={category}
									image={featuredImage}
								/>
							)
						})
					}

				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
