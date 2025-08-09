import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, Mail, UserPlus, CreditCard as Edit3 } from 'lucide-react-native';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'swimmer' | 'coach';
  joinDate: string;
  totalTimes: number;
  bestTime: string;
}

export default function TeamScreen() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'swimmer',
      joinDate: '2025-01-10',
      totalTimes: 15,
      bestTime: '1:02.45',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'swimmer',
      joinDate: '2025-01-12',
      totalTimes: 12,
      bestTime: '2:25.12',
    },
    {
      id: '3',
      name: 'Coach Mike',
      email: 'mike@example.com',
      role: 'coach',
      joinDate: '2025-01-08',
      totalTimes: 0,
      bestTime: '--',
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleInvite = () => {
    if (!inviteEmail) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    Alert.alert('Success', `Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleCreateTeam = () => {
    if (!teamName) {
      Alert.alert('Error', 'Please enter a team name');
      return;
    }
    Alert.alert('Success', `Team "${teamName}" created successfully`);
    setTeamName('');
    setShowCreateTeamModal(false);
  };

  const swimmers = teamMembers.filter(member => member.role === 'swimmer');
  const coaches = teamMembers.filter(member => member.role === 'coach');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Team Management</Text>
          <Text style={styles.subtitle}>Manage your swimming team</Text>
        </View>

        {/* Team Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users size={24} color="#0066CC" />
            <Text style={styles.statNumber}>{swimmers.length}</Text>
            <Text style={styles.statLabel}>Swimmers</Text>
          </View>
          <View style={styles.statCard}>
            <UserPlus size={24} color="#0066CC" />
            <Text style={styles.statNumber}>{coaches.length}</Text>
            <Text style={styles.statLabel}>Coaches</Text>
          </View>
          <View style={styles.statCard}>
            <Edit3 size={24} color="#00B4A6" />
            <Text style={styles.statNumber}>27</Text>
            <Text style={styles.statLabel}>Total Times</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowInviteModal(true)}
          >
            <Mail size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Invite Member</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowCreateTeamModal(true)}
          >
            <Plus size={20} color="#0066CC" />
            <Text style={styles.secondaryButtonText}>Create Team</Text>
          </TouchableOpacity>
        </View>

        {/* Coaches Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coaches</Text>
          {coaches.map((coach) => (
            <View key={coach.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{coach.name}</Text>
                <Text style={styles.memberEmail}>{coach.email}</Text>
                <Text style={styles.memberJoinDate}>
                  Joined: {coach.joinDate}
                </Text>
              </View>
              <View style={styles.memberActions}>
                <View style={styles.coachBadge}>
                  <Text style={styles.coachBadgeText}>Coach</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Swimmers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Swimmers</Text>
          {swimmers.map((swimmer) => (
            <View key={swimmer.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{swimmer.name}</Text>
                <Text style={styles.memberEmail}>{swimmer.email}</Text>
                <Text style={styles.memberStats}>
                  {swimmer.totalTimes} times • Best: {swimmer.bestTime}
                </Text>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.editButton}>
                  <Edit3 size={16} color="#0066CC" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Team Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Join Code</Text>
          <View style={styles.teamCodeCard}>
            <Text style={styles.teamCodeTitle}>Share this code with swimmers:</Text>
            <View style={styles.teamCodeContainer}>
              <Text style={styles.teamCode}>SWIM2025</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.teamCodeDescription}>
              Swimmers can use this code to join your team
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Invite Modal */}
      <Modal
        visible={showInviteModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowInviteModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Invite Team Member</Text>
            <TouchableOpacity onPress={handleInvite}>
              <Text style={styles.modalSave}>Send</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={inviteEmail}
                onChangeText={setInviteEmail}
                placeholder="swimmer@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Role</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity style={styles.roleButton}>
                  <Text style={styles.roleButtonText}>Swimmer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roleButton, styles.roleButtonInactive]}>
                  <Text style={[styles.roleButtonText, styles.roleButtonTextInactive]}>Coach</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inviteInfo}>
              <Text style={styles.inviteInfoText}>
                An email invitation will be sent with instructions to join your team.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Create Team Modal */}
      <Modal
        visible={showCreateTeamModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreateTeamModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create New Team</Text>
            <TouchableOpacity onPress={handleCreateTeam}>
              <Text style={styles.modalSave}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Team Name</Text>
              <TextInput
                style={styles.textInput}
                value={teamName}
                onChangeText={setTeamName}
                placeholder="Enter team name"
              />
            </View>

            <View style={styles.teamInfo}>
              <Text style={styles.teamInfoText}>
                You'll be automatically assigned as the team coach and can invite swimmers to join.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#0066CC',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  memberJoinDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  memberStats: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  memberActions: {
    alignItems: 'center',
  },
  coachBadge: {
    backgroundColor: '#00B4A6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  coachBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  teamCodeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  teamCodeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  teamCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  teamCode: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0066CC',
    textAlign: 'center',
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: '#0066CC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  teamCodeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  modalCancel: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalSave: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  roleButtonInactive: {
    backgroundColor: '#F3F4F6',
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  roleButtonTextInactive: {
    color: '#6B7280',
  },
  inviteInfo: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  inviteInfoText: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
  },
  teamInfo: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  teamInfoText: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
  },
});