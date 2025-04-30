import { Category, Post, Tag, Comment, Remedy, PostStatus, ApprovalStatus } from '@/models/types';

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Digestive Health',
    slug: 'digestive-health',
    description: 'Remedies and advice for improving digestion and gut health',
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    name: 'Respiratory',
    slug: 'respiratory',
    description: 'Natural solutions for respiratory issues including cough, cold and allergies',
    imageUrl: 'https://images.unsplash.com/photo-1584636778269-c28dd94f96e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    name: 'Skin Care',
    slug: 'skin-care',
    description: 'Traditional Ayurvedic approaches to healthy, glowing skin',
    imageUrl: 'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '4',
    name: 'Mental Wellness',
    slug: 'mental-wellness',
    description: 'Ayurvedic practices for stress reduction, relaxation and mental clarity',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '5',
    name: 'Joint & Pain',
    slug: 'joint-pain',
    description: 'Natural remedies for joint pain, arthritis and inflammation',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  }
];

// Mock data for tags
const mockTags: Tag[] = [
  { id: '1', name: 'Herbs', slug: 'herbs' },
  { id: '2', name: 'Home Remedies', slug: 'home-remedies' },
  { id: '3', name: 'Prevention', slug: 'prevention' },
  { id: '4', name: 'Immunity', slug: 'immunity' },
  { id: '5', name: 'Natural', slug: 'natural' },
  { id: '6', name: 'Meditation', slug: 'meditation' },
  { id: '7', name: 'Breathing', slug: 'breathing' },
  { id: '8', name: 'Vegan', slug: 'vegan' },
  { id: '9', name: 'Traditional', slug: 'traditional' }
];

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Turmeric Golden Milk for Immunity',
    slug: 'turmeric-golden-milk-for-immunity',
    excerpt: 'Learn how to prepare this traditional immunity-boosting beverage with the goodness of turmeric and other spices.',
    content: `
# Turmeric Golden Milk for Immunity

Golden milk, also known as "haldi doodh" in Ayurveda, is a traditional Indian drink that has been gaining popularity worldwide due to its numerous health benefits.

## Ingredients

- 1 cup milk (dairy or plant-based)
- 1/2 teaspoon turmeric powder
- 1/4 teaspoon cinnamon powder
- 1 small piece ginger, grated
- 1 pinch black pepper
- 1-2 teaspoons honey or maple syrup (optional)

## Preparation Method

1. In a small saucepan, heat the milk on low heat.
2. Add turmeric, cinnamon, ginger, and black pepper.
3. Whisk well to combine and prevent clumping.
4. Heat until the milk is warm but not boiling, about 3-5 minutes.
5. Turn off the heat and strain if desired.
6. Add honey or maple syrup to taste.
7. Enjoy warm!

## Benefits

Turmeric contains curcumin, which has powerful anti-inflammatory and antioxidant properties. The black pepper enhances the absorption of curcumin. This golden milk can help boost immunity, reduce inflammation, and promote better sleep.

According to Ayurvedic wisdom, this drink is particularly beneficial during seasonal changes when immunity tends to be lower.
`,
    featuredImage: 'https://tse2.mm.bing.net/th?id=OIP.-Urs1ppJ2vR1yhCh5Fd-VAHaE7&pid=Api&P=0&h=180',
    authorId: '2',
    authorName: 'Ayurveda Lover',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayurveda',
    categoryId: '1',
    categoryName: 'Digestive Health',
    tags: [
      { id: '4', name: 'Immunity', slug: 'immunity' },
      { id: '5', name: 'Natural', slug: 'natural' }
    ],
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
    status: 'approved',
    views: 234,
    likes: 42,
    comments: [
      {
        id: '101',
        postId: '1',
        userId: '3',
        username: 'health_enthusiast',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=health',
        content: 'I tried this recipe and it worked wonders for my seasonal allergies! Thank you for sharing.',
        createdAt: new Date(2023, 5, 17).toISOString()
      },
      {
        id: '102',
        postId: '1',
        userId: '4',
        username: 'wellness_journey',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wellness',
        content: 'Can I use coconut milk instead of dairy milk in this recipe?',
        createdAt: new Date(2023, 5, 18).toISOString()
      }
    ]
  },
  {
    id: '2',
    title: 'Ayurvedic Morning Routine for Better Digestion',
    slug: 'ayurvedic-morning-routine-for-better-digestion',
    excerpt: 'Discover the traditional Ayurvedic morning practices that can improve your digestive health throughout the day.',
    content: `
# Ayurvedic Morning Routine for Better Digestion

In Ayurveda, digestion is considered the cornerstone of good health. Starting your day with the right practices can set the tone for optimal digestion throughout the day.

## 1. Wake Up Before Sunrise

Ayurveda recommends waking up during "Brahma Muhurta," approximately 1.5 hours before sunrise. This time is considered sattvic (pure) and ideal for setting a peaceful tone for the day.

## 2. Scrape Your Tongue

Use a tongue scraper made of copper, silver, or stainless steel to gently remove the white coating (ama) that accumulates overnight. This coating contains toxins that the body has worked to expel during sleep.

## 3. Drink Warm Water

Consume a glass of warm water, optionally with a squeeze of lemon. This simple practice:
- Stimulates the digestive tract
- Flushes out toxins
- Hydrates after the night's fast
- Encourages regular bowel movements

## 4. Practice Oil Pulling

Swish 1 tablespoon of cold-pressed sesame or coconut oil in your mouth for 5-15 minutes, then spit it out and rinse with warm water. This ancient practice promotes oral health and draws out toxins.

## 5. Abhyanga (Self-Massage)

Take 5-10 minutes to massage your body with warm sesame oil (or an oil appropriate for your dosha). Pay special attention to the abdomen, massaging in clockwise circles to stimulate digestion.

## 6. Light Exercise

Engage in gentle movement like yoga, walking, or stretching for 15-30 minutes. Focus on poses that stimulate digestion, like twists and forward bends.

## 7. Eat a Nourishing Breakfast

Consume a light, warm breakfast appropriate for your dosha when you feel genuine hunger, typically between 7-8 AM.

By following these morning practices consistently, you create the foundation for strong digestion and overall wellbeing throughout the day.
`,
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    authorId: '1',
    authorName: 'Admin',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    categoryId: '1',
    categoryName: 'Digestive Health',
    tags: [
      { id: '3', name: 'Prevention', slug: 'prevention' },
      { id: '9', name: 'Traditional', slug: 'traditional' }
    ],
    createdAt: new Date(2023, 6, 2).toISOString(),
    updatedAt: new Date(2023, 6, 2).toISOString(),
    status: 'approved',
    views: 156,
    likes: 29,
    comments: []
  }
];

