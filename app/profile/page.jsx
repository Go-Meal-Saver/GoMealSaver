import Image from 'next/image';
import connectDB from '@/config/database';
import Meal from '@/models/Meals';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import ProfileMeals from '@/components/ProfileMeals';
import { convertToSerializedObject } from '@/utils/convertToObject';
import { FaEnvelope, FaUser, FaUtensils } from 'react-icons/fa';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/login');
  }
  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('You need to sign in to view this page');
  }

  const mealsDocs = await Meal.find({ owner: userId }).lean();
  const meals = mealsDocs.map((meal) => convertToSerializedObject(meal));

  console.log('Session User Image:', sessionUser.user.image);
  console.log('Profile Default Image:', profileDefault);

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto py-32 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header gradient */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>

          <div className="relative px-8 py-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Section */}
              <div className="md:w-1/3">
                <div className="relative -mt-24 mb-6">
                  <Image
                    className="h-40 w-40 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
                    src={sessionUser.user.image || profileDefault}
                    width={160}
                    height={160}
                    alt="User Profile"
                    priority
                  />
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <FaUser className="text-green-600" />
                    <div>
                      <p className="text-sm text-green-600">Name</p>
                      <p className="font-semibold text-green-900">
                        {sessionUser.user.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <FaEnvelope className="text-green-600" />
                    <div>
                      <p className="text-sm text-green-600">Email</p>
                      <p className="font-semibold text-green-900">
                        {sessionUser.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <FaUtensils className="text-green-600" />
                    <div>
                      <p className="text-sm text-green-600">Total Meals</p>
                      <p className="font-semibold text-green-900">
                        {meals.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meals Section */}
              <div className="md:w-2/3">
                <div className="bg-white/60 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6 text-gray-700">
                    Your Meals
                  </h2>
                  <ProfileMeals meals={meals} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
