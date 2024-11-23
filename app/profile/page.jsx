import Image from 'next/image';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import { convertToSerializedObject } from '@/utils/convertToObject';
export default function ProfilePage() {
  return (
    <section>
      <h1>Profile</h1>
    </section>
  );
}
