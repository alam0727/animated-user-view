
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard, 
  BarChart, 
  Users, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isMobile, isOpen, toggle }: SidebarProps) => {
  const location = useLocation();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { 
      name: 'Analytics', 
      icon: BarChart,
      isDropdown: true,
      isOpen: isAnalyticsOpen,
      toggle: () => setIsAnalyticsOpen(!isAnalyticsOpen),
      children: [
        { name: 'Overview', href: '/dashboard/analytics' },
        { name: 'Reports', href: '/dashboard/reports' },
        { name: 'Statistics', href: '/dashboard/statistics' }
      ]
    },
    { name: 'Team Members', href: '/dashboard/team', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside
      className={cn(
        "h-full bg-sidebar fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-64" : "w-0",
        isMobile ? "animate-slide-in" : ""
      )}
    >
      <div className="flex h-14 items-center px-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h10M7 12h10M7 17h10" />
          </svg>
          <span>Dashboard</span>
        </Link>
        {isMobile && (
          <button 
            onClick={toggle} 
            className="ml-auto rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-1">
          {links.map((link, index) => (
            <div key={index}>
              {link.isDropdown ? (
                <div className="space-y-1">
                  <button
                    onClick={link.toggle}
                    className="sidebar-menu-item w-full justify-between"
                  >
                    <span className="flex items-center gap-3">
                      {link.icon && <link.icon size={18} />}
                      {link.name}
                    </span>
                    {link.isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {link.isOpen && (
                    <div className="ml-7 space-y-1 animate-fade-in">
                      {link.children?.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.href}
                          className={cn(
                            "sidebar-menu-item pl-6",
                            isActive(child.href) && "sidebar-menu-item-active"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.href}
                  className={cn(
                    "sidebar-menu-item",
                    isActive(link.href) && "sidebar-menu-item-active"
                  )}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
