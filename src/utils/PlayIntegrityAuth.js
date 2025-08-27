import { NativeModules, Platform } from 'react-native';

const { PlayIntegrityModule } = NativeModules;

class PlayIntegrityAuth {
  constructor() {
    // Don't throw error in constructor, handle it in methods instead
    this.isModuleAvailable = !!PlayIntegrityModule;
  }

  /**
   * Send OTP to phone number using Play Integrity API
   * @param {string} phoneNumber - Phone number with country code (e.g., +911234567890)
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} - Promise that resolves with verification details
   */
  async signInWithPhoneNumber(phoneNumber, options = {}) {
    try {
      if (Platform.OS !== 'android') {
        throw new Error('Play Integrity API is only available on Android');
      }

      if (!this.isModuleAvailable) {
        // Fallback to demo mode when module is not available
        console.warn('PlayIntegrityModule not available, using demo mode');
        return {
          status: 'codeSent',
          verificationId: 'demo-verification-id',
          phoneNumber: phoneNumber
        };
      }

      const result = await PlayIntegrityModule.signInWithPhoneNumber(phoneNumber, options);
      return result;
    } catch (error) {
      console.error('PlayIntegrityAuth signInWithPhoneNumber error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP code
   * @param {string} verificationId - Verification ID received from signInWithPhoneNumber
   * @param {string} code - OTP code entered by user
   * @returns {Promise<Object>} - Promise that resolves with user details
   */
  async verifyPhoneNumberWithCode(verificationId, code) {
    try {
      if (Platform.OS !== 'android') {
        throw new Error('Play Integrity API is only available on Android');
      }

      if (!this.isModuleAvailable) {
        // Fallback to demo mode when module is not available
        console.warn('PlayIntegrityModule not available, using demo mode');
        if (verificationId === 'demo-verification-id' && code === '123456') {
          return {
            status: 'success',
            uid: 'demo-user-id'
          };
        } else {
          throw new Error('Invalid OTP code');
        }
      }

      const result = await PlayIntegrityModule.verifyPhoneNumberWithCode(verificationId, code);
      return result;
    } catch (error) {
      console.error('PlayIntegrityAuth verifyPhoneNumberWithCode error:', error);
      throw error;
    }
  }

  /**
   * Check if Play Integrity API is available
   * @returns {boolean} - True if available, false otherwise
   */
  isAvailable() {
    return Platform.OS === 'android' && this.isModuleAvailable;
  }
}

export default new PlayIntegrityAuth();
