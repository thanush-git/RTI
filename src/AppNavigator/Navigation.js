

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Publisher from '../screens/NewsDetail';
import NewsDetail from '../screens/Publisher';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Signup from '../screens/Signup';
import NewsSourceScreen from '../screens/NewsSourceScreen';
import ConstituencyScreen from '../screens/ConstituencyScreen';
import MainApp from './../screens/MainApp/MainApp';
import FullNews from './../screens/MainApp/FullNews';
import NotificationScreen from './../screens/MainApp/NotificationScreen';
import Menu from '../components/Menu/menu';
import LocationSearch from './../screens/MainApp/LocationSearch';
import CityScreen from './../screens/MainApp/CityScreen';
import FillProfile from '../screens/FillProfile';
import Categories from '../screens/Categories';
import Setting from '../screens/Setting';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import ProfilePreview from '../screens/ProfilePreview';
import AddPostScreen from '../screens/AddPostScreen';
import EditProfile from '../screens/EditProfile';
import {UserContext} from '../screens/UserContext'; 
import ForgotPassword from '../screens/ForgotPassword';
import OtpVerification from '../screens/OtpVerification';
import ResetPassword from '../screens/ResetPassword';
import SuccessScreen from '../screens/SuccessScreen';
import Explore from './../screens/MainApp/Explore';
import Homes from './../screens/MainApp/Homes';
import Bookmark from './../screens/MainApp/Bookmark';
import Profile from './../screens/MainApp/Profile';
import NStartScreen from './../news/NStartScreen';
import NSignInScreen from './../news/NSignInScreen';
import NSignUpScreen from './../news/NSignUpScreen';
import NHomeScreen from './../news/NHomeScreen';
import NNotificationsScreen from './../news/NNotificationsScreen';
import MediaScreen from './../news/MediaScreen';
import TechScreen from './../news/TechScreen';
import VideosScreen from '../screens/VideosScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import LiveStatisticsScreen from '../screens/LiveStatisticsScreen';
import Register from '../screens/Register';
import FeedbackScreen from '../screens/FeedbackScreen';
import EpaperScreen from '../screens/EpaperScreen';
import LanguageScreen from '../screens/LanguageScreen';
import JoinRTIScreen from '../screens/JoinRTIScreen';
import RTIExpressForm from '../screens/RTIExpressForm';
import RTIActivistForm from '../screens/RTIActivistForm';
import ALoginScreen from '../screens/ALoginScreen';
import PublishNewsScreen from '../screens/PublishNewsScreen';
import NewsList from '../screens/NewsList';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import CitizenVoice from '../screens/CitizenVoice';
import StateSelections from '../screens/StateSelections';
import OTPScreen from '../screens/OTPScreen';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  const insets=useSafeAreaInsets();
  return (

    
      <SafeAreaView edges={['top','left','right']} style={{flex:1,paddingBottom:insets.bottom}}>
        <StatusBar backgroundColor='white' barStyle='dark-content'/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Publisher" component={NewsDetail} />
        <Stack.Screen name="NewsDetail" component={Publisher} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ConstituencyScreen" component={ConstituencyScreen} />
        <Stack.Screen name="NewsSourceScreen" component={NewsSourceScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="FullNews" component={FullNews} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="LocationSearch" component={LocationSearch} />
        <Stack.Screen name="CityScreen" component={CityScreen} />
        <Stack.Screen name="FillProfile" component={FillProfile} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="ProfilePreview" component={ProfilePreview} />
        <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Homes" component={Homes} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="NStartScreen" component={NStartScreen} />
        <Stack.Screen name="NSignInScreen" component={NSignInScreen} />
        <Stack.Screen name="NSignUpScreen" component={NSignUpScreen} />
        <Stack.Screen name="NHomeScreen" component={NHomeScreen} />
        <Stack.Screen name="MediaScreen" component={MediaScreen} />
        <Stack.Screen name="TechScreen" component={TechScreen} />
        <Stack.Screen name="NNotifications" component={NNotificationsScreen} />
        <Stack.Screen name="VideosScreen" component={VideosScreen} />
        <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
        <Stack.Screen name="LiveStatisticsScreen" component={LiveStatisticsScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="EpaperScreen" component={EpaperScreen} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="JoinRTIScreen" component={JoinRTIScreen} />
        <Stack.Screen name="RTIExpressForm" component={RTIExpressForm} />
        <Stack.Screen name="RTIActivistForm" component={RTIActivistForm} />
        <Stack.Screen name="ALoginScreen" component={ALoginScreen} />
        <Stack.Screen name="PublishNewsScreen" component={PublishNewsScreen} />
        <Stack.Screen name="NewsList" component={NewsList} />
        <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
        <Stack.Screen name="CitizenVoice" component={CitizenVoice} />
        <Stack.Screen name="StateSelections" component={StateSelections} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        {/* <Stack.Screen name="UserContext" component={UserContext} /> */}

        
      </Stack.Navigator>
    </NavigationContainer></SafeAreaView>
  );
}

