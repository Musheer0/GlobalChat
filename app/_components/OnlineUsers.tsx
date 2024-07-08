"use client";

import React, { useEffect } from 'react';
import { useOnlineUserStore } from '@/states/OnlineUsers';
import { useUserStore } from '@/states/user';
import Pusher from 'pusher-js';

const OnlineUsers = () => {
  const { users} = useOnlineUserStore();
  return (
    <div className="flex items-center gap-1">
      <div className="dot w-[11px] h-[11px] bg-green-500 rounded-full animate-pulse"></div>
      <p className="text-xs text-zinc-300">n users online</p>
    </div>
  );
};

export default OnlineUsers;
