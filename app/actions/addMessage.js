'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function addMessage(prevState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You need to be logged in to send a message');
  }

  const { user } = sessionUser;

  // Use formData.get correctly
  const recipient = formData.get('recipient');

  if (user.id === recipient) {
    throw new Error('You cannot send a message to yourself');
  }

  const newMessage = new Message({
    sender: user.id,
    recipient,
    meal: formData.get('meal'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
