import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_ONBOARDING_DONE = '@mixi/onboarding_completed';
const KEY_POST_REG_INTRO = '@mixi/post_registration_intro_pending';

export async function hasCompletedOnboarding() {
  return (await AsyncStorage.getItem(KEY_ONBOARDING_DONE)) === 'true';
}

export async function setOnboardingCompleted() {
  await AsyncStorage.setItem(KEY_ONBOARDING_DONE, 'true');
  await AsyncStorage.removeItem(KEY_POST_REG_INTRO);
}

/** Call after successful registration; intro shows on next login, once per device. */
export async function markPostRegistrationIntroPending() {
  if (await hasCompletedOnboarding()) return;
  await AsyncStorage.setItem(KEY_POST_REG_INTRO, 'true');
}

export async function shouldShowIntroAfterLogin() {
  if (await hasCompletedOnboarding()) return false;
  return (await AsyncStorage.getItem(KEY_POST_REG_INTRO)) === 'true';
}
