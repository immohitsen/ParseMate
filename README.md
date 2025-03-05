# ParseMate

**ParseMate** is a smart XML parsing and form rendering app. It allows users to upload or paste XML data and automatically generates interactive forms.

## 🚀 Features
- Parse XML-based form definitions.
- Auto-generate dynamic forms from XML input.
- Support for various input types: text, email, radio, checkbox, and date.
- Simple and intuitive UI.

## 📥 Installation

```sh
git clone https://github.com/YOUR_USERNAME/ParseMate.git
cd ParseMate
npm install
```

## ▶️ Running the App

To start the development server:
```sh
npx expo start
```

To build an APK:
```sh
npx expo prebuild
npx eas build -p android --profile preview
```

## 📄 XML Form Example

ParseMate supports XML-based form definitions. Below is an example of an XML form that can be parsed:

```xml
<form>
    <fields>
        <field>
            <type>text</type>
            <label>Full Name</label>
            <placeholder>Enter your full name</placeholder>
        </field>
        <field>
            <type>email</type>
            <label>Email Address</label>
            <placeholder>Enter your email</placeholder>
        </field>
        <field>
            <type>radio</type>
            <label>Gender</label>
            <options>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </options>
        </field>
        <field>
            <type>checkbox</type>
            <label>Interests</label>
            <options>
                <option>Technology</option>
                <option>Sports</option>
                <option>Music</option>
                <option>Art</option>
            </options>
        </field>
        <field>
            <type>date</type>
            <label>Date of Birth</label>
            <placeholder>Select your birth date</placeholder>
        </field>
    </fields>
</form>
```

## 🛠️ Technologies Used
- **React Native** with Expo
- **NativeWind** for styling
- **Lucide-react-native** for icons

## 📌 Contributing
Feel free to submit issues and pull requests! Contributions are welcome.

## 📜 License
MIT License. See `LICENSE` for details.
