import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, Text, Pressable } from "react-native";
import FormRenderer from "../src/components/FormRenderer";
import Collapsible from "react-native-collapsible";

export default function FormScreen() {
  const { formData } = useLocalSearchParams();
  const parsedData = formData ? JSON.parse(formData) : null;
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <ScrollView className="flex-1 p-4 mt-4 mb-4 ">
      <View className="p-3 bg-white rounded-lg mb-5">
        {parsedData ? (
          <FormRenderer formData={parsedData} />
        ) : (
          <Text>No form data available.</Text>
        )}

        {/* Custom Styled Button */}
        <Pressable
          onPress={() => setIsCollapsed(!isCollapsed)}
          className="mt-3 mb-3 bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center font-bold">
            {isCollapsed ? "Show XML" : "Hide XML"}
          </Text>
        </Pressable>

        <Collapsible collapsed={isCollapsed}>
        <View className="p-3 bg-white rounded-lg mb-5">
          <Text>{JSON.stringify(parsedData, null, 2)}</Text>
        </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
}
