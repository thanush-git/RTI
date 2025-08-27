
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function EpaperScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.rtiexpressnews.com/' }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="#2F6BFF"
            size="large"
            style={styles.loader}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
