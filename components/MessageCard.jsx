'use client';
/* eslint-disable no-undef */
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessage';
import deleteMessage from '@/app/actions/deletMessage';
import replyToMessage from '@/app/actions/replyMessage';
import { useGlobalContext } from '@/context/GlobalContext';

// Toast configuration object
const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Date formatter utility
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const read = await markMessageAsRead(message._id);
      setIsRead(read);
      setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
      toast.success(`Marked as ${read ? 'read' : 'new'}`, TOAST_CONFIG);
    } catch (error) {
      toast.error('Failed to mark message', TOAST_CONFIG);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteMessage(message._id);
      setIsDeleted(true);
      setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
      toast.success('Message Deleted', TOAST_CONFIG);
    } catch (error) {
      toast.error('Failed to delete message', TOAST_CONFIG);
    }
  };

  const handleReplySubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      const trimmedReply = replyMessage.trim();
      if (!trimmedReply) {
        toast.error('Reply message cannot be empty', TOAST_CONFIG);
        return;
      }

      try {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        const result = await replyToMessage({
          originalMessageId: message._id,
          replyMessage: trimmedReply,
        });

        if (result.error) {
          toast.error(result.error, TOAST_CONFIG);
          return;
        }

        toast.success('Reply sent successfully', TOAST_CONFIG);
        setIsReply(false);
        setReplyMessage('');
      } catch (error) {
        toast.error('Failed to send reply', TOAST_CONFIG);
      } finally {
        setIsSubmitting(false);
      }
    },
    [message._id, replyMessage, isSubmitting]
  );

  if (isDeleted) return <p>Deleted message</p>;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}

      <h2 className="text-xl mb-4">
        <span className="font-bold">Meal Inquiry:</span>{' '}
        {message.meal?.name || 'No Meal'}
      </h2>

      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4 space-y-1">
        {[
          { label: 'Reply Name', value: message.name },
          { label: 'Reply Email', value: message.email, type: 'email' },
          { label: 'Reply Phone', value: message.phone, type: 'tel' },
          { label: 'Received', value: formatDate(message.createdAt) },
        ].map(({ label, value, type }) => (
          <li key={label}>
            <strong>{label}:</strong>{' '}
            {type ? (
              <a href={`${type}:${value}`} className="text-blue-500">
                {value}
              </a>
            ) : (
              value
            )}
          </li>
        ))}
      </ul>

      {!isReply ? (
        <div className="mt-4 space-x-3">
          <button
            onClick={() => setIsReply(true)}
            className="bg-green-400 text-white py-1 px-3 rounded-md"
          >
            Reply
          </button>
          <button
            onClick={handleReadClick}
            className={`${
              isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
            } py-1 px-3 rounded-md`}
          >
            {isRead ? 'Mark As New' : 'Mark As Read'}
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white py-1 px-3 rounded-md"
          >
            Delete
          </button>
        </div>
      ) : (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Type your reply here..."
            required
            disabled={isSubmitting}
          />
          <div className="mt-2 space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white py-1 px-3 rounded-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Reply'}
            </button>
            <button
              type="button"
              onClick={() => setIsReply(false)}
              disabled={isSubmitting}
              className={`bg-gray-300 text-black py-1 px-3 rounded-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MessageCard;
