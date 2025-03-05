import { Stack } from 'expo-router';
import "../global.css";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'ParseMate '}} />
            <Stack.Screen name="form" options={{ title: ''}} />
            <Stack.Screen name="xmlInput" options={{ title: 'XML Input'}} />
        </Stack>
    );
}