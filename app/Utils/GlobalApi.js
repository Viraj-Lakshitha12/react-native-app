import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = "AIzaSyAF6modZ-9xq9rRz_3v-JFpHcAafvFJXqw";

const NewNearByPlaces = async (data) => {
    const { location, radius, type } = data; // Destructure the necessary parameters

    // Validate parameters
    if (!location || !radius || !type) {
        console.error('Error: Missing required parameters');
        return;
    }

    // Construct the URL with query parameters
    const url = `${BASE_URL}?location=${encodeURIComponent(location)}&radius=${encodeURIComponent(radius)}&type=${encodeURIComponent(type)}&key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("HI:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching nearby places:', error);
        throw error;
    }
}

const getDirections = async (origin, destination) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
            params: {
                origin,
                destination,
                key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching directions:', error);
        throw error;
    }
};

export default {
    NewNearByPlaces,
    API_KEY,
    getDirections
}
