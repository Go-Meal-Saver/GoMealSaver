/* eslint-disable react/no-unescaped-entities */
import connectDB from '@/config/database';
import Message from '@/models/Message';
import MessageCard from '@/components/MessageCard';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { FaInbox, FaRegEnvelope } from 'react-icons/fa';

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('meal', 'name')
    .lean();

  const unReadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('meal', 'name')
    .lean();

  // Convert to serializable object so we can pass to client component.
  const messages = [...unReadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializedObject(messageDoc);
    message.sender = convertToSerializedObject(messageDoc.sender);
    message.meal = convertToSerializedObject(messageDoc.meal);
    return message;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="container mx-auto py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-fern-green-600 px-6 py-8">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <FaInbox className="w-8 h-8" />
                Your Messages
                {unReadMessages.length > 0 && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                    {unReadMessages.length} new
                  </span>
                )}
              </h1>
            </div>

            {/* Messages Content */}
            <div className="px-6 py-8">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <FaRegEnvelope className="w-16 h-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    No Messages Yet
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    When you receive messages from other users about your meals,
                    they'll appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unReadMessages.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="bg-red-100 p-1 rounded">
                          <FaRegEnvelope className="w-4 h-4 text-red-500" />
                        </span>
                        Unread Messages
                      </h2>
                      <div className="space-y-3">
                        {unReadMessages.map((message) => (
                          <MessageCard
                            key={message._id}
                            message={convertToSerializedObject(message)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {readMessages.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <span className="bg-gray-100 p-1 rounded">
                          <FaRegEnvelope className="w-4 h-4 text-gray-500" />
                        </span>
                        Previous Messages
                      </h2>
                      <div className="space-y-3">
                        {readMessages.map((message) => (
                          <MessageCard
                            key={message._id}
                            message={convertToSerializedObject(message)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