// Mock data for remedies
const mockRemedies: Remedy[] = [
  {
    id: '1',
    title: 'Ginger Tea for Digestion',
    description: 'A simple but effective remedy to improve digestion and reduce bloating',
    ingredients: [
      'Fresh ginger - 1 inch piece',
      'Water - 2 cups',
      'Lemon - 1/2 (optional)',
      'Honey - 1 teaspoon (optional)'
    ],
    instructions: [
      'Peel and thinly slice the ginger',
      'Bring water to a boil in a pot',
      'Add ginger slices and simmer for 5-10 minutes',
      'Strain the tea into a cup',
      'Add lemon and honey if desired'
    ],
    categoryId: '1',
    authorId: '2',
    authorName: 'Ayurveda Lover',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayurveda',
    isExpertVerified: true,
    createdAt: new Date(2023, 5, 10).toISOString(),
    likes: 28,
    approvalStatus: 'approved'
  },
  {
    id: '2',
    title: 'Tulsi Honey for Cough',
    description: 'A traditional remedy using holy basil (tulsi) and honey for cough and cold relief',
    ingredients: [
      'Fresh tulsi leaves - 10-15 leaves',
      'Honey - 1 tablespoon',
      'Black pepper - a pinch (optional)'
    ],
    instructions: [
      'Wash and crush the tulsi leaves to extract juice',
      'Mix the tulsi juice with honey',
      'Add a pinch of black pepper if needed',
      'Take 1 teaspoon of this mixture 2-3 times a day'
    ],
    categoryId: '2',
    authorId: '2',
    authorName: 'Ayurveda Lover',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayurveda',
    isExpertVerified: false,
    createdAt: new Date(2023, 6, 5).toISOString(),
    likes: 19,
    approvalStatus: 'approved'
  },
  {
    id: '3',
    title: 'Turmeric Face Mask',
    description: 'An Ayurvedic face mask for glowing skin using kitchen ingredients',
    ingredients: [
      'Turmeric powder - 1/2 teaspoon',
      'Chickpea flour - 2 tablespoons',
      'Raw milk or yogurt - as needed',
      'Honey - 1/2 teaspoon'
    ],
    instructions: [
      'Mix turmeric powder and chickpea flour in a bowl',
      'Add enough milk or yogurt to form a paste',
      'Add honey and mix well',
      'Apply to clean face and leave for 15-20 minutes',
      'Rinse with warm water'
    ],
    categoryId: '3',
    authorId: '3',
    authorName: 'health_enthusiast',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=health',
    isExpertVerified: false,
    createdAt: new Date(2023, 7, 12).toISOString(),
    likes: 35,
    approvalStatus: 'approved'
  },
  {
    id: '4',
    title: 'Triphala Digestive Aid',
    description: 'Using the traditional Ayurvedic formula for digestive health',
    ingredients: [
      'Triphala powder - 1/2 teaspoon',
      'Warm water - 1 cup',
      'Honey - 1/2 teaspoon (optional)'
    ],
    instructions: [
      'Mix Triphala powder in warm water',
      'Let it steep for 5 minutes',
      'Add honey if desired',
      'Drink before bedtime'
    ],
    categoryId: '1',
    authorId: '1',
    authorName: 'Admin',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    isExpertVerified: true,
    createdAt: new Date(2023, 8, 3).toISOString(),
    likes: 12,
    approvalStatus: 'pending'
  }
];

// Data Access Functions

// Categories
export const getCategories = (): Category[] => {
  return [...mockCategories];
};

