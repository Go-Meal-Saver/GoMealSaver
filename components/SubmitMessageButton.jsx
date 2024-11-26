import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

const SubmitMessageButton = ({ className }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`
        bg-blue-500 hover:bg-blue-600 
        text-white font-bold py-2 px-4 
        rounded-full w-full 
        focus:outline-none focus:shadow-outline 
        flex items-center justify-center
        transition duration-300
        ${pending ? 'opacity-70 cursor-not-allowed' : ''}
        ${className || ''}
      `}
      type="submit"
      disabled={pending}
    >
      <FaPaperPlane className={`mr-2 ${pending ? 'animate-pulse' : ''}`} />
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SubmitMessageButton;
