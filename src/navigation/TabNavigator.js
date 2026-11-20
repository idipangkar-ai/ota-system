import React, {useState} from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCurrentUser} from '../domains/feed/api/feedApi';
import {logout} from '../domains/auth/api/authApi';
import {useAuth} from './AuthProvider';

const TABS = [
  {key: 'Home', mark: '⌂'},
  {key: 'Categories', mark: '▦'},
  {key: 'Cart', mark: '□'},
  {key: 'Orders', mark: '↻'},
  {key: 'Account', mark: '○'},
];

export default function TabNavigator({onSignOut}) {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState('Home');
  const [stacks, setStacks] = useState(() => Object.fromEntries(TABS.map(tab => [tab.key, [tab.key]])));
  const currentStack = stacks[activeTab];
  const currentScreen = currentStack[currentStack.length - 1];
  const push = route => setStacks(previous => ({...previous, [activeTab]: [...previous[activeTab], route]}));
  const back = () => setStacks(previous => ({...previous, [activeTab]: previous[activeTab].slice(0, -1)}));
  const handleLogout = () => Alert.alert('Sign out', 'Are you sure you want to sign out?', [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Sign out', style: 'destructive', onPress: async () => {
      try { await logout(); } catch (error) { /* Local credentials are cleared by logout. */ }
      onSignOut();
    }},
  ]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        {currentStack.length > 1 ? <TouchableOpacity onPress={back} style={styles.back}><Text style={styles.backText}>‹</Text></TouchableOpacity> : null}
        <View style={styles.fill}>
          <Text style={styles.brand}>NORTHSTAR <Text style={styles.brandSoft}>COMMERCE</Text></Text>
          {currentStack.length > 1 ? <Text style={styles.headerTitle}>{currentScreen}</Text> : null}
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>{(user || 'C').slice(0, 1).toUpperCase()}</Text></View>
      </View>
      <ScrollView contentContainerStyle={styles.content} key={`${activeTab}-${currentScreen}`}>
        <ScreenContent tab={activeTab} screen={currentScreen} user={user} push={push} selectTab={setActiveTab} onLogout={handleLogout} />
      </ScrollView>
      <View style={styles.tabBar}>
        {TABS.map(tab => {
          const selected = activeTab === tab.key;
          return <TouchableOpacity key={tab.key} onPress={() => setActiveTab(tab.key)} style={styles.tab} accessibilityRole="button" accessibilityState={{selected}}>
            <Text style={[styles.tabMark, selected && styles.selectedMark]}>{tab.mark}</Text>
            <Text style={[styles.tabLabel, selected && styles.selectedLabel]}>{tab.key}</Text>
          </TouchableOpacity>;
        })}
      </View>
    </SafeAreaView>
  );
}

function ScreenContent({tab, screen, user, push, selectTab, onLogout}) {
  if (tab === 'Home' && screen === 'Home') return <HomeContent user={user} selectTab={selectTab} push={push} />;
  if (tab === 'Account' && screen === 'Account') return <AccountContent user={user} onLogout={onLogout} />;
  if (screen !== tab) return <DetailContent title={screen} />;

  const descriptions = {
    Categories: ['Explore by category', 'Browse our collection when products are connected to your Frappe catalog.'],
    Cart: ['Your cart is ready', 'Items you add will be collected here.'],
    Orders: ['Your orders', 'Track purchases and review order history from your account.'],
  };
  const [title, description] = descriptions[tab] || ['Your account', 'Manage your customer account.'];
  return <View style={styles.emptyCard}>
    <View style={styles.emptyMark}><Text style={styles.emptyMarkText}>{tab.slice(0, 1)}</Text></View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardBody}>{description}</Text>
    {tab === 'Categories' ? <Action label="Browse collection" onPress={() => push('Collection overview')} /> : null}
    {tab === 'Cart' ? <Action label="Explore categories" onPress={() => selectTab('Categories')} /> : null}
    {tab === 'Orders' ? <Action label="View account" onPress={() => selectTab('Account')} /> : null}
  </View>;
}

