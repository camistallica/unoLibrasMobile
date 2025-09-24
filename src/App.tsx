// src/App.tsx
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthProvider, useAuth } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sinais from "./pages/Sinais";
import Dicionario from "./pages/Dicionario";
import Profile from "./pages/Profile";
import Praticar from "./pages/Praticar";
import Alfabeto from "./pages/Alfabeto";
import LessonList from "./pages/LessonList";
import LessonPage from "./pages/LessonPage";
import Informacoes from "./pages/Informacoes";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <IonRouterOutlet>
      <Switch>
        {/* Rotas Públicas */}
        <Route path="/welcome" component={Welcome} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={Login} exact />

        {/* Rotas Protegidas */}
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/sinais" component={Sinais} />
        <ProtectedRoute path="/alfabeto" component={Alfabeto} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/dicionario" component={Dicionario} />
        <ProtectedRoute path="/praticar" component={Praticar} />
        <ProtectedRoute path="/informacoes" component={Informacoes} />
        <ProtectedRoute path="/categoria/:categoryId/licao/:lessonId" component={LessonPage} />
        <ProtectedRoute path="/categoria/:categoryId" component={LessonList} />

        {/* Redirecionamento */}
        <Route path="/" exact>
          {currentUser ? <Redirect to="/home" /> : <Redirect to="/welcome" />}
        </Route>
        <Redirect to="/" />
      </Switch>
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <AppRoutes />
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;