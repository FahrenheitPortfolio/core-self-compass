
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptionFeatures } from '@/hooks/useSubscriptionFeatures';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CommunityPost {
  id: string;
  author_name: string;
  need_category: string;
  content: string;
  hearts_count: number;
  created_at: string;
  user_has_hearted?: boolean;
}

const EnhancedCommunity = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { features } = useSubscriptionFeatures();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    need_category: '',
    content: '',
  });

  const needCategories = [
    'Physical', 'Emotional', 'Social', 'Intellectual', 'Spiritual', 'Creative'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          id,
          author_name,
          need_category,
          content,
          hearts_count,
          created_at,
          community_hearts!inner(user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const postsWithHearts = data.map(post => ({
        ...post,
        user_has_hearted: post.community_hearts?.some((heart: any) => heart.user_id === user?.id) || false,
      }));

      setPosts(postsWithHearts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!user || !profile || !features.communityParticipation) {
      toast.error('Premium subscription required to post');
      return;
    }

    if (!newPost.content.trim() || !newPost.need_category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          author_name: `${profile.first_name || 'Anonymous'} ${profile.last_name?.[0] || ''}.`,
          need_category: newPost.need_category,
          content: newPost.content,
        });

      if (error) throw error;

      toast.success('Post shared with the community!');
      setNewPost({ need_category: '', content: '' });
      setShowCreatePost(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error sharing post');
    }
  };

  const handleHeartPost = async (postId: string, currentlyHearted: boolean) => {
    if (!user || !features.communityParticipation) {
      toast.error('Premium subscription required to interact');
      return;
    }

    try {
      if (currentlyHearted) {
        const { error } = await supabase
          .from('community_hearts')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('community_hearts')
          .insert({
            user_id: user.id,
            post_id: postId,
          });

        if (error) throw error;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error updating heart:', error);
      toast.error('Error updating reaction');
    }
  };

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Community Circle</h1>
        <button 
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={!features.communityParticipation}
        >
          <Plus className={`w-5 h-5 ${features.communityParticipation ? 'text-gray-600' : 'text-gray-300'}`} />
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Soul Stories</h2>
        <p className="text-gray-600 text-sm">Share and discover how others nurture their needs</p>
        {!features.communityParticipation && (
          <p className="text-sm text-amber-600 font-medium mt-2">
            💫 Upgrade to Premium to participate and share your stories
          </p>
        )}
      </div>

      {/* Create Post */}
      {showCreatePost && features.communityParticipation && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Share Your Story</h3>
          
          <select
            value={newPost.need_category}
            onChange={(e) => setNewPost({ ...newPost, need_category: e.target.value })}
            className="w-full p-3 bg-white/60 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select a need category</option>
            {needCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Share how you've been nurturing this need..."
            className="w-full h-24 p-4 bg-white/60 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-500 mb-4"
          />
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowCreatePost(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-blue-500 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-blue-600 transition-all duration-200"
            >
              Share Story
            </button>
          </div>
        </div>
      )}

      {!features.communityParticipation && (
        <button 
          onClick={() => navigate('/pricing')}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-2xl p-4 mb-6 shadow-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Upgrade to Share Your Stories</span>
          </div>
        </button>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-800">{post.author_name}</div>
                <div className="text-sm text-emerald-600 font-medium">{post.need_category}</div>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4 italic">
              "{post.content}"
            </p>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => handleHeartPost(post.id, post.user_has_hearted || false)}
                disabled={!features.communityParticipation}
                className={`flex items-center space-x-2 transition-colors ${
                  features.communityParticipation
                    ? post.user_has_hearted 
                      ? 'text-pink-500'
                      : 'text-gray-500 hover:text-pink-500'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.user_has_hearted ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.hearts_count}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Support</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No stories shared yet. Be the first to inspire others!</p>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">🌟 Community Guidelines</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Share with love and vulnerability</li>
          <li>• Support others without judgment</li>
          <li>• Respect privacy and boundaries</li>
          <li>• Celebrate small wins and growth</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedCommunity;
