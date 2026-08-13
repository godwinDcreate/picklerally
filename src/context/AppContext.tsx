import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Player,
  PickleballGame,
  PickleballCourt,
  GameFilterState,
  GameComment,
  CommunityPost,
  ReclubClub
} from '../types';
import {
  MOCK_CURRENT_USER,
  MOCK_GAMES,
  MOCK_COURTS,
  MOCK_PLAYERS,
  MOCK_COMMUNITY_POSTS,
  MOCK_RECLUB_CLUBS
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: Player | null;
  isAuthenticated: boolean;
  games: PickleballGame[];
  courts: PickleballCourt[];
  players: Player[];
  reclubClubs: ReclubClub[];
  communityPosts: CommunityPost[];
  savedCourtIds: string[];
  joinedGameIds: string[];
  toasts: ToastMessage[];
  filters: GameFilterState;
  
  // Actions
  login: (email: string) => void;
  signup: (userData: Partial<Player>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<Player>) => void;
  
  joinGame: (gameId: string) => boolean;
  leaveGame: (gameId: string) => void;
  addGame: (newGame: Omit<PickleballGame, 'id' | 'createdAt' | 'currentPlayersCount' | 'participants' | 'comments'>) => PickleballGame;
  addGameComment: (gameId: string, text: string) => void;
  
  toggleSaveCourt: (courtId: string) => void;
  
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'author' | 'likesCount' | 'commentsCount' | 'createdAt'>) => void;
  toggleLikePost: (postId: string) => void;
  
  setFilters: React.Dispatch<React.SetStateAction<GameFilterState>>;
  resetFilters: () => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: GameFilterState = {
  searchQuery: '',
  location: 'San Juan, La Union',
  maxDistance: 15,
  dateFilter: 'all',
  timeOfDay: 'all',
  skillLevel: 'all',
  gameFormat: 'all',
  gameType: 'all',
  indoorOutdoor: 'all',
  onlyAvailableSpots: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initial mock data
  const [currentUser, setCurrentUser] = useState<Player | null>(() => {
    const saved = localStorage.getItem('picklerally_user');
    return saved ? JSON.parse(saved) : MOCK_CURRENT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('picklerally_auth') === 'true' || true; // Default logged in as Alex Rivera for smooth demo
  });

  const [games, setGames] = useState<PickleballGame[]>(() => {
    const saved = localStorage.getItem('picklerally_games');
    return saved ? JSON.parse(saved) : MOCK_GAMES;
  });

  const [courts] = useState<PickleballCourt[]>(MOCK_COURTS);
  const [players] = useState<Player[]>(MOCK_PLAYERS);
  const [reclubClubs] = useState<ReclubClub[]>(MOCK_RECLUB_CLUBS);
  
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('picklerally_posts');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITY_POSTS;
  });

  const [savedCourtIds, setSavedCourtIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('picklerally_saved_courts');
    return saved ? JSON.parse(saved) : ['court_sanjuan_beach', 'court_san_fernando_indoor'];
  });

  const [joinedGameIds, setJoinedGameIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('picklerally_joined_games');
    return saved ? JSON.parse(saved) : ['game_elyu_sunset_35', 'game_san_fernando_indoor_open'];
  });

  const [filters, setFilters] = useState<GameFilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('picklerally_user', JSON.stringify(currentUser));
    }
    localStorage.setItem('picklerally_auth', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('picklerally_games', JSON.stringify(games));
    localStorage.setItem('picklerally_posts', JSON.stringify(communityPosts));
    localStorage.setItem('picklerally_saved_courts', JSON.stringify(savedCourtIds));
    localStorage.setItem('picklerally_joined_games', JSON.stringify(joinedGameIds));
  }, [currentUser, isAuthenticated, games, communityPosts, savedCourtIds, joinedGameIds]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email: string) => {
    // Find player or default to Alex
    const found = players.find((p) => p.email.toLowerCase() === email.toLowerCase()) || MOCK_CURRENT_USER;
    setCurrentUser(found);
    setIsAuthenticated(true);
    showToast('Welcome back!', `Signed in as ${found.name}`);
  };

  const signup = (userData: Partial<Player>) => {
    const newUser: Player = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'Pickleball Player',
      email: userData.email || 'player@pickleball.io',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      location: userData.location || 'Austin, TX',
      duprRating: userData.duprRating || 3.5,
      skillLevel: userData.skillLevel || 'Intermediate (3.5)',
      preferredFormat: userData.preferredFormat || 'Doubles',
      gamesPlayed: 0,
      gamesHosted: 0,
      winRate: 50,
      favoritePaddle: userData.favoritePaddle || 'Franklin X-40',
      favoriteCourt: userData.favoriteCourt || 'Riverside Pickleball Center',
      bio: userData.bio || 'Passionate pickleball player looking for games!',
      availability: userData.availability || 'Weekends & Evenings',
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    showToast('Account Created!', `Welcome to PickleRally, ${newUser.name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Signed Out', 'You have been logged out.');
  };

  const updateProfile = (updatedData: Partial<Player>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    showToast('Profile Updated', 'Your pickleball profile changes have been saved.');
  };

  const joinGame = (gameId: string): boolean => {
    if (!currentUser) {
      showToast('Authentication Required', 'Please sign in to join games.', 'info');
      return false;
    }

    const game = games.find((g) => g.id === gameId);
    if (!game) return false;

    if (game.currentPlayersCount >= game.maxPlayers) {
      showToast('Game Full', 'This game has reached maximum player capacity.', 'error');
      return false;
    }

    if (joinedGameIds.includes(gameId)) {
      showToast('Already Joined', 'You are already registered for this game.', 'info');
      return true;
    }

    const updatedGames = games.map((g) => {
      if (g.id === gameId) {
        return {
          ...g,
          currentPlayersCount: g.currentPlayersCount + 1,
          participants: [
            ...g.participants,
            { player: currentUser, joinedAt: 'Just now', role: 'Confirmed' as const }
          ]
        };
      }
      return g;
    });

    setGames(updatedGames);
    setJoinedGameIds((prev) => [...prev, gameId]);
    showToast('You’re In! 🎉', `Successfully joined "${game.title}"`);
    return true;
  };

  const leaveGame = (gameId: string) => {
    if (!currentUser) return;
    const game = games.find((g) => g.id === gameId);
    if (!game) return;

    const updatedGames = games.map((g) => {
      if (g.id === gameId) {
        return {
          ...g,
          currentPlayersCount: Math.max(0, g.currentPlayersCount - 1),
          participants: g.participants.filter((p) => p.player.id !== currentUser.id)
        };
      }
      return g;
    });

    setGames(updatedGames);
    setJoinedGameIds((prev) => prev.filter((id) => id !== gameId));
    showToast('Game Left', `You have left "${game.title}".`);
  };

  const addGame = (
    newGameData: Omit<PickleballGame, 'id' | 'createdAt' | 'currentPlayersCount' | 'participants' | 'comments'>
  ): PickleballGame => {
    const host = currentUser || MOCK_CURRENT_USER;
    const gameId = `game_${Date.now()}`;
    const newGame: PickleballGame = {
      ...newGameData,
      id: gameId,
      currentPlayersCount: 1,
      participants: [{ player: host, joinedAt: 'Just now', role: 'Host' }],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    setGames((prev) => [newGame, ...prev]);
    setJoinedGameIds((prev) => [...prev, gameId]);
    
    // Update user stats
    if (currentUser) {
      setCurrentUser((prev) => prev ? { ...prev, gamesHosted: prev.gamesHosted + 1 } : null);
    }

    showToast('Game Created! 🏓', `"${newGame.title}" is live on the court schedule.`);
    return newGame;
  };

  const addGameComment = (gameId: string, text: string) => {
    if (!currentUser || !text.trim()) return;

    const comment: GameComment = {
      id: `cm_${Date.now()}`,
      playerId: currentUser.id,
      playerName: currentUser.name,
      playerAvatar: currentUser.avatar,
      playerRating: currentUser.duprRating,
      text: text.trim(),
      createdAt: 'Just now'
    };

    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, comments: [...g.comments, comment] } : g))
    );
    showToast('Comment Posted', 'Your message was added to the game discussion.');
  };

  const toggleSaveCourt = (courtId: string) => {
    setSavedCourtIds((prev) => {
      const exists = prev.includes(courtId);
      const court = courts.find((c) => c.id === courtId);
      if (exists) {
        showToast('Court Removed', `Removed ${court?.name || 'court'} from favorites.`);
        return prev.filter((id) => id !== courtId);
      } else {
        showToast('Court Favorited ❤️', `Added ${court?.name || 'court'} to your favorites!`);
        return [...prev, courtId];
      }
    });
  };

  const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'author' | 'likesCount' | 'commentsCount' | 'createdAt'>) => {
    if (!currentUser) return;
    const newPost: CommunityPost = {
      ...post,
      id: `post_${Date.now()}`,
      author: currentUser,
      likesCount: 0,
      commentsCount: 0,
      createdAt: 'Just now',
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    showToast('Post Published 📢', 'Your pickleball post is live in the community hub!');
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
          };
        }
        return p;
      })
    );
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        games,
        courts,
        players,
        reclubClubs,
        communityPosts,
        savedCourtIds,
        joinedGameIds,
        toasts,
        filters,
        login,
        signup,
        logout,
        updateProfile,
        joinGame,
        leaveGame,
        addGame,
        addGameComment,
        toggleSaveCourt,
        addCommunityPost,
        toggleLikePost,
        setFilters,
        resetFilters,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
