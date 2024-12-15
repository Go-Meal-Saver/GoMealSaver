'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Mail, Phone, User } from 'lucide-react';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from './SubmitMessageButton';

const MealContactForm = ({ meal }) => {
  const { data: session } = useSession();
  const [state, formAction] = useFormState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {
    return (
      <div className="flex flex-col items-center justify-center bg-green-50 p-8 rounded-lg shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p className="text-green-700 text-xl font-semibold text-center">
          Your message has been sent successfully
        </p>
      </div>
    );
  }

  return (
    session && (
      <div className="max-w-md mx-auto  md:max-w-2xl">
        <div className="p-8">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
            Contact Meal Seller
          </h3>

          <form action={formAction} className="space-y-6">
            <input
              type="hidden"
              id="meal"
              name="meal"
              defaultValue={meal._id}
            />
            <input
              type="hidden"
              id="recipient"
              name="recipient"
              defaultValue={meal.owner}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                >
                  <User className="mr-2 text-gray-400" size={20} />
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                >
                  <Mail className="mr-2 text-gray-400" size={20} />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <Phone className="mr-2 text-gray-400" size={20} />
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <div className="pt-4">
              <SubmitMessageButton className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center" />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default MealContactForm;
