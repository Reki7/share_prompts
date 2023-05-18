'use client';
import React from 'react';
import {SessionProvider} from "next-auth/react";

// TODO: any!!!
export interface IProviderProps extends React.ComponentProps<any>{

}
const Provider: React.FC<IProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;