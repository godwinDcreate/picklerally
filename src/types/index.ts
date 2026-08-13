export type SkillLevel = 'Beginner (2.0-2.5)' | 'Advanced Beginner (3.0)' | 'Intermediate (3.5)' | 'Advanced (4.0-4.5)' | 'Competitive (5.0+)';

export type GameFormat = 'Singles' | 'Doubles' | 'Open Play' | 'King of the Court';

export type GameType = 'Casual' | 'Competitive' | 'Beginner Friendly' | 'Open Play' | 'Round Robin';

export type CourtType = 'Indoor' | 'Outdoor' | 'Covered';

export type SurfaceType = 'Cushioned Acrylic' | 'Hard Court Concrete' | 'Asphalt' | 'Wood Indoor';

export interface Player {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  distance?: string;
  duprRating: number;
  skillLevel: SkillLevel;
  preferredFormat: GameFormat;
  gamesPlayed: number;
  gamesHosted: number;
  winRate: number;
  favoritePaddle: string;
  favoriteCourt: string;
  bio: string;
  availability: string;
  playStyle?: string;
  sidePreference?: 'Left' | 'Right' | 'Both';
  badge?: string;
  isOnline?: boolean;
}

export interface ReclubClub {
  id: string;
  name: string;
  reclubUrl: string;
  reclubId: string;
  location: string;
  city: string;
  province: string;
  memberCount: number;
  logo: string;
  description: string;
  verifiedSource: 'Reclub Official';
  activeSessions: number;
  featuredCourts: string[];
}

export interface PickleballCourt {
  id: string;
  name: string;
  image: string;
  images?: string[];
  address: string;
  city: string;
  state: string;
  zip: string;
  distance: string;
  lat: number;
  lng: number;
  totalCourts: number;
  indoorOutdoor: CourtType;
  surfaceType: SurfaceType;
  hasLights: boolean;
  isPublic: boolean;
  reservationRequired: boolean;
  fee: string; // e.g., 'Free', '₱150/hr'
  rating: number;
  reviewCount: number;
  amenities: string[];
  openHours: string;
  description: string;
  reclubUrl?: string;
  reclubClubName?: string;
  reclubVerified?: boolean;
}

export interface GameParticipant {
  player: Player;
  joinedAt: string;
  role: 'Host' | 'Confirmed' | 'Waitlist';
}

export interface GameComment {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  playerRating: number;
  text: string;
  createdAt: string;
}

export interface PickleballGame {
  id: string;
  title: string;
  courtId: string;
  courtName: string;
  courtAddress: string;
  courtImage: string;
  indoorOutdoor: CourtType;
  date: string; // YYYY-MM-DD or display formatted
  displayDate: string;
  startTime: string;
  endTime: string;
  distance: string;
  skillLevel: SkillLevel;
  minSkillRating?: number;
  maxSkillRating?: number;
  gameFormat: GameFormat;
  gameType: GameType;
  maxPlayers: number;
  currentPlayersCount: number;
  host: Player;
  participants: GameParticipant[];
  description: string;
  houseRules: string[];
  ballType: string;
  isPrivate: boolean;
  cost: string;
  comments: GameComment[];
  createdAt: string;
  reclubSyncUrl?: string;
  reclubClubName?: string;
  isReclubVerified?: boolean;
}

export interface CommunityPost {
  id: string;
  author: Player;
  title: string;
  content: string;
  category: 'Partner Search' | 'Gear Discussion' | 'Court Update' | 'Strategy & Tips' | 'General';
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  createdAt: string;
  tags: string[];
}

export interface LocalEvent {
  id: string;
  title: string;
  organizer: string;
  courtName: string;
  date: string;
  time: string;
  format: string;
  entryFee: string;
  skillLevels: string;
  image: string;
  attendeesCount: number;
  maxAttendees: number;
}

export interface GameFilterState {
  searchQuery: string;
  location: string;
  maxDistance: number;
  dateFilter: 'all' | 'today' | 'tomorrow' | 'weekend' | 'this-week';
  timeOfDay: 'all' | 'morning' | 'afternoon' | 'evening';
  skillLevel: string;
  gameFormat: string;
  gameType: string;
  indoorOutdoor: string;
  onlyAvailableSpots: boolean;
}

export interface UserAuth {
  isAuthenticated: boolean;
  user: Player | null;
}
