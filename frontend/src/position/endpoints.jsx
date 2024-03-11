

////////// Endpoints POST connections ///////////

    

// Sends the location data to the fastapi endpoints
const sendLocationData = async (locationData) => {
    try {
        // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
        const response = await fetch('https://10.42.0.1/api/locations/create/', {
        // const response = await fetch('http://localhost:8000/locations/create/', {
        method: "POST",  
        body: JSON.stringify(locationData),
        headers: {
        "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Response from FastAPI:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

export { sendLocationData };