export interface WidgetProps {
  pageID: string;
}

export interface FacebookFeedResponse {
  data: Daum[];
  paging: Paging;
}

export interface Daum {
  message: string;
  id: string;
  full_picture: string;
  created_time: string;
  from: From;
  reactions: Reactions;
  permalink_url: string;
  attachments: Attachments;
  comments_count: CommentsCount;
  reactions_like: ReactionsLike;
  reactions_love: ReactionsLove;
  reactions_wow: ReactionsWow;
  reactions_haha: ReactionsHaha;
  reactions_sad: ReactionsSad;
  reactions_angry: ReactionsAngry;
  reactions_thankful: ReactionsThankful;
}

export interface From {
  name: string;
  id: string;
}

export interface Reactions {
  data: never[];
  summary: Summary;
}

export interface Summary {
  total_count: number;
  viewer_reaction: string;
}

export interface Attachments {
  data: Daum2[];
}

export interface Daum2 {
  media: Media;
  target: Target;
  title: string;
  description: string;
  media_type: string;
  type: string;
  unshimmed_url: string;
  url: string;
}

export interface Media {
  image: Image;
}

export interface Image {
  height: number;
  src: string;
  width: number;
}

export interface Target {
  id: string;
  url: string;
}

export interface CommentsCount {
  data: never[];
  summary: Summary2;
}

export interface Summary2 {
  order: string;
  total_count: number;
  can_comment: boolean;
}

export interface ReactionsLike {
  data: never[];
  summary: Summary3;
}

export interface Summary3 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsLove {
  data: never[];
  summary: Summary4;
}

export interface Summary4 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsWow {
  data: never[];
  summary: Summary5;
}

export interface Summary5 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsHaha {
  data: never[];
  summary: Summary6;
}

export interface Summary6 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsSad {
  data: never[];
  summary: Summary7;
}

export interface Summary7 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsAngry {
  data: never[];
  summary: Summary8;
}

export interface Summary8 {
  total_count: number;
  viewer_reaction: string;
}

export interface ReactionsThankful {
  data: never[];
  summary: Summary9;
}

export interface Summary9 {
  total_count: number;
  viewer_reaction: string;
}

export interface Paging {
  cursors: Cursors;
  next: string;
}

export interface Cursors {
  before: string;
  after: string;
}
