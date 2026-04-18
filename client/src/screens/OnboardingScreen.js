import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { setOnboardingCompleted } from '../storage/introFlags';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    key: '1',
    icon: 'musical-notes',
    title: 'Discover & mix',
    body: 'Explore sounds and build mixes that match your mood.',
  },
  {
    key: '2',
    icon: 'people',
    title: 'Connect',
    body: 'Share mixes and find people who like the same vibe.',
  },
  {
    key: '3',
    icon: 'flash',
    title: 'Make it yours',
    body: 'Customize your profile and keep your library in one place.',
  },
];

export default function OnboardingScreen() {
  
  const navigation = useNavigation();
  const listRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const isLast = index === SLIDES.length - 1;

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, []);

  const goNext = () => {
    if (isLast) return;
    const next = index + 1;
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
  };

  const finish = async () => {
    await setOnboardingCompleted();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  const onMomentumScrollEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / SCREEN_WIDTH));
  };

  return (
    <View style={styles.root}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        getItemLayout={(_, i) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * i,
          index: i,
        })}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <Ionicons name={item.icon} size={120} color="#4f46e5" style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        {isLast ? (
          <Pressable style={styles.primaryBtn} onPress={finish}>
            <Text style={styles.primaryBtnText}>Get started</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryBtn} onPress={goNext}>
            <Text style={styles.primaryBtnText}>Next</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 48,
    paddingBottom: 32,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#0f172a',
  },
  body: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    color: '#475569',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#4f46e5',
    width: 22,
  },
  footer: {
    paddingHorizontal: 24,
  },
  primaryBtn: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