function HomeContent({user, selectTab, push}) {
  const [connection, setConnection] = React.useState('checking');
  React.useEffect(() => {
    let active = true;
    getCurrentUser().then(name => { if (active) setConnection(name === 'Guest' ? 'expired' : 'connected'); })
      .catch(() => { if (active) setConnection('unavailable'); });
    return () => { active = false; };
  }, []);
  return <>
    <View style={styles.hero}>
      <Text style={styles.kicker}>YOUR NORTHSTAR ACCOUNT</Text>
      <Text style={styles.heroTitle}>Good to see you, {friendlyName(user)}.</Text>
      <Text style={styles.heroBody}>A considered collection and a more personal way to shop.</Text>
      <Action label="Explore categories" onPress={() => selectTab('Categories')} light />
    </View>
    <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Your shopping</Text><Text style={styles.sectionCaption}>ACCOUNT OVERVIEW</Text></View>
    <View style={styles.shortcuts}>
      <Shortcut title="Orders" detail="Purchases and delivery" onPress={() => selectTab('Orders')} />
      <Shortcut title="Your account" detail="Profile and preferences" onPress={() => selectTab('Account')} />
      <Shortcut title="Collection" detail="Browse categories" onPress={() => selectTab('Categories')} />
    </View>
    <TouchableOpacity style={styles.connection} onPress={() => push('Connection details')}>
      <View style={[styles.statusDot, connection === 'connected' ? styles.online : connection === 'checking' ? styles.waiting : styles.offline]} />
      <View style={styles.fill}><Text style={styles.connectionTitle}>Frappe account</Text><Text style={styles.connectionBody}>{connectionLabel(connection)}</Text></View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  </>;
}

function AccountContent({user, onLogout}) {
  return <>
    <Text style={styles.pageTitle}>Account</Text>
    <View style={styles.profileCard}>
      <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>{(user || 'C').slice(0, 1).toUpperCase()}</Text></View>
      <View style={styles.fill}><Text style={styles.cardTitle}>{user || 'Customer'}</Text><Text style={styles.cardBody}>Signed in with your Frappe account</Text></View>
    </View>
    {['Personal details', 'Delivery addresses', 'Communication preferences', 'Help and support'].map((item, index) => <TouchableOpacity key={item} onPress={() => Alert.alert(item, 'This account area will be connected as the shopping features are added.')} style={styles.menuRow}><Text style={styles.menuNumber}>0{index + 1}</Text><Text style={styles.menuLabel}>{item}</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>)}
    <TouchableOpacity style={styles.logout} onPress={onLogout}><Text style={styles.logoutText}>Sign out</Text></TouchableOpacity>
  </>;
}

function DetailContent({title}) {
  return <View style={styles.emptyCard}><View style={styles.emptyMark}><Text style={styles.emptyMarkText}>N</Text></View><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardBody}>This area is ready to connect to your Frappe catalog and customer workflows.</Text></View>;
}

function Shortcut({title, detail, onPress}) {
  return <TouchableOpacity style={styles.shortcut} onPress={onPress}><Text style={styles.shortcutTitle}>{title}</Text><Text style={styles.shortcutDetail}>{detail}</Text><Text style={styles.shortcutArrow}>↗</Text></TouchableOpacity>;
}

function Action({label, onPress, light}) {
  return <TouchableOpacity onPress={onPress} style={[styles.action, light && styles.lightAction]}><Text style={[styles.actionText, light && styles.lightActionText]}>{label}</Text><Text style={[styles.actionArrow, light && styles.lightActionText]}>›</Text></TouchableOpacity>;
}

function friendlyName(user) {
  if (!user) return 'there';
  const name = user.includes('@') ? user.split('@')[0] : user;
  return name.replace(/[._-]+/g, ' ').split(' ').map(part => part ? part[0].toUpperCase() + part.slice(1) : '').join(' ');
}

