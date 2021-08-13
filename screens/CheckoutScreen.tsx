import React from 'react'
import { View, SafeAreaView, ScrollView, Image } from 'react-native'
import Text from '../components/text/text'
import { colors, spacing } from '../theme'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import { useSelector } from 'react-redux'
import { selectCart, selectTotalAmount } from '../redux/cartSlice'
import { CartItem } from './CartScreen'
import Button from '../components/Button'

const SHIPPING_PRICE = 50;
const VAT = 500;

export default function CheckoutScreen() {
    const cartItems = useSelector(selectCart);
    const totalAmount = useSelector(selectTotalAmount)
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#f9f9f9"}}>
            <ScrollView>
                <View style={{ padding: spacing[4], borderRadius: 12, backgroundColor: "#fff", margin: spacing[5] }}>
                    <Text preset="h6">CHECKOUT</Text>
                    <Text textColor={colors.primary} style={{marginTop: spacing[4]}}>Billing details</Text>
                    <Input label="Name" placeholder="John Doe" />
                    <Input label="Email address" placeholder="johndoe@gmail.com" />
                    <Input label="Phone" placeholder="+880147859958" />
                    <Text textColor={colors.primary} style={{marginTop: spacing[4]}}>Shipping info</Text>
                    <Input label="Your address" placeholder="1137 Williams Avenue" />
                    <Input label="ZIP Code" placeholder="10001" />
                    <Input label="City" placeholder="New York" />
                    <Input label="Country" placeholder="United States" />
                    <Text textColor={colors.primary} style={{marginTop: spacing[4]}}>Payment details</Text>
                    <Text preset="title" style={{marginTop: spacing[4]}}>Payment method</Text>
                    <Checkbox selected={true} text="Cash on Delivery" />
                    <Checkbox disable selected={false} text="Online payment (Not available)" />
                </View>

                <View style={{ paddingHorizontal: spacing[5], paddingVertical:spacing[8], borderRadius: 12, backgroundColor: "#fff", margin: spacing[5] }}>
                    <Text preset="h6">SUMMARY</Text>
                    <View style={{marginTop: spacing[6]}}>
                        {
                            cartItems.map((item : CartItem, index: number) => {
                                const {featuredImage, name, quantityPrice, amount} = item;
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{backgroundColor: colors.grey, borderRadius: 8, alignItems: 'center', justifyContent: 'center', padding: spacing[5]}}>
                                                <Image style={{height: 36, width: 36}} resizeMode="contain" source={featuredImage.source} />
                                            </View>
                                            <View style={{marginLeft: spacing[4]}}>
                                                <Text preset="title">{name}</Text>
                                                <Text textColor="#757575">${quantityPrice}</Text>
                                            </View>
                                            
                                        </View>
                                        <Text textColor="#757575">x{amount}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{marginTop: spacing[6]}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                            <Text textColor="#757575">Total</Text>
                            <Text preset="h6">{`$ ${totalAmount}`}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                            <Text textColor="#757575">Shipping</Text>
                            <Text preset="h6">{`$ ${SHIPPING_PRICE}`}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                            <Text textColor="#757575">Vat included</Text>
                            <Text preset="h6">{`$ ${VAT}`}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10}}>
                            <Text textColor="#757575">Grand total</Text>
                            <Text textColor={colors.primary} preset="h6">{`$ ${totalAmount + SHIPPING_PRICE + VAT}`}</Text>
                        </View>

                        <Button title="CONTINUE & PAY" style={{width: '100%', marginTop: spacing[6]}} onPress={() => {}} />
                    </View>
                    
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}