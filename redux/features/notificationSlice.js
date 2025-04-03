import { createSlice } from '@reduxjs/toolkit';

let nextNotificationId = 1;

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: nextNotificationId++,
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      
      state.notifications = [notification, ...state.notifications].slice(0, 10);
    },
    
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationId
      );
    },
    
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      );
    },
    
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { 
  addNotification, 
  removeNotification, 
  markAsRead, 
  clearAllNotifications 
} = notificationSlice.actions;

export default notificationSlice.reducer;
