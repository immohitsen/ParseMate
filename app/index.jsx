import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { parseXML } from '../src/utils/parseXML';
import { predefinedXML } from '../src/utils/predefinedXML';
import { FileText, Upload } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#ffffff", "#f5f5f5"]} // Subtle gradient
      className="flex-1 justify-center items-center"
    >
      {/* Title */}
      <Text className="text-2xl font-bold text-black mb-5">XML Form Renderer</Text>
      <Text className="text-gray-600 text-sm mb-6">Upload or select an XML file to get started</Text>

      {/* Button Container */}
      <View className="flex-row justify-between w-4/5">
        {/* Render Default XML Button */}
        <Pressable
          onPress={() => {
            const parsedData = parseXML(predefinedXML);
            if (parsedData) {
              router.push({
                pathname: "/form",
                params: { formData: JSON.stringify(parsedData) },
              });
            } else {
              alert("Error parsing XML");
            }
          }}
          className="flex-1 border border-black p-6 rounded-xl justify-center items-center shadow-sm flex-row"
        >
          <FileText size={20} color="black" className="mr-2" />
          <Text className="text-black font-medium text-center pl-2">Render Default XML</Text>
        </Pressable>

        {/* Render from XML Input Button */}
        <Pressable
          onPress={() => router.push("/xmlInput")}
          className="flex-1 border border-black p-4 rounded-xl justify-center items-center ml-3 shadow-sm flex-row"
        >
          <Upload size={20} color="black" className="mr-2" />
          <Text className="text-black font-medium text-center pl-2">Render from XML</Text>
        </Pressable>
      </View>

      {/* Floating Action Button */}
      <Pressable
        onPress={() => router.push("/xmlInput")}
        className="absolute bottom-10 right-10 bg-black p-4 rounded-full shadow-lg"
      >
        <Upload size={24} color="white" />
      </Pressable>

      <StatusBar backgroundColor="white" style="dark" />
    </LinearGradient>
  );
}
