export interface UserInfo {
  id: string;
  name: string | null;
  avatar: string | null;
}

export interface CommentType {
  id: string;
  content: string;
  userId: string;
  parentId: string | null;
  postId?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  user: UserInfo;
  replies?: CommentType[];
}
