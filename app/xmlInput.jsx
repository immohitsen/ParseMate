import React, { useState } from "react";
import { useRouter } from "expo-router"; // ✅ Ensure this is imported
import { View, Text, TextInput, Pressable } from "react-native";
import { parseXML } from "../src/utils/parseXML";
import * as DocumentPicker from "expo-document-picker";

export default function XmlInputScreen() {
  const router = useRouter(); // ✅ Ensure the router is correctly initialized
  const [xmlInput, setXmlInput] = useState("");

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/xml",
    });

    if (result.canceled) return; // ✅ Prevent errors if user cancels the picker
    console.log("XML File Selected:", result.uri);
  };

  const handleSubmitXML = () => {
    try {
      const parsedData = parseXML(xmlInput);
      if (parsedData) {
        router.push({
          pathname: "/form",
          params: { formData: JSON.stringify(parsedData) },
        }); // ✅ Correct navigation with params
      } else {
        alert("Invalid XML Input");
      }
    } catch (error) {
      alert("Error parsing XML. Please check the format.");
    }
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-xl font-semibold mb-4 text-center text-black">
        Upload or Paste XML
      </Text>

      <TextInput
        className="flex-1 border border-black p-4 rounded-xl bg-white text-black shadow-sm "
        placeholder="Paste XML here..."
        multiline
        numberOfLines={100}
        value={xmlInput}
        onChangeText={setXmlInput}
        style={{ textAlignVertical: "top" }}
      />

      {/* Button Row */}
      <View className="flex-row justify-between mt-6">
        <Pressable
          onPress={handleFilePick}
          className="flex-1 border border-black p-4 rounded-xl justify-center items-center mr-3 shadow-sm"
        >
          <Text className="text-black font-medium">Upload File</Text>
        </Pressable>

        <Pressable
          onPress={handleSubmitXML}
          className="flex-1 border border-black p-4 rounded-xl justify-center items-center ml-3 shadow-sm"
        >
          <Text className="text-black font-medium">Submit XML</Text>
        </Pressable>
      </View>

      {/* Cancel Button */}
      <Pressable
        onPress={() => router.back()} // ✅ This now works without errors
        className="border border-black p-4 rounded-xl justify-center items-center mt-6 shadow-sm"
      >
        <Text className="text-black font-medium">Cancel</Text>
      </Pressable>
    </View>
  );
}
