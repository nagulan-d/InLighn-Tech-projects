import React from 'react';
import { X, Phone, Video, User, Bell, Shield, Trash2 } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

interface UserProfileProps {
  onClose: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const { activeRoom, rooms, onlineUsers } = useChat();
  
  const currentRoom = rooms.find(room => room.id === activeRoom);
  
  if (!currentRoom) return null;

  const roomParticipants = currentRoom.participants
    .map(id => onlineUsers.find(user => user.id === id))
    .filter(Boolean);

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentRoom.type === 'group' ? 'Group Info' : 'Contact Info'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
        <img
          src={currentRoom.avatar || `https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`}
          alt={currentRoom.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {currentRoom.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {currentRoom.type === 'group' 
            ? `${currentRoom.participants.length} members`
            : 'Online'
          }
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors">
            <Phone className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Audio</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors">
            <Video className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Video</span>
          </button>
        </div>
      </div>

      {/* Group Members or Contact Details */}
      {currentRoom.type === 'group' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
              Members ({roomParticipants.length})
            </h4>
            <div className="space-y-3">
              {roomParticipants.map((member) => member && (
                <div key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {member.username}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {member.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                Contact Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      @{currentRoom.name.toLowerCase().replace(' ', '_')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                Settings
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">Privacy</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                Danger Zone
              </h4>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>Delete Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}