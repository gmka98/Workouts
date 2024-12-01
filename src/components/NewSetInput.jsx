import {View, Text, StyleSheet, TextInput} from 'react-native'

const NewSetInput = () => {
    return (
        <View style={styles.container}>
            <Text>Log set</Text>
            <TextInput placeholder="Reps" style={styles.input} />
            <TextInput placeholder="Weight" style={styles.input}/>

        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',

    },
    input:{
        borderWidth: StyleSheet.hairlinewidth,
        padding: 10,
    },
})

export default NewSetInput