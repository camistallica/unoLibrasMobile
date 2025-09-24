// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <IonPage>
      <Navbar />
      {/* IonContent é o componente que cria a área de scroll */}
      <IonContent fullscreen>
        <div className="main-content-wrapper">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Layout;