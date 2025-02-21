import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../Provider/useAuth';

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [foodStatus] = useState("available");

  const handleImageChange = async (e) => {
    const img = e.target.files?.[0];
    if (!img) return;
    
    setUploading(true); // Indicate uploading starts
  
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", 'Free_Food_BD');
    formData.append("cloud_name", "dg04kyz8n");
  
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dg04kyz8n/image/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        setImage(response.data.url); // Store image URL in state
        console.log(response.data, 'Upload response');
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false); // Indicate uploading ends
    }
  };
  

 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodQuantity = parseFloat(form.foodQuantity.value);
    const pickupLocation = form.pickupLocation.value;
    const expiredDateTime = form.expiredDateTime.value;
    const additionalNotes = form.additionalNotes.value;
    const email = form.donatorEmail.value;

    const foodImage = image;
    

    const foodData = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiredDateTime,
      additionalNotes,
      booked: false,
      donar: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-food`, foodData);
      toast.success("Food Donation Added Successfully!");
      navigate("/my-food");
    } catch (err) {
      console.error(err);
      toast.error("Error adding food donation");
    }
  };

  return (
    <section className="p-6 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Food Donation Form</h2>
        
        <div className="mt-6">
          <label className="block text-sm font-medium">Food Name</label>
          <input name="foodName" type="text" required className="w-full bg-slate-300 text-black p-2 border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Upload Food Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full  bg-slate-300 text-black p-2 border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Food Quantity</label>
          <input name="foodQuantity" type="number" min="1" required className="w-full  bg-slate-300 text-black p-2 border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Pickup Location</label>
          <input name="pickupLocation" type="text" required className="w-full  bg-slate-300 text-black p-2 border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Expiration Date/Time</label>
          <input name="expiredDateTime" type="datetime-local" required className="w-full  bg-slate-300 text-black p-2 border rounded-md" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Additional Notes</label>
          <textarea name="additionalNotes" className="w-full  bg-slate-300 text-black p-2 border rounded-md"></textarea>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Donator Email</label>
          <input name="donatorEmail" type="email" value={user?.email} readOnly className="w-full   text-black p-2 border bg-gray-100 rounded-md" />
        </div>

        <button type="submit" className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md">
          {uploading ? "Uploading..." : "Add Donation"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;
