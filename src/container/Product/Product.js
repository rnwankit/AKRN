import { View, Text, FlatList, StyleSheet, StatusBar, Button, Modal, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteProduct, getProduct, insertData } from '../../redux/action/product.action';
import { useDispatch, useSelector } from 'react-redux';



export default function Product() {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')

    useEffect(
        () => {
            dispatch(getProduct());
        },
        []);

    console.log("aaaa", product);

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteProduct(id))
    }

    const Item = ({ name, id }) => (

        <View key={id} style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <Button
                title='Delete'
                onPress={() => handleDelete(id)}
            />
        </View>
    );

    const renderItem = ({ item }) =>  {
        console.log(item);
        return (
            <Item name={item.name} id={item.id} />
        )
    };

    const handleSubmit = () => {
        dispatch(insertData({name, price}))
    }

    return (
        <>

            {
                !product.isLoading ?
                    <FlatList
                        data={product.product}
                        renderItem={(item) => renderItem(item)}
                        keyExtractor={item => item.id}
                    />
                    :
                    <Text>Loading...</Text>
            }

            <View style={{ marginTop: 100 }}>
                <Text>Product</Text>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                    placeholder="Name"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => setPrice(text)}
                                    value={price}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setModalVisible(!modalVisible); handleSubmit()}}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text>Show Modal</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 2,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});



