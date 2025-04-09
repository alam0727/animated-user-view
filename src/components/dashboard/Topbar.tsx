
import { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar }: TopbarProps) => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-14 border-b border-border bg-background fixed top-0 right-0 left-0 z-20 flex items-center px-4">
      <button 
        onClick={toggleSidebar}
        className="mr-4 p-2 rounded-md hover:bg-accent lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 flex items-center justify-start">
        <div className="relative w-full max-w-md md:max-w-xs lg:max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent">
          <Bell size={18} />
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 hover:bg-accent rounded-md px-2 py-1.5"
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user?.name || 'User'} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <ChevronDown size={16} className="hidden md:block" />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-background shadow-lg animate-fade-in z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Signed in as <strong>{user?.email || 'user@example.com'}</strong>
                </div>
                <div className="h-px bg-border my-1" />
                <button 
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Navigate to profile page
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button 
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Navigate to settings page
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
                <div className="h-px bg-border my-1" />
                <button 
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
