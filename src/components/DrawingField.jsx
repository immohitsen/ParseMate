// src/components/DrawingField.js
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Signature from "react-native-signature-canvas";

const DrawingField = ({ field, setScrollEnabled }) => {
  const sigRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Handle drawing states properly
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      setScrollEnabled(true);
    };
  }, []);

  return (
    <View className="mb-6">
      <Text className="text-lg font-medium text-gray-800 mb-2">
        {field.label}
      </Text>

      <View className="border border-gray-300 rounded-xl bg-white shadow-sm">
        {signature ? (
          <View className="p-4">
            <Image
              source={{ uri: signature }}
              className="h-40 w-full mb-4"
              resizeMode="contain"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setSignature(null);
                  setScrollEnabled(true);
                }}
                className="flex-1 bg-red-100 py-2 rounded-lg mx-1"
              >
                <Text className="text-red-600 text-center font-medium">
                  Clear Signature
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="p-4">
            <Signature
              ref={sigRef}
              onOK={(img) => {
                setSignature(img);
                setScrollEnabled(true);
              }}
              onBegin={() => {
                setIsDrawing(true);
                setScrollEnabled(false);
              }}
              onEnd={() => {
                setIsDrawing(false);
                setScrollEnabled(true);
              }}
              descriptionText=""
              webStyle={`
                .m-signature-pad {
                  box-shadow: none;
                  border: none;
                  height: 100%;
                  background-color: transparent;
                  touch-action: none;
                }
                
                .m-signature-pad--body {
                  border: none;
                  height: 180px;
                  width: 100%;
                  margin: 0;
                  background-color: transparent;
                  touch-action: manipulation;
                }
                
                .m-signature-pad--footer {
                  display: flex;
                  justify-content: space-between;
                  padding: 12px 0 0;
                  margin-top: 8px;
                }

                .m-signature-pad--footer .button {
                  touch-action: manipulation;
                  transition: all 0.2s ease;
                }

                .m-signature-pad--footer .button.clear {
                  background-color: #fee2e2;
                  color: #dc2626;
                }

                .m-signature-pad--footer .button.save {
                  background-color: #dcfce7;
                  color: #16a34a;
                }
              `}
              style={{
                height: 180,
                width: "100%",
                backgroundColor: "transparent",
              }}
            />

            {/* Control Buttons */}
            <View className="flex-row justify-center gap-3 mt-4">
              <TouchableOpacity
                onPress={() => {
                  sigRef.current?.undo();
                  setScrollEnabled(true);
                }}
                className="px-5 py-2 bg-gray-100 rounded-lg"
              >
                <Text className="text-gray-700 font-medium">Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sigRef.current?.redo();
                  setScrollEnabled(true);
                }}
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
};

export default DrawingField;