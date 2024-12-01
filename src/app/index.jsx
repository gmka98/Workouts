import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import ExercisesListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient'


const exercisesQuery = gql`
query exercises($muscle: String, $name: String) {
  myQuery(muscle: $muscle, name: $name) {
    name
    muscle
    equipment
  }
}
`;


export default function ExercisesScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises'],
    queryFn: () =>client.request(exercisesQuery),
    })

  if (isLoading){
    return <ActivityIndicator/>
  }

  if (error) {
    return<Text>Failed to Fetch exercises</Text>
  }

  
  return (
    <View style={styles.container}>
      <FlatList 
       data={data?.exercises}
       contentContainerStyle={{ gap: 5}}
       keyExtractor={(item, index) => item.name + index}
       renderItem={({item}) =>  <ExercisesListItem item={item}/>}
      />
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  },

});
