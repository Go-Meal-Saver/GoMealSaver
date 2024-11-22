'use server';

import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addMeals(formData) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error('You need to be logged in to add a meals');
    }
    const { userId } = sessionUser;

    // Access all values from Features and image
    const features = formData.getAll('features');
    const images = formData
      .getAll('image')
      .filter((image) => image.name !== '');

    if (!images || images.length === 0) {
      throw new Error('At least one image is required');
    }

    const mealsData = {
      owner: userId, // Use the ID from session
      name: formData.get('name'),
      cuisine: formData.get('cuisine'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      discountPercentage: Number(formData.get('discountPercentage')),
      originalPrice: Number(formData.get('originalPrice')),
      portionSize: formData.get('portionSize'),
      timeRemaining: formData.get('timeRemaining'),
      features,
      restaurant: {
        name: formData.get('restaurant.name'),
        address: formData.get('restaurant.address'),
        city: formData.get('restaurant.city'),
        state: formData.get('restaurant.state'),
        phone: formData.get('restaurant.phone'),
        email: formData.get('restaurant.email'),
      },
      available: true,
    };

    // Upload images to cloudinary
    const imageUrls = [];
    for (const imageFile of images) {
      try {
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = new Uint8Array(imageBuffer);
        const imageData = Buffer.from(imageArray);

        // Convert to base64
        const imageBase64 = imageData.toString('base64');

        // Make request to cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          {
            folder: 'GoMealsSaver',
          }
        );
        imageUrls.push(result.secure_url);
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw new Error('Failed to upload image');
      }
    }

    // Assign the first image as the main image
    mealsData.image = imageUrls[0];

    const newMeals = new Meal(mealsData);
    await newMeals.save();

    revalidatePath('/', 'layout');
    redirect(`/meals/${newMeals._id}`);
  } catch (error) {
    console.error('Error in addMeals:', error);
    throw error;
  }
}

export default addMeals;
