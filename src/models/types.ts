
export type PostStatus = 'pending' | 'approved' | 'rejected';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  categoryId: string;
  categoryName: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  status: PostStatus;
  views: number;
  likes: number;
  comments: Comment[];
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Remedy {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  categoryId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isExpertVerified: boolean;
  createdAt: string;
  likes: number;
  approvalStatus: ApprovalStatus;
}
