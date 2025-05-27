const dotenv = require('dotenv');
const contentfulManagement = require('contentful-management');

// Load environment variables
dotenv.config({path: '.env.local'});


console.log('Management Token:', process.env.VITE_CONTENTFUL_MANAGEMENT);
console.log('Space ID:', process.env.VITE_CONTENTFUL_SPACE);

const getContentfulEnvironment = async () => {
    if (!process.env.VITE_CONTENTFUL_MANAGEMENT || !process.env.VITE_CONTENTFUL_SPACE) {
        throw new Error('Environment variables VITE_CONTENTFUL_MANAGEMENT and VITE_CONTENTFUL_SPACE are required.');
    }

    const client = contentfulManagement.createClient({
        accessToken: process.env.VITE_CONTENTFUL_MANAGEMENT,
    });

    const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE);
    return space.getEnvironment('master');
};

module.exports = getContentfulEnvironment;