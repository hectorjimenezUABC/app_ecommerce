// components/About.tsx
import { View, Text, Pressable } from "react-native";

export default function About({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: 'Arial' }}>Acerca de esta App</Text>
            <Pressable onPress={() => navigation.goBack()} >
                <Text style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "#0f766e",
                    borderRadius: 8,
                    fontFamily:'Arial',
                    color:"white"
                }}>volver</Text>
            </Pressable>
        </View>
    );
}