function connectionLabel(state) {
  if (state === 'connected') return 'Session active and validated';
  if (state === 'checking') return 'Checking your secure session';
  if (state === 'expired') return 'Please sign in again';
  return 'Unable to reach your Frappe server';
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F4F6F9'},
  fill: {flex: 1},
  header: {minHeight: 66, paddingHorizontal: 22, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E8EBF0'},
  brand: {fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: '#1C2B45'}, brandSoft: {fontWeight: '500', color: '#8792A2', letterSpacing: 1},
  back: {width: 35, marginRight: 8}, backText: {fontSize: 34, color: '#2458A6', lineHeight: 38}, headerTitle: {fontSize: 13, fontWeight: '600', color: '#6A7588', marginTop: 4},
  avatar: {width: 36, height: 36, borderRadius: 18, backgroundColor: '#E8EEF7', alignItems: 'center', justifyContent: 'center'}, avatarText: {color: '#2458A6', fontWeight: '800', fontSize: 14},
  content: {padding: 22, paddingBottom: 34, gap: 18},
  hero: {padding: 23, borderRadius: 16, backgroundColor: '#1D3557'}, kicker: {fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: '#B8CAE2'}, heroTitle: {fontSize: 26, lineHeight: 33, fontWeight: '700', color: '#FFFFFF', marginTop: 17}, heroBody: {fontSize: 14, lineHeight: 21, color: '#D4DFED', marginTop: 8, maxWidth: 320},
  action: {marginTop: 20, minHeight: 46, paddingHorizontal: 15, borderRadius: 9, backgroundColor: '#2458A6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, actionText: {color: '#FFFFFF', fontSize: 14, fontWeight: '700'}, actionArrow: {fontSize: 23, color: '#FFFFFF'}, lightAction: {backgroundColor: '#FFFFFF', alignSelf: 'flex-start', minWidth: 200}, lightActionText: {color: '#2458A6'},
  sectionHead: {marginTop: 5}, sectionTitle: {fontSize: 19, fontWeight: '700', color: '#1C2B45'}, sectionCaption: {fontSize: 10, color: '#8A95A4', fontWeight: '700', letterSpacing: 1.1, marginTop: 5},
  shortcuts: {gap: 10}, shortcut: {position: 'relative', padding: 17, paddingRight: 45, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8EBF0'}, shortcutTitle: {fontSize: 15, fontWeight: '700', color: '#1C2B45'}, shortcutDetail: {fontSize: 12, color: '#788497', marginTop: 5}, shortcutArrow: {position: 'absolute', right: 18, top: 18, color: '#2458A6', fontSize: 18},
  connection: {minHeight: 68, paddingHorizontal: 15, borderRadius: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#E8EBF0'}, statusDot: {width: 9, height: 9, borderRadius: 5}, online: {backgroundColor: '#278268'}, waiting: {backgroundColor: '#D49A42'}, offline: {backgroundColor: '#BB5B5B'}, connectionTitle: {fontSize: 13, fontWeight: '700', color: '#25334A'}, connectionBody: {fontSize: 11, color: '#7D8898', marginTop: 4}, chevron: {fontSize: 24, color: '#9BA5B2'},
  pageTitle: {fontSize: 27, fontWeight: '700', color: '#1C2B45', marginBottom: 4}, profileCard: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 17, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E8EBF0', marginBottom: 5}, profileAvatar: {height: 48, width: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8EEF7'}, profileAvatarText: {fontSize: 19, fontWeight: '800', color: '#2458A6'},
  menuRow: {minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EDF0F3'}, menuNumber: {fontSize: 10, color: '#9AA4B2', fontWeight: '700', width: 34}, menuLabel: {fontSize: 13, fontWeight: '600', color: '#334157', flex: 1}, logout: {marginTop: 14, height: 50, borderRadius: 10, borderWidth: 1, borderColor: '#D7DEE8', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'}, logoutText: {fontSize: 14, fontWeight: '700', color: '#A44646'},
  emptyCard: {backgroundColor: '#FFFFFF', borderRadius: 15, padding: 22, marginTop: 10, borderWidth: 1, borderColor: '#E8EBF0'}, emptyMark: {width: 42, height: 42, borderRadius: 12, backgroundColor: '#E8EEF7', alignItems: 'center', justifyContent: 'center', marginBottom: 18}, emptyMarkText: {fontSize: 17, fontWeight: '800', color: '#2458A6'}, cardTitle: {fontSize: 18, fontWeight: '700', color: '#1C2B45'}, cardBody: {fontSize: 13, lineHeight: 20, color: '#748094', marginTop: 7},
  tabBar: {minHeight: 64, backgroundColor: '#FFFFFF', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E8EBF0', paddingBottom: 3}, tab: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2}, tabMark: {fontSize: 20, lineHeight: 24, color: '#9AA4B2'}, selectedMark: {color: '#2458A6'}, tabLabel: {fontSize: 9, color: '#8792A2', fontWeight: '600'}, selectedLabel: {color: '#2458A6', fontWeight: '800'},
});
