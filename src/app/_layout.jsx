import { Stack } from 'expo-router';
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";

const client = new QueryClient();

export default function RootLayout(){
    return (
        <QueryClientProvider client={QueryClient}>
    <Stack>
        <Stack.Screen name='index' options={{title:'Exercises'}}/>
    </Stack>
    </QueryClientProvider>
    
    )
}