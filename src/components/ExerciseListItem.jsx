import { Text, View, StyleSheet, Pressable  } from 'react-native';
import {Link} from 'expo-router';

export default function ExercisesListItem({item}){
    return(
      <Link href={`/${item.name}`} asChild>
      <Pressable style={styles.exercisesContainer}>
            <Text style={styles.exercisesName}>
              {item.name}
             </Text>
            <Text style={styles.exercisesSubtitle}>
              <Text style={styles.subValues}>{item.muscle} </Text>| {''}
              <Text style={styles.subValues}> {item.equipment} </Text>
            </Text>
       </Pressable>
       </Link>

    )
  }


  const styles = StyleSheet.create({
    exercisesContainer: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      gap: 5,
      marginHorizontal: 2,
    },
    ShadowColor: '#000',
    ShadowOffset: {
      width: 0,
      height:1,
    },
    exercisesName: {
      fontSize: 20,
      fontWeight: '500',
    },
  
    exercisesSubtitle: {
      color: 'dimgray',
      
    },
    subValues: {
        textTransform: 'capitalize',

    },
  });
  