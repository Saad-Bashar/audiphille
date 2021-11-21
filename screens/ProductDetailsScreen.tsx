import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import BannerTitle from '../components/BannerTitle'
import Button from '../components/Button'
import CounterButton from '../components/Counter'
import Counter from '../components/Counter'
import Text from '../components/text/text'
import { ProductType } from '../data/products'
import { selectProductById } from '../redux/productsSlice'
import { colors, spacing } from '../theme'
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { showMessage } from 'react-native-flash-message'
import { RootState } from '../redux/store'


export interface Route {
    params: {
        id: number
    }
}

const IT = [
    { amount: 1, name: "Headphone Unit" },
    { amount: 2, name: "Replacement Earcups" },
    { amount: 1, name: "User Manual" },
    { amount: 1, name: "3.5mm 5m Audio Cable" },
    { amount: 1, name: "Travel Bag" },
  ]

export default function ProductDetailsScreen({navigation, route}: {navigation: StackNavigationProp<any>, route: Route}) {
    const product : ProductType = useSelector((state : RootState) => selectProductById(state, route.params.id))
    const {id, name, featuredImage, description, price, category, features, includedItems, images} = product
    const [amount, setAmount] = useState(0)
    const dispatch = useDispatch()

    const onAmountChange = (amount : number) => {
        setAmount(amount);
    }

    const onPressAddCart = () => {
        if(amount === 0) {
            return showMessage({
                message: "Please check your product quantity",
                type: "danger",
            })
        }

        const cartProduct = {
            id,
            name,
            featuredImage,
            price,
            quantityPrice: price * amount,
            amount: amount,
        }
        
        dispatch(addToCart({cartProduct}))
        showMessage({
            message: "Item is added to cart successfully",
            type: "warning",
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <BannerTitle />
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" style={{margin: spacing[5]}} />
                </Pressable>
                <View style={{ margin: spacing[5] }}>
                    <View style={{backgroundColor: colors.grey, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing[8]}}>
                        <Image source={featuredImage.source} />
                    </View>
                    <View style={{marginVertical: spacing[5]}}>
                        <Text preset="h4">{name}</Text>
                        <Text uppercase preset="h4">{category}</Text>
                        <Text textColor="#7d7d7d" style={{marginTop:spacing[5]}}>
                            {description}
                        </Text>
                        <Text preset="h6" style={{  marginTop: spacing[4] }}>
                            {`$ ${price}`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: spacing[6] }}>
                        <CounterButton setAmount={(value: number) => onAmountChange(value)} />
                        <Button onPress={onPressAddCart} title="ADD TO CART" style={{ marginLeft: spacing[4] }} />
                    </View>

                    <View style={{marginVertical: spacing[5]}}>
                        <Text preset="h4">FEATURES</Text>
                        <Text textColor="#7d7d7d" style={{paddingTop: spacing[3], lineHeight: 25 }}>{features}</Text>
                    </View>

                    <View style={{marginVertical: spacing[5]}}>
                        <Text preset="h4">IN THE BOX</Text>
                        {IT.map(item => 
                            <View key={item.name} style={{flexDirection: 'row', alignItems: 'center', marginVertical: spacing[3]}}>
                                <Text preset="h6" textColor={colors.primary}>{item.amount}x</Text>
                                <Text textColor="#7d7d7d" style={{marginLeft: spacing[3]}}>{item.name}</Text>
                            </View>
                        )}
                    </View>
                    <View style={{marginVertical: spacing[8]}}>
                        {images.map((image, index) => {
                            return (
                                <View key={index.toString()} style={{marginVertical: spacing[3], overflow: 'hidden'}}>
                                    <Image  source={image.source} style={{alignSelf: 'center', width: "100%", borderRadius: 12}} />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
