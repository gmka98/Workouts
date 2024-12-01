import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams,Stack } from "expo-router";
import exercises from '../../assets/data/exercises.json'
import { useState } from "react";
import { gql, request } from 'graphql-request';
import {useQuery} from "@tanstack/react-query"
import graphqlClient from '../graphqlClient';
 import NewSetInput from "../components/NewSetInput";

const exerciseQuery = gql`
query exercises($name: String) {
  myQuery(name: $name) {
    name
    muscle
    instructions
    equipment
  }
}`


export default function ExerciseDetailsScreen(){
    const {name} = useLocalSearchParams();
    const { data, isLoading, error } = useQuery({
      queryKey: ['exercises', name ],
      queryFn: () => graphqlClient.request(exerciseQuery, { name }),
    })

    const [isInstructionExpanded, setInstructionExpanded] = useState(true);

    if (isLoading) {
      return <ActivityIndicator />
    }

    if (error){
      return <Text>Failed to fetch data</Text>
    }

    const exercise = data.exercises[0];

    if (!exercise){
        return <Text>Exercise not found</Text>
    }
    return(

        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{title: exercise.name}}/>
            
            <View style= {styles.panel}>
            <Text style={styles.exercisesName}>{exercise.name}</Text>
            
            <Text style={styles.exercisesSubtitle}>
              <Text style={styles.subValues}>{exercise.muscle} </Text>| {''}
              <Text style={styles.subValues}> {exercise.equipment} </Text>
            </Text>
            </View>

            <View style={styles.panel}>

            <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
            <Text onPress={() => setInstructionExpanded(!isInstructionExpanded)} style={styles.seeMore}>
                {isInstructionExpanded ? 'See less' : 'See more'}
            </Text>
            </View>
            <NewSetInput/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:10,
        gap:10,
    },
    panel:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
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
      instructions:{
        fontSize: 16,
        lineHeight: 22,

      },
      seeMore:{
        alignSelf:'center',
        padding: 5,
        fontWeight: '600',
        color: 'gray',
      }
})
