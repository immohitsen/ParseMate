export const predefinedXML = `
<?xml version="1.0" encoding="UTF-8"?>
<form>
    <title>User Information Form</title>
    <description>Fill in the details and provide your signature.</description>
    
    <fields>
        <field id="name">
            <label>Full Name</label>
            <type>text</type>
            <required>true</required>
        </field>

        <field id="email">
            <label>Email</label>
            <type>email</type>
            <required>true</required>
        </field>

        <field id="phone">
            <label>Phone Number</label>
            <type>tel</type>
            <required>false</required>
        </field>

        <field id="signature">
            <label>Signature</label>
            <type>drawing</type>
            <required>true</required>
            <signature>
                <svg width="400" height="150">
                    <rect width="100%" height="100%" fill="white" stroke="black"/>
                    <!-- The user will draw on this canvas -->
                </svg>
            </signature>
        </field>
    </fields>

    <submit>
        <method>POST</method>
        <action>/submit-form</action>
    </submit>
</form>
`;
