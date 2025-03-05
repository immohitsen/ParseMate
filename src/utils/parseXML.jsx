import XMLParser from 'react-xml-parser';

export const parseXML = (xml) => {
    try {
        const xmlDoc = new XMLParser().parseFromString(xml);
        const fields = xmlDoc.getElementsByTagName("field").map(field => {
            const type = field.children.find(node => node.name === "type")?.value || "";
            const label = field.children.find(node => node.name === "label")?.value || "";
            const placeholder = field.children.find(node => node.name === "placeholder")?.value || "";
            const options = field.children.find(node => node.name === "options")?.children.map(option => option.value) || [];
            
            return { type, label, placeholder, options };
        });
        
        return { form: { fields } };
    } catch (error) {
        console.error('XML Parsing Error:', error);
        return null;
    }
};