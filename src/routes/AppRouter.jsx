import React from "react";
import LandingPage from "../pages/landingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const AppRouter = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);
//   const [loading, setLoading] = useState(true);

 // const dispatch = useDispatch();

//   const { user } = useSelector((store) => store.user);
//   console.log(user);

//   console.log(auth)

//   useEffect(() => {
//     onAuthStateChanged(auth, (userLogged) => {
//       if (userLogged?.uid) {
//         setIsLoggedIn(true);
  
//         const db = dataBase; 
  
//         // Obtener referencia al documento del usuario en Firestore
//         const userDocRef = doc(db, 'users', userLogged.uid);
  
//         // Obtener los datos del documento del usuario
//         getDoc(userDocRef)
//           .then((docSnap) => {
//             if (docSnap.exists()) {
//               const userData = docSnap.data();
  
//               // Obtener phone y birthday del documento del usuario
//               const { phone, birthday } = userData;
  
//               const logged = {
//                 email: userLogged.auth.currentUser.email,
//                 fullName: userLogged.auth.currentUser.displayName,
//                 avatar: userLogged.auth.currentUser.photoURL,
//                 accessToken: userLogged.auth.currentUser.accessToken,
//                 phone: phone,
//                 birthday: birthday,
//               };
//               dispatch(loginActionSync(logged));
//             } else {
//               // No se encontró el documento del usuario en Firestore
//               // Aquí puedes decidir cómo manejar esta situación
//             }
//           })
//           .catch((error) => {
//             console.error("Error al obtener los datos del usuario:", error);
//           });
//       } else {
//         setIsLoggedIn(false);
//       }
  
//       setLoading(false);
//     });
//   }, [user, dispatch]);
  

//   if (loading) {
//     return <Spinner animation="grow" />;
//   }


  return (
    <BrowserRouter>
     <Routes>
        {/* <Route element={<PublicRouter isAutentication={isLoggedIn} />}> */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={<StepersLogin />} /> */}
        {/* </Route> */}
        {/* <Route element={<PrivateRouter isAutentication={isLoggedIn} />}>
          <Route path="/*" element={<DashboardRouter />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;