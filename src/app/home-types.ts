export type HomeUser = {
  id: string;
  name: string;
  image: string | null;
  email?: string;
};

export type HomeMessage = {
  id: string;
  content: string;
  createdAt: string;
  pinned: boolean;
  channelId: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

export type HomeChannel = {
  id: string;
  name: string;
  type: "TEXT" | "VOICE";
  createdAt: string;
  serverId: string;
  messages: HomeMessage[];
};

export type HomeServer = {
  id: string;
  name: string;
  picture: string | null;
  createdAt: string;
  membershipId: string | null;
  roleNames: string[];
  channels: HomeChannel[];
};

export type HomePageData = {
  currentUser: HomeUser;
  servers: HomeServer[];
};
