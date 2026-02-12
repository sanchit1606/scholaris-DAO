import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Notification = {
  id: number;
  type: string;
  user: {
    name: string;
    avatar: string;
    fallback: string;
  };
  action: string;
  target?: string;
  content?: string;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
  hasActions?: boolean;
  file?: {
    name: string;
    size: string;
    type: string;
  };
};

const notifications: Array<Notification> = [
  {
    id: 1,
    type: "post",
    user: { name: "Sanchit", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sanchit", fallback: "S" },
    action: "posted",
    target: "IBM Interview Experience",
    content: "Sanchit just posted his IBM interview experience. Tap to view the post.",
    timestamp: "Today 10:12 AM",
    timeAgo: "5m ago",
    isRead: false,
  },
  {
    id: 2,
    type: "mention",
    user: { name: "Shreya", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Shreya", fallback: "S" },
    action: "mentioned you in",
    target: 'VIT Placement community',
    content: "@you Can you check the mock interview notes?",
    timestamp: "Today 9:40 AM",
    timeAgo: "37m ago",
    isRead: false,
  },
  {
    id: 3,
    type: "event",
    user: { name: "MLSC Club", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=MLSC", fallback: "M" },
    action: "opened event",
    target: "Hackspirathon 2026",
    content: "MLSC Club has opened a new event: Hackspirathon 2026. Tap to view details.",
    timestamp: "Yesterday 4:12 PM",
    timeAgo: "1d ago",
    isRead: true,
    hasActions: true,
  },
];

import { useNavigate } from "react-router-dom";

function NotificationItem({ notification }: { notification: Notification }) {
  const navigate = useNavigate();
  const handleView = () => {
    // route all notification views to community for now; can be extended per type
    navigate("/placeprep/community");
  };
  return (
    <div className="w-full py-4 first:pt-0 last:pb-0">
      <div className="flex gap-3">
        <Avatar className="size-11">
          <AvatarImage src={notification.user.avatar || "/assets/placeholder.svg"} alt={`${notification.user.name}'s profile`} className="object-cover ring-1 ring-border" />
          <AvatarFallback>{notification.user.fallback}</AvatarFallback>
        </Avatar>

        <div className="flex flex-1 flex-col space-y-2">
          <div className="w-full items-start">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  <span className="font-medium">{notification.user.name}</span>
                  <span className="text-muted-foreground"> {notification.action} </span>
                  {notification.target && <span className="font-medium">{notification.target}</span>}
                </div>
                {!notification.isRead && <div className="size-1.5 rounded-full bg-emerald-500" />}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="mt-0.5 text-xs text-muted-foreground">{notification.timestamp}</div>
                <div className="text-xs text-muted-foreground">{notification.timeAgo}</div>
              </div>
            </div>
          </div>

          {notification.content && (
            <>
              <div className="text-sm tracking-[-0.006em]">
                {notification.type === "post" || notification.type === "event"
                  ? notification.content.replace(/Tap to view.*/i, "").trim()
                  : notification.content}
              </div>
              {(notification.type === "post" || notification.type === "event") && (
                <div className="mt-2">
                  <Button size="sm" className="h-7 text-xs" onClick={() => {
                    // navigate to community post/event
                    const nav = (window as any).__react_router_navigate;
                    // fallback to using location if router navigate not exposed
                    try {
                      // prefer useNavigate inside component; this inline fallback will call the window history
                      window.location.href = "/placeprep/community";
                    } catch {
                      window.location.href = "/placeprep/community";
                    }
                  }}>
                    Tap to view
                  </Button>
                </div>
              )}
            </>
          )}

          {notification.file && (
            <div className="flex items-center gap-2 p-0">
              <div className="flex-1">
                <div className="text-sm font-medium">{notification.file.name}</div>
                <div className="text-xs text-muted-foreground">{notification.file.type} • {notification.file.size}</div>
              </div>
              <Button variant="ghost" size="icon" className="size-8">Open</Button>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
}

export const NotificationsMenu = () => {
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const mentionCount = notifications.filter((n) => n.type === "mention").length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onWheel = (e: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const delta = e.deltaY;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    // If the inner container can scroll in the direction of the wheel, prevent propagation
    if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
      e.stopPropagation();
      // allow default to let inner scroll work
    }
    // otherwise let the wheel bubble to parent (page) to scroll
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "mentions":
        return notifications.filter((n) => n.type === "mention");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div
      ref={containerRef}
      onWheel={onWheel}
      className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-[440px] flex flex-col gap-6 p-4 md:p-6 max-h-[60vh] overflow-y-auto overscroll-contain"
    >
      <div className="p-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base leading-none font-semibold tracking-[-0.006em]">Your notifications</h3>
          <div className="flex items-center gap-2">
            <Button className="size-8" variant="ghost" size="icon" aria-label="mark read">
              {/* check icon */}
              ✓
            </Button>
            <Button className="size-8" variant="ghost" size="icon" aria-label="settings">
              ⚙
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start">
          <div className="flex items-center justify-between">
            <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 [&_button]:gap-1.5">
              <TabsTrigger value="all">
                View all <Badge variant="secondary">{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="mentions">
                Mentions <Badge variant="secondary">{mentionCount}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="h-full p-0">
        <div className="space-y-0 divide-y divide-dashed divide-border">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2.5 py-12 text-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="m13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <p className="text-sm font-medium tracking-[-0.006em] text-muted-foreground">No notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;

