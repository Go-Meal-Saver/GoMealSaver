'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessage';
import deleteMessage from '@/app/actions/deletMessage';
import replyToMessage from '@/app/actions/replyMessage';
import { useGlobalContext } from '@/context/GlobalContext';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? 'read' : 'new'}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success('Message Deleted');
  };

  const handleReplyClick = () => {
    setIsReply(true);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('originalMessageId', message._id);
    formData.append('replyMessage', replyMessage);

    const result = await replyToMessage(formData);

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success('Reply sent successfully');
      setIsReply(false);
      setReplyMessage('');
    }
  };

  if (isDeleted) {
    return <p>Deleted message</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Meal Inquiry:</span> {message.meal.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Name:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.name}
          </a>
        </li>
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {formatDate(message.createdAt)}
        </li>
      </ul>
      {!isReply ? (
        <>
          <button
            onClick={handleReplyClick}
            className="mt-4 mr-3 bg-green-400 text-white py-1 px-3 rounded-md"
          >
            Reply
          </button>
          <button
            onClick={handleReadClick}
            className={`mt-4 mr-3 ${
              isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
            } py-1 px-3 rounded-md`}
          >
            {isRead ? 'Mark As New' : 'Mark As Read'}
          </button>
          <button
            onClick={handleDeleteClick}
            className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
          >
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Type your reply here..."
            required
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md"
          >
            Send Reply
          </button>
          <button
            type="button"
            onClick={() => setIsReply(false)}
            className="mt-2 ml-2 bg-gray-300 text-black py-1 px-3 rounded-md"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageCard;
