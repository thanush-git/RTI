import React, { createContext, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ followers: 0, following: 0 });
  const [userPosts, setUserPosts] = useState([]);

  const incrementFollowers = () =>
    setUserData((prev) => ({ ...prev, followers: prev.followers + 1 }));
  const incrementFollowing = () =>
    setUserData((prev) => ({ ...prev, following: prev.following + 1 }));

  const wrapStrings = (child) => {
    if (typeof child === 'string') {
      return <Text style={{ color: '#000', fontSize: 1,marginBottom:-3 }}>{child}</Text>;
    }

    if (Array.isArray(child)) {
      return child.map((c, index) => <React.Fragment key={index}>{wrapStrings(c)}</React.Fragment>);
    }

    if (React.isValidElement(child)) {
      const newProps = {};
      if (child.props.children) {
        newProps.children = wrapStrings(child.props.children);
      }
      return React.cloneElement(child, newProps);
    }

    return child;
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        incrementFollowers,
        incrementFollowing,
        userPosts,
        setUserPosts,
      }}
    >
      <SafeAreaView style={{flex:1}}>{wrapStrings(children)}</SafeAreaView>
    </UserContext.Provider>
  );
};
