import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DocumentPicker from "expo-document-picker";

const FormRenderer = ({ formData }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const [switchValue, setSwitchValue] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);

  if (!formData || !formData.form || !formData.form.fields)
    return (
      <Text className="text-lg font-semibold text-center">
        Invalid or empty form data
      </Text>
    );

  return (
    <View className="p-4 bg-white rounded-xl shadow-md">
      {formData.form.fields.map((field, index) => {
        switch (field.type) {
          case "text":
          case "email":
          case "password":
          case "tel":
          case "url":
          case "number":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <TextInput
                  className="border p-3 rounded-md bg-gray-200"
                  placeholder={field.placeholder}
                  keyboardType={
                    field.type === "number"
                      ? "numeric"
                      : field.type === "email"
                      ? "email-address"
                      : "default"
                  }
                  secureTextEntry={field.type === "password"}
                />
              </View>
            );
          case "radio":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={setSelectedValue}
                  className="border p-3 rounded-md bg-gray-200"
                >
                  {field.options.map((option, i) => (
                    <Picker.Item key={i} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            );
          case "checkbox":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <View className="gap-y-2">
                  {" "}
                  {/* Controls vertical spacing between checkboxes */}
                  {field.options.map((option, i) => (
                    <View key={i} className="flex-row">
                      <BouncyCheckbox
                        size={20} // Reduced size for better UI
                        fillColor="#007bff"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#007bff" }}
                        innerIconStyle={{ borderWidth: 2 }}
                        isChecked={checkboxValues[option] || false}
                        onPress={(isChecked) =>
                          setCheckboxValues({
                            ...checkboxValues,
                            [option]: isChecked,
                          })
                        }
                      />
                      <Text className="ml-2">{option}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );

          case "date":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border p-3 rounded-md bg-gray-200"
                >
                  <Text>{date ? date.toDateString() : "Pick a date"}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                  />
                )}
              </View>
            );
          case "file":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <Button
                  title="Choose File"
                  onPress={async () => {
                    const result = await DocumentPicker.getDocumentAsync();
                    if (result.type === "success") setFileName(result.name);
                  }}
                />
                <Text className="mt-2">{fileName}</Text>
              </View>
            );
          case "color":
            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>
                <TextInput
                  type="color"
                  className="border p-3 rounded-md bg-gray-200"
                />
              </View>
            );
          case "switch":
            return (
              <View key={index} className="mb-4 flex-row items-center">
                <Text className="text-lg font-semibold pb-2 mr-2">
                  {field.label}
                </Text>
                <Switch value={switchValue} onValueChange={setSwitchValue} />
              </View>
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

export default FormRenderer;
