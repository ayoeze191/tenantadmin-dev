import axios from "axios";
import {useToast} from "vue-toast-notification";


const cloud_name = import.meta.env.VITE_API_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_API_CLOUDINARY_UPLOAD_PRESET;

export const capitalize = (str) => {
    if (str) {
      str = str.split(" ");
      for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
      return str.join(" ");
    }
};

export const preferences = localStorage.getItem("furward_preferences");

export const provinceOptions = [
    { value: 'Alberta', label: 'Alberta' },
    { value: 'British Columbia', label: 'British Columbia' },
    { value: 'Manitoba', label: 'Manitoba' },
    { value: 'New Brunswick', label: 'New Brunswick' },
    { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
    { value: 'Nova Scotia', label: 'Nova Scotia' },
    { value: 'Ontario', label: 'Ontario' },
    { value: 'Prince Edward Island', label: 'Prince Edward Island' },
    { value: 'Quebec', label: 'Quebec' },
    { value: 'Saskatchewan', label: 'Saskatchewan' },
    { value: 'Northwest Territories', label: 'Northwest Territories' },
    { value: 'Nunavut', label: 'Nunavut' },
    { value: 'Yukon', label: 'Yukon' },
];

export const formatAmount = (value) => {
    if(!isNaN(value)){
        return value/100
    }
    return 0
}

export const getNextDay = (tomorrow) => {
    return tomorrow.setDate(tomorrow.getDate()+1)
}

export const isDateInPast = (firstDate, secondDate) =>
firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0);

export const getCities = (value) => {
    if (value === "Alberta") {
        return [{value: 'Calgary', label: 'Calgary'},{value: 'Edmonton', label: 'Edmonton'},{value: 'Red Deer', label: 'Red Deer'}];
    } else if (value === "British Columbia") {
        return [{value: 'Vancouver', label: 'Vancouver'},{value: 'Victoria', label: 'Victoria'},{value: 'Kelowna', label: 'Kelowna'}];
    } else if (value === "Manitoba") {
        return [{value: 'Winnipeg', label: 'Winnipeg'},{value: 'Brandon', label: 'Brandon'},{value: 'Steinbach', label: 'Steinbach'}];
    } else if (value === "New Brunswick") {
        return [{value: 'Fredericton', label: 'Fredericton'},{value: 'Moncton', label: 'Moncton'},{value: 'Saint John', label: 'Saint John'}];
    } else if (value === "Newfoundland and Labrador") {
        return [{value: "St. John's", label: "St. John's"},{value: 'Mount Pearl', label: 'Mount Pearl'},{value: 'Corner Brook', label: 'Corner Brook'}];
    } else if (value === "Nova Scotia") {
        return [{value: 'Halifax', label: 'Halifax'},{value: 'Dartmouth', label: 'Dartmouth'},{value: 'Sydney', label: 'Sydney'}];
    } else if (value === "Ontario") {
        return [{value: 'Toronto', label: 'Toronto'},{value: 'Ottawa', label: 'Ottawa'},{value: 'Mississauga', label: 'Mississauga'}];
    } else if (value === "Prince Edward Island") {
        return [{value: 'Charlottetown', label: 'Charlottetown'},{value: 'Summerside', label: 'Summerside'},{value: 'Stratford', label: 'Stratford'}];
    } else if (value === "Quebec") {
        return [{value: 'Montreal', label: 'Montreal'},{value: 'Quebec City', label: 'Quebec City'},{value: 'Laval', label: 'Laval'}];
    } else if (value === "Saskatchewan") {
        return [{value: 'Saskatoon', label: 'Saskatoon'},{value: 'Regina', label: 'Regina'},{value: 'Prince Albert', label: 'Prince Albert'}];
    } else if (value === "Northwest Territories") {
        return [{value: 'Yellowknife', label: 'Yellowknife'},{value: 'Hay River', label: 'Hay River'},{value: 'Inuvik', label: 'Inuvik'}];
    } else if (value === "Nunavut") {
        return [{value: 'Iqaluit', label: 'Iqaluit'},{value: 'Rankin Inlet', label: 'Rankin Inlet'},{value: 'Arviat', label: 'Arviat'}];
    } else if (value === "Yukon") {
        return [{value: 'Whitehorse', label: 'Whitehorse'},{value: 'Dawson City', label: 'Dawson City'},{value: 'Watson Lake', label: 'Watson Lake'}];
    } else {
        return [];
    }
}

export const handleToast = (message,type) => {
    const $toast = useToast({position: 'top-right'})
    if(type == 'success'){
        $toast.success(message);
    } else if(type == 'error'){
        $toast.error(message)
    }
}

export const uploadImages = async (images) => {
    // uploading all the images
    const uploadPromises = images.forEach(async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', upload_preset); // Replace with your preset
        formData.append('cloud_name', cloud_name);

        try {
            const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, 
            formData
            );
            return response.data.secure_url; // Return the uploaded image URL
        } catch (error) {
            handleToast(`Error uploading image: ${error}`, 'error');
            return null;
        }
    });

    // Wait for all uploads to complete and update the state with the URLs
    const urls = await Promise.all(uploadPromises);
    const filteredUrls = urls.filter(url => url !== null);
    return filteredUrls;
}

export const uploadImage = async (image) =>{
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', upload_preset); // Replace with your preset
    formData.append('cloud_name', cloud_name);

    try {
        const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, 
        formData
        );
        return response.data; // Return the uploaded image URL
    } catch (error) {
        handleToast(`Error uploading image: ${error}`, 'error');
        return null;
    }
}