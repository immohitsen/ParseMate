import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
  Modal,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import DrawingField from "./DrawingField";

const FormRenderer = ({ formData, setScrollEnabled }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const [switchValue, setSwitchValue] = useState(false);

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
                  className="border border-gray-300 p-3 rounded-md bg-white"
                  placeholder={field.placeholder}
                  keyboardType={
                    field.type === "number" || field.type === "tel"
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
          case "checkbox": {
            // Create unique state key for each checkbox group
            const stateKey = `checkbox_${field.name}`;
            const [checkedValues, setCheckedValues] = useState({});

            return (
              <View key={index} className="mb-4">
                <Text className="text-lg font-semibold pb-2">
                  {field.label}
                </Text>

                <View className="gap-y-2">
                  {field.options.map((option, i) => {
                    const optionKey = `${stateKey}_${i}`;
                    const isChecked = checkedValues[optionKey] || false;

                    return (
                      <View key={optionKey} className="flex-row items-center">
                        <TouchableOpacity
                          onPress={() => {
                            setCheckedValues((prev) => ({
                              ...prev,
                              [optionKey]: !isChecked,
                            }));
                          }}
                          className="w-5 h-5 border-2 border-blue-500 rounded-md 
                              items-center justify-center mr-2"
                        >
                          {isChecked && (
                            <View className="w-3 h-3 bg-blue-500 rounded-sm" />
                          )}
                        </TouchableOpacity>

                        <Text className="text-base text-gray-700">
                          {option.label || option}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          }

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
          case "drawing":
            return (
              <DrawingField
                key={index}
                field={field}
                setScrollEnabled={setScrollEnabled}
              />
            );

            case "file": {
              const [file, setFile] = useState(null);
            
              const handleFilePick = async () => {
                try {
                  const result = await DocumentPicker.getDocumentAsync();
                  if (result.type === 'success') {
                    setFile(result);
                    alert(`Selected file: ${result.name}`);
                  }
                } catch (error) {
                  alert('Failed to pick file');
                }
              };
            
              return (
                <View key={index} className="mb-4">
                  <Text className="text-lg font-semibold pb-2">
                    {field.label}
                  </Text>
            
                  {/* File Selection Button */}
                  <TouchableOpacity
                    onPress={handleFilePick}
                    className="bg-blue-500 py-2 px-4 rounded-lg"
                  >
                    <Text className="text-white text-center font-medium">
                      Choose File
                    </Text>
                  </TouchableOpacity>
            
                  {/* Show Selected File */}
                  {file && (
                    <Text className="mt-2 text-gray-700">
                      Selected: {file.name}
                    </Text>
                  )}
                </View>
              );
            }
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
