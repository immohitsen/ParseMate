import XMLParser from "react-xml-parser";

export const parseXML = (xml) => {
    try {
        const xmlDoc = new XMLParser().parseFromString(xml);

        const fields = xmlDoc.getElementsByTagName("field").map(field => {
            const typeNode = field.children.find(node => node.name === "type");
            const labelNode = field.children.find(node => node.name === "label");
            const placeholderNode = field.children.find(node => node.name === "placeholder");
            const optionsNode = field.children.find(node => node.name === "options");

            const type = typeNode ? typeNode.value : "";
            const label = labelNode ? labelNode.value : "";
            const placeholder = placeholderNode ? placeholderNode.value : "";
            const options = optionsNode && optionsNode.children ? optionsNode.children.map(option => option.value) : [];

            if (!typeNode || !labelNode) {
                console.warn(`⚠️ Missing required fields in field #${index + 1}. Skipping this field.`);
                return null; // Prevents breaking and moves to next field
            }

            return { type, label, placeholder, options };
        });

        return { success: true, form: { fields } };
    } catch (error) {
        console.error("XML Parsing Error:", error.message);
        return { success: false, error: "❌ XML parsing failed. Please check your XML structure." };
    }
};
