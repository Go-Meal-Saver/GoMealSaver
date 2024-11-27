'use server';

import connectDB from '@/config/database';
import { revalidatePath } from 'next/cache';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function replyToMessage(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You need to be logged in to reply to a message');
  }

  const { user } = sessionUser;

  const originalMessageId = formData.get('originalMessageId');
  const originalMessage = await Message.findById(originalMessageId);
  if (!originalMessage) {
    throw new Error('Message not found');
  }

  const newMessage = new Message({
    sender: user.id,
    recipient: originalMessage.sender,
    meal: originalMessage.meal,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('replyMessage'),
    isReplay: true,
    originalMessage: originalMessageId,
  });

  await newMessage.save();

  originalMessage.read = true;
  await originalMessage.save();

  revalidatePath('/messages');

  return { submitted: true };
}

export default replyToMessage;
