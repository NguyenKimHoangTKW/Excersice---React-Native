import Create_New_Account from "./components/CreateNewAccount";
import Login from "./components/LoginScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ResetPassword from "./components/ResetPassword";
const App = () =>{
  return (
    <>
      {/* <Login/> */}
      <ResetPassword/>
    </>
  )
}
export default App;
