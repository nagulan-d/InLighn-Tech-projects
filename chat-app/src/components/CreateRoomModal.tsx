import React, { useState } from 'react';
import { X, Users, MessageSquare, User } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

interface CreateRoomModalProps {
  onClose: () => void;
}

export default function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const { createRoom, onlineUsers } = useChat();
  const [roomType, setRoomType] = useState<'direct' | 'group'>('group');
  const [roomName, setRoomName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (roomType === 'group' && roomName.trim()) {
      createRoom(roomName.trim(), 'group', selectedUsers);
      onClose();
    } else if (roomType === 'direct' && selectedUsers.length === 1) {
      const selectedUser = onlineUsers.find(u => u.id === selectedUsers[0]);
      if (selectedUser) {
        createRoom(selectedUser.username, 'direct', selectedUsers);
        onClose();
      }
    }
  };

  const toggleUserSelection = (userId: string) => {
    if (roomType === 'direct') {
      setSelectedUsers([userId]);
    } else {
      setSelectedUsers(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create New Chat
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Room Type Selection */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRoomType('direct');
                  setSelectedUsers([]);
                  setRoomName('');
                }}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  roomType === 'direct'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <MessageSquare className={`w-6 h-6 mx-auto mb-2 ${
                  roomType === 'direct' ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  roomType === 'direct' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Direct Chat
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setRoomType('group');
                  setSelectedUsers([]);
                  setRoomName('');
                }}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  roomType === 'group'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Users className={`w-6 h-6 mx-auto mb-2 ${
                  roomType === 'group' ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  roomType === 'group' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Group Chat
                </span>
              </button>
            </div>
          </div>

          {/* Room Name (for groups) */}
          {roomType === 'group' && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter group name..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
          )}

          {/* User Selection */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              {roomType === 'direct' ? 'Select Contact' : 'Add Members'}
              {roomType === 'direct' && <span className="text-orange-500"> (Choose one)</span>}
            </h3>
            
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => toggleUserSelection(user.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedUsers.includes(user.id)
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {user.username}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {user.status}
                    </p>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  (roomType === 'group' && (!roomName.trim() || selectedUsers.length === 0)) ||
                  (roomType === 'direct' && selectedUsers.length !== 1)
                }
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-green-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Create Chat
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}