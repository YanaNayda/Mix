import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import React from 'react';

// --- Mock data ---
const MOCK_USER = {
  name: 'Alex Rivera',
  avatarUri: null,
  level: 5,
  rankLabel: 'Beginner Mixologist',
  xpCurrent: 120,
  xpNextLevel: 200,
};

const MOCK_UNLOCKED_ACHIEVEMENTS = [
  { id: '1', title: 'First Pour', description: 'Mixed your first drink in MixIt.' },
  { id: '2', title: 'Night Owl', description: 'Opened the app after 10 PM.' },
  { id: '3', title: 'Collector', description: 'Saved 5 recipes to your library.' },
];

const MOCK_LOCKED_ACHIEVEMENTS = [
  {
    id: 'l1',
    title: 'Shake Master',
    description: 'Perfect 10 shaken cocktails.',
    unlockHint: 'Complete 3 cocktails to unlock',
  },
  {
    id: 'l2',
    title: 'Bar Regular',
    description: 'Visit My Bar 7 days in a row.',
    unlockHint: 'Log in 7 days in a row',
  },
];

const MOCK_LANGUAGE = 'English';

// --- Reusable pieces ---

function AchievementItem({ title, description, locked, unlockHint }) {
  return (
    <View style={[styles.badgeCard, locked && styles.badgeCardLocked]}>
      <View style={[styles.badgeIcon, locked && styles.badgeIconLocked]} />
      <View style={styles.badgeTextWrap}>
        <Text style={[styles.badgeTitle, locked && styles.badgeTextMuted]}>{title}</Text>
        <Text style={[styles.badgeDescription, locked && styles.badgeTextMuted]}>{description}</Text>
        {locked && unlockHint ? (
          <Text style={styles.badgeUnlockHint}>{unlockHint}</Text>
        ) : null}
      </View>
    </View>
  );
}

function SettingsItem({ label, value, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.settingsRow, disabled && styles.settingsRowDisabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      {value ? <Text style={styles.settingsValue}>{value}</Text> : null}
      <Text style={styles.settingsChevron}>›</Text>
    </TouchableOpacity>
  );
}

// --- Screen ---

export default function ProfileScreen() {
  const [notificationsOn, setNotificationsOn] = React.useState(true);

  const xpRatio = Math.min(MOCK_USER.xpCurrent / MOCK_USER.xpNextLevel, 1);
  const xpBarWidthPct = `${Math.round(xpRatio * 100)}%`;

  const goEditProfile = () => {
    console.log('Navigate to Edit Profile');
  };

  const goLanguage = () => {
    console.log('Navigate to Language settings');
  };

  const goHelp = () => {
    console.log('Go to Help');
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* SECTION 1: User information */}
      <View style={styles.card}>
        <View style={styles.avatarRow}>
          {MOCK_USER.avatarUri ? (
            <Image source={{ uri: MOCK_USER.avatarUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
          <View style={styles.avatarMeta}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.levelRank}>
              Level {MOCK_USER.level} — {MOCK_USER.rankLabel}
            </Text>
          </View>
        </View>

        <Text style={styles.xpLabel}>
          {MOCK_USER.xpCurrent} / {MOCK_USER.xpNextLevel} XP
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: xpBarWidthPct }]} />
        </View>

        <TouchableOpacity style={styles.editButton} onPress={goEditProfile} activeOpacity={0.8}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION 2: Achievements — unlocked */}
      <Text style={styles.sectionHeading}>Achievements</Text>
      <Text style={styles.sectionSubheading}>Unlocked</Text>
      <View>
        {MOCK_UNLOCKED_ACHIEVEMENTS.map((a) => (
          <AchievementItem key={a.id} title={a.title} description={a.description} locked={false} />
        ))}
      </View>

      <Text style={styles.sectionSubheading}>Locked</Text>
      <View>
        {MOCK_LOCKED_ACHIEVEMENTS.map((a) => (
          <AchievementItem
            key={a.id}
            title={a.title}
            description={a.description}
            locked
            unlockHint={a.unlockHint}
          />
        ))}
      </View>

      {/* SECTION 3: Settings */}
      <Text style={styles.sectionHeading}>Settings</Text>
      <View style={styles.card}>
        <SettingsItem label="Language" value={MOCK_LANGUAGE} onPress={goLanguage} />

        <View style={styles.divider} />

        <View style={styles.settingsRowStatic}>
          <Text style={styles.settingsLabel}>Notifications</Text>
          <Switch
            value={notificationsOn}
            onValueChange={setNotificationsOn}
            trackColor={{ false: '#cbd5e1', true: '#a5b4fc' }}
            thumbColor={notificationsOn ? '#4f46e5' : '#f1f5f9'}
          />
        </View>

        <View style={styles.divider} />

        <SettingsItem label="Help / Contact Support" onPress={goHelp} />
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#cbd5e1',
  },
  avatarMeta: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  levelRank: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#4f46e5',
  },
  editButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionSubheading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 10,
    marginTop: 4,
  },
  badgeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  badgeCardLocked: {
    opacity: 0.55,
    backgroundColor: '#f8fafc',
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#c7d2fe',
    marginRight: 12,
  },
  badgeIconLocked: {
    backgroundColor: '#94a3b8',
  },
  badgeTextWrap: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  badgeTextMuted: {
    color: '#64748b',
  },
  badgeUnlockHint: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
    marginTop: 6,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingsRowDisabled: {
    opacity: 0.5,
  },
  settingsRowStatic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingsLabel: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
    flex: 1,
  },
  settingsValue: {
    fontSize: 15,
    color: '#64748b',
    marginRight: 6,
  },
  settingsChevron: {
    fontSize: 22,
    color: '#cbd5e1',
    fontWeight: '300',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e2e8f0',
  },
  bottomSpacer: {
    height: 16,
  },
});
