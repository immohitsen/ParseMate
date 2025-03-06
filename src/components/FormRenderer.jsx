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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DocumentPicker from "expo-document-picker";
import Signature from "react-native-signature-canvas";

const FormRenderer = ({ formData }) => {
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
            case "drawing": 
              const sigRef = useRef(null);
              const [signature, setSignature] = useState(null);
            
              return (
                <View key={index} className="mb-6">
                  <Text className="text-lg font-medium text-gray-800 mb-2">
                    {field.label}
                  </Text>
            
                  <View className="border border-gray-300 rounded-xl bg-white shadow-sm">
                    {signature ? (
                      // Signature Preview Mode
                      <View className="p-4">
                        <Image
                          source={{ uri: signature }}
                          className="h-40 w-full mb-4"
                          resizeMode="contain"
                        />
                        <View className="flex-row justify-between">
                          <TouchableOpacity
                            onPress={() => setSignature(null)}
                            className="flex-1 bg-red-100 py-2 rounded-lg mx-1"
                          >
                            <Text className="text-red-600 text-center font-medium">
                              Clear Signature
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      // Signature Entry Mode
                      <View className="p-4">
                        <View className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
                          <Signature
                            ref={sigRef}
                            onOK={(img) => setSignature(img)}
                            descriptionText=""
                            webStyle={`
                              .m-signature-pad {
                                box-shadow: none;
                                border: none;
                                height: 100%;
                                background-color: transparent;
                              }
                              
                              .m-signature-pad--body {
                                border: none;
                                height: 180px;
                                width: 100%;
                                margin: 0;
                                background-color: transparent;
                              }
                              
                              .m-signature-pad--body canvas {
                                background-color: transparent;
                              }
            
                              .m-signature-pad--footer {
                                display: flex;
                                justify-content: space-between;
                                padding: 12px 0 0;
                                margin-top: 8px;
                              }
            
                              .m-signature-pad--footer .button {
                                padding: 10px 20px;
                                border-radius: 8px;
                                border: 1px solid #e5e7eb;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                background-color: white;
                              }
            
                              .m-signature-pad--footer .button.clear {
                                color: #dc2626;
                              }
            
                              .m-signature-pad--footer .button.clear:hover {
                                background-color: #fee2e2;
                              }
            
                              .m-signature-pad--footer .button.save {
                                color: #16a34a;
                              }
            
                              .m-signature-pad--footer .button.save:hover {
                                background-color: #dcfce7;
                              }
                            `}
                            style={{
                              height: 180,
                              width: "100%",
                              backgroundColor: "transparent",
                            }}
                          />
                        </View>
            
                        {/* Control Buttons */}
                        <View className="flex-row justify-center gap-3 mt-4">
                          <TouchableOpacity
                            onPress={() => sigRef.current?.undo()}
                            className="px-5 py-2 bg-gray-100 rounded-lg"
                          >
                            <Text className="text-gray-700 font-medium">Undo</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => sigRef.current?.redo()}
                            className="px-5 py-2 bg-gray-100 rounded-lg"
                          >
                            <Text className="text-gray-700 font-medium">Redo</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
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
