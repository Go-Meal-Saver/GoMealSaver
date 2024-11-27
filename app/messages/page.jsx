import connectDB from '@/config/database';
import Message from '@/models/Message';
import MessageCard from '@/components/MessageCard';
import Meal from '@/models/Meal';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializedObject } from '@/utils/convertToObject';

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('meal', 'name')
    .lean();

  const unReadMessages = await Message.find({
    recipient: userId,
    read: false,
  });

  // Convert to serializable object so we can pass to client component.
  const messages = [...unReadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializedObject(messageDoc);
    message.sender = convertToSerializedObject(messageDoc.sender);
    message.meal = convertToSerializedObject(messageDoc.meal);
    return message;
  });

  return (
    <section className="bg-green-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;