export const getCategoryBySlug = (slug: string): Category | null => {
  return mockCategories.find(category => category.slug === slug) || null;
};

// Tags
export const getTags = (): Tag[] => {
  return [...mockTags];
};

export const getTagBySlug = (slug: string): Tag | null => {
  return mockTags.find(tag => tag.slug === slug) || null;
};

// Posts
export const getPosts = (): Post[] => {
  return [...mockPosts].filter(post => post.status === 'approved');
};

export const getPostsByCategory = (categoryId: string): Post[] => {
  return [...mockPosts]
    .filter(post => post.categoryId === categoryId && post.status === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPostBySlug = (slug: string): Post | null => {
  return mockPosts.find(post => post.slug === slug) || null;
};

export const getPendingPosts = (): Post[] => {
  return [...mockPosts].filter(post => post.status === 'pending');
};

export const getApprovedPosts = (): Post[] => {
  return [...mockPosts].filter(post => post.status === 'approved');
};

// Adding likePost function to fix build error
export const likePost = (postId: string): Post | null => {
  const postIndex = mockPosts.findIndex(post => post.id === postId);
  if (postIndex === -1) return null;
  
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    likes: mockPosts[postIndex].likes + 1
  };
  
  return mockPosts[postIndex];
};

// Adding searchPosts function to fix build error
export const searchPosts = (query: string): Post[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return [...mockPosts]
    .filter(post => 
      post.status === 'approved' && 
      (post.title.toLowerCase().includes(lowerQuery) ||
       post.content.toLowerCase().includes(lowerQuery) ||
       post.excerpt.toLowerCase().includes(lowerQuery) ||
       post.categoryName.toLowerCase().includes(lowerQuery) ||
       post.tags.some(tag => tag.name.toLowerCase().includes(lowerQuery)))
    );
};

export const updatePostStatus = (postId: string, status: PostStatus): Post | null => {
  const postIndex = mockPosts.findIndex(post => post.id === postId);
  if (postIndex === -1) return null;
  
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    status: status,
    updatedAt: new Date().toISOString()
  };
  
  return mockPosts[postIndex];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addComment = (postId: string, commentData: any): Comment | null => {
  const postIndex = mockPosts.findIndex(post => post.id === postId);
  if (postIndex === -1) return null;
  
  const newComment: Comment = {
    id: Date.now().toString(),
    postId: postId,
    userId: commentData.userId,
    username: commentData.username,
    userAvatar: commentData.userAvatar,
    content: commentData.content,
    createdAt: new Date().toISOString()
  };
  
  mockPosts[postIndex].comments.push(newComment);
  
  return newComment;
};

export const createPost = (postData: Partial<Post>): Post | null => {
  try {
    const newPost: Post = {
      id: Date.now().toString(),
      title: postData.title || 'Untitled Post',
      slug: postData.slug || `post-${Date.now()}`,
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      featuredImage: postData.featuredImage,
      authorId: postData.authorId || '',
      authorName: postData.authorName || 'Anonymous',
      authorAvatar: postData.authorAvatar,
      categoryId: postData.categoryId || '',
      categoryName: postData.categoryName || 'Uncategorized',
      tags: postData.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
      views: 0,
      likes: 0,
      comments: []
    };
    
    mockPosts.push(newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

// Remedies
export const getRemedies = (): Remedy[] => {
  return [...mockRemedies].filter(remedy => remedy.approvalStatus === 'approved');
};

export const getRemediesByCategory = (categoryId: string): Remedy[] => {
  return [...mockRemedies]
    .filter(remedy => remedy.categoryId === categoryId && remedy.approvalStatus === 'approved')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPendingRemedies = (): Remedy[] => {
  return [...mockRemedies].filter(remedy => remedy.approvalStatus === 'pending');
};

export const getApprovedRemedies = (): Remedy[] => {
  return [...mockRemedies].filter(remedy => remedy.approvalStatus === 'approved');
};

export const updateRemedyApprovalStatus = (remedyId: string, status: ApprovalStatus): Remedy | null => {
  const remedyIndex = mockRemedies.findIndex(remedy => remedy.id === remedyId);
  if (remedyIndex === -1) return null;
  
  mockRemedies[remedyIndex] = {
    ...mockRemedies[remedyIndex],
    approvalStatus: status
  };
  
  return mockRemedies[remedyIndex];
};

export const createRemedy = (remedyData: Partial<Remedy>): Remedy | null => {
  try {
    const newRemedy: Remedy = {
      id: Date.now().toString(),
      title: remedyData.title || 'Untitled Remedy',
      description: remedyData.description || '',
      ingredients: remedyData.ingredients || [],
      instructions: remedyData.instructions || [],
      categoryId: remedyData.categoryId || '',
      authorId: remedyData.authorId || '',
      authorName: remedyData.authorName || 'Anonymous',
      authorAvatar: remedyData.authorAvatar,
      isExpertVerified: false,
      createdAt: new Date().toISOString(),
      likes: 0,
      approvalStatus: 'pending'
    };
    
    mockRemedies.push(newRemedy);
    return newRemedy;
  } catch (error) {
    console.error('Error creating remedy:', error);
    return null;
  }
};
