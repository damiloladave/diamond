// src/components/ProfileCard.tsx
import React from 'react';
import { TelegramUser } from '@/types/telegram';
import { ChatBubbleLeftRightIcon, HeartIcon, InformationCircleIcon, QuestionMarkCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

interface ProfileCardProps {
  userData: TelegramUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  return (
    <div className="min-h-screen p-2">
      <div className="flex flex-col gap-4 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
            {/* Profile Image / User Info / Premium? */}
            <div className=" w-full flex flex-row justify-start gap-2 backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
              <div className="relative group">
                <div className="w-18 h-18 rounded-full border-4 border-white/30 backdrop-blur-xl bg-white/10 overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                  {userData.photo_url ? (
                    <Image
                      src={userData.photo_url}
                      alt={`${userData.first_name}'s profile`}
                      width={72} // Required
                      height={72} // Required
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white text-xl font-semibold">
                      {userData.first_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              {/*User Info */}
              <div className="flex flex-col">
                <p className="text-lg font-bold text-blue-200"> {userData.first_name} {userData.last_name}</p>
                {userData.username && ( <p className="text-white text-md">@{userData.username}</p> )}
              </div>

               {/* Premium Badge */}
               {userData.is_premium ? (
                      <div className='text-green-400'> <StarIcon className='w-10 h-10'/></div>
                ) : (
                  <div className='text-yellow text-opacity-10'> <StarIcon className='w-10 h-10'/></div>)}

            </div>

             {/* User ID */}
            <div className="flex items-center justify-between text-blue-200 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
             <div className="flex items-center justify-between gap-2"><UserIcon className="w-5 h-5" /> <span className='text-white'> My ID</span> </div>
              <p className="text-blue-100 text-sm">{userData.id}</p>
            </div>
              {/* Language */}
              <div className="flex items-center justify-between text-blue-200 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between gap-2"> <GlobeAltIcon className="w-5 h-5" /> <span className='text-white'> Language</span></div>
                <span className="text-blue-100 font-medium">{userData.language_code || "en"}</span>
              </div>
              {/* Invite */}
              <Link href="/invite">
                <div className="flex items-center justify-between text-blue-200 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/30 animate-pulse">
                    <div className="flex items-center justify-between gap-2"> <HeartIcon className="w-5 h-5" />
                    <span className='text-white'> Invite Friends</span></div>
                </div>
              </Link>
              {/* Contact Support */}
              <div className="flex items-center justify-between text-blue-200 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between gap-2"> <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span className='text-white'> Contact Support</span></div>
              </div>
              {/* FAQ */}
              <Link href="/faq">
                <div className="flex items-center justify-between text-blue-200 animate-pulse backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between gap-2"> <QuestionMarkCircleIcon className="w-5 h-5" />
                    <span className='text-white'>FAQ</span></div>
                </div>
              </Link>
              {/* Legal Information */}
              <Link href="/legal">
                <div className="flex items-center justify-between text-blue-200 backdrop-blur-md bg-white/5 animate-pulse rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between gap-2"> <InformationCircleIcon className="w-5 h-5" />
                    <span className='text-white'>Legal Notes</span>
                  </div>
               </div>
             </Link>
          </div>
      </div>
  );
  
};

export default ProfileCard;