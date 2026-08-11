'use client';

import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { App as AppContent } from '../src/App';

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
