import * as React from 'react';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { usePortfolio } from '@/hooks/usePortfolio';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  User,
  ExternalLink,
  ChevronRight,
  PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const { posts, services, settings, loading } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '', icon: LayoutDashboard },
    { label: 'Posts', path: '/posts', icon: FileText },
    { label: 'Services', path: '/services', icon: PenTool },
    { label: 'Site Settings', path: '/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="w-8 h-8 border-4 border-[#ff3b3b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] relative">
      {/* Mobile Sidebar Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1a1a1a] border border-white/5"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <LayoutDashboard className="h-5 w-5" />
      </Button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#1a1a1a] flex flex-col transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/5">
          <div className="text-2xl font-bold tracking-tighter">
            RAJU<span className="text-[#ff3b3b]">.</span> ADMIN
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === `/admin-raju-dashboard${item.path}`;
            return (
              <Link 
                key={item.path} 
                to={`/admin-raju-dashboard${item.path}`}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#ff3b3b] text-white shadow-[0_0_15px_rgba(255,59,59,0.3)]' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ff3b3b]/10 flex items-center justify-center text-[#ff3b3b]">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{auth.currentUser?.email?.split('@')[0]}</div>
              <div className="text-xs text-white/30 truncate">{auth.currentUser?.email}</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/50 hover:text-[#ff3b3b] hover:bg-[#ff3b3b]/10 gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto pt-12 md:pt-0">
          <Routes>
            <Route path="/" element={<DashboardOverview posts={posts} services={services} />} />
            <Route path="/posts" element={<ManagePosts posts={posts} />} />
            <Route path="/services" element={<ManageServices services={services} />} />
            <Route path="/settings" element={<ManageSettings settings={settings} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function DashboardOverview({ posts, services }: { posts: any[], services: any[] }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Welcome back, Raju</h1>
          <p className="text-white/50">Here's what's happening with your portfolio.</p>
        </div>
        <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 w-full md:w-auto" asChild>
          <Link to="/">View Website <ExternalLink className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 uppercase tracking-widest">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 uppercase tracking-widest">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 uppercase tracking-widest">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">Live</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(0, 4).map(post => (
            <div key={post.id} className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-white/5 rounded-2xl">
              <img src={post.imageUrl} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{post.title}</div>
                <div className="text-xs text-white/30">{new Date(post.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}</div>
              </div>
              <ChevronRight className="text-white/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManageServices({ services }: { services: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: 'Layout' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateDoc(doc(db, 'services', editingService.id), { ...formData });
        toast.success('Service updated');
      } else {
        await addDoc(collection(db, 'services'), { ...formData });
        toast.success('Service added');
      }
      setIsAdding(false);
      setEditingService(null);
      setFormData({ title: '', description: '', icon: 'Layout' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      toast.success('Service deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const icons = ['Layout', 'Code', 'PenTool', 'Camera', 'Smartphone', 'Globe', 'Database', 'Search'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Manage Services</h1>
        <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90" onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      {(isAdding || editingService) && (
        <Card className="bg-[#1a1a1a] border-[#ff3b3b]/30">
          <CardHeader>
            <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="bg-white/5 border-white/10"
                required
              />
              <Textarea 
                placeholder="Description" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="bg-white/5 border-white/10"
                required
              />
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Select Icon</label>
                <div className="flex flex-wrap gap-2">
                  {icons.map(icon => (
                    <Button 
                      key={icon}
                      type="button"
                      variant={formData.icon === icon ? 'default' : 'outline'}
                      className={formData.icon === icon ? 'bg-[#ff3b3b]' : 'border-white/10'}
                      onClick={() => setFormData({...formData, icon})}
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90">
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button variant="ghost" type="button" onClick={() => { setIsAdding(false); setEditingService(null); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <Card key={service.id} className="bg-[#1a1a1a] border-white/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-white/50 text-sm mb-4 line-clamp-3">{service.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-white/10" onClick={() => {
                  setEditingService(service);
                  setFormData({ title: service.title, description: service.description, icon: service.icon });
                }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ManagePosts({ posts }: { posts: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', caption: '', imageUrl: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updateDoc(doc(db, 'posts', editingPost.id), { ...formData });
        toast.success('Post updated');
      } else {
        await addDoc(collection(db, 'posts'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success('Post added');
      }
      setIsAdding(false);
      setEditingPost(null);
      setFormData({ title: '', caption: '', imageUrl: '' });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('Post deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tighter">Manage Posts</h1>
        <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90" onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      {(isAdding || editingPost) && (
        <Card className="bg-[#1a1a1a] border-[#ff3b3b]/30">
          <CardHeader>
            <CardTitle>{editingPost ? 'Edit Post' : 'Add New Post'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="bg-white/5 border-white/10"
                required
              />
              <Textarea 
                placeholder="Caption" 
                value={formData.caption} 
                onChange={e => setFormData({...formData, caption: e.target.value})}
                className="bg-white/5 border-white/10"
                required
              />
              <Input 
                placeholder="Image URL" 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="bg-white/5 border-white/10"
                required
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90">
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
                <Button variant="ghost" type="button" onClick={() => { setIsAdding(false); setEditingPost(null); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Card key={post.id} className="bg-[#1a1a1a] border-white/5 overflow-hidden group">
            <img src={post.imageUrl} className="aspect-video object-cover" referrerPolicy="no-referrer" />
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-white/50 text-sm mb-4 line-clamp-2">{post.caption}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-white/10" onClick={() => {
                  setEditingPost(post);
                  setFormData({ title: post.title, caption: post.caption, imageUrl: post.imageUrl });
                }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ManageSettings({ settings }: { settings: any }) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { id, ...data } = formData;
      await setDoc(doc(db, 'settings', 'site'), data, { merge: true });
      toast.success('Settings updated');
    } catch (error) {
      console.error(error);
      toast.error('Update failed');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tighter">Site Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Hero Title</label>
                <Input value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Hero Subtitle</label>
                <Input value={formData.heroSubtitle} onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Hero Description</label>
              <Textarea value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} className="bg-white/5 border-white/10" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader>
            <CardTitle>Profile & About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Name</label>
                <Input value={formData.profileName} onChange={e => setFormData({...formData, profileName: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Title</label>
                <Input value={formData.profileTitle} onChange={e => setFormData({...formData, profileTitle: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Profile Image URL</label>
              <Input value={formData.profileImage} onChange={e => setFormData({...formData, profileImage: e.target.value})} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest">About Text</label>
              <Textarea value={formData.aboutText} onChange={e => setFormData({...formData, aboutText: e.target.value})} className="bg-white/5 border-white/10" rows={6} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/5">
          <CardHeader>
            <CardTitle>Contact & Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Contact Email</label>
                <Input value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Footer Text</label>
                <Input value={formData.footerText} onChange={e => setFormData({...formData, footerText: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 px-12 py-6 text-lg font-bold">Save All Changes</Button>
      </form>
    </div>
  );
}
