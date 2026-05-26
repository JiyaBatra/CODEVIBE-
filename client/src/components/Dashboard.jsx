import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Sparkles,
  Star,
  UserCircle,
  Wand2,
} from "lucide-react";
import { useAuth } from "../AuthProvider.jsx";
import API_BASE_URL from "../config/api";
import "./Dashboard.css";

const formatNumber = (value) => {
  if (value === undefined || value === null) return "—";
  return value.toLocaleString();
};

const formatShortDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatTime = (seconds) => {
  if (!seconds || seconds <= 0) return "0m";
  if (seconds < 60) return `${seconds}s`;
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const SUBJECT_GRADIENTS = {
  html: { start: "#ff9a6c", end: "#ff576d" },
  css: { start: "#63b5ff", end: "#486cff" },
  javascript: { start: "#f9d64c", end: "#f89c20" },
  react: { start: "#66e3ff", end: "#4a8dff" },
  node: { start: "#7ef39a", end: "#3bb46c" },
  dsa: { start: "#c98bff", end: "#7f63ff" },
  mongodb: { start: "#6eea83", end: "#239955" },
  python: { start: "#5bc1ff", end: "#ffd05b" },
};

const generateFallbackGradient = (subject) => {
  const key = subject?.toString() || "fallback";
  const hash = Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = 45 + (hash % 310);
  return {
    start: `hsl(${hue}, 88%, 64%)`,
    end: `hsl(${(hue + 32) % 360}, 88%, 55%)`,
  };
};

const getSubjectGradient = (subject) => {
  const key = subject?.toString().toLowerCase();
  return SUBJECT_GRADIENTS[key] || generateFallbackGradient(subject);
};

const buildHeatmapCells = (events = [], streak = 0, weeks = 10) => {
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = weeks * 7;
  const start = new Date(today.getTime() - dayMs * (totalDays - 1));
  const activeDates = events.reduce((acc, event) => {
    const date = new Date(event.x || event.createdAt || event.date || "");
    if (!date || Number.isNaN(date.getTime())) return acc;
    const key = date.toISOString().slice(0, 10);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  for (let offset = 0; offset < Math.min(streak, totalDays); offset += 1) {
    const streakDate = new Date(today.getTime() - offset * dayMs);
    const streakKey = streakDate.toISOString().slice(0, 10);
    activeDates[streakKey] = Math.max(activeDates[streakKey] || 0, 1);
  }

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(start.getTime() + index * dayMs);
    const dateKey = date.toISOString().slice(0, 10);
    return {
      date,
      active: Boolean(activeDates[dateKey]),
      count: activeDates[dateKey] || 0,
    };
  });
};

const HeatmapCalendar = ({ events = [], streak = 0, weeks = 10 }) => {
  const heatmapCells = useMemo(() => buildHeatmapCells(events, streak, weeks), [events, streak, weeks]);

  return (
    <div className="heatmap-calendar">
      <div className="heatmap-label-row">
        <span>Recent activity</span>
        <div className="heatmap-legend">
          <span className="heatmap-legend-dot heatmap-legend-dot--inactive" />
          <span>Inactive</span>
          <span className="heatmap-legend-dot heatmap-legend-dot--active" />
          <span>Active</span>
        </div>
      </div>
      <div className="heatmap-grid" role="grid">
        {heatmapCells.map((cell) => (
          <div
            key={cell.date.toISOString()}
            className={`heatmap-cell ${cell.active ? "heatmap-cell--active" : ""}`}
            title={`${formatShortDate(cell.date)}${cell.active ? " — Active" : " — Rest"}`}
            role="button"
            aria-label={`${formatShortDate(cell.date)} ${cell.active ? "active" : "inactive"}`}
          />
        ))}
      </div>
    </div>
  );
};

const getLevel = (points) => {
  if (!points) return "Beginner";
  const tier = Math.min(6, Math.max(1, Math.ceil(points / 180)));
  return ["Beginner", "Rising", "Skilled", "Advanced", "Expert", "Master"][tier - 1];
};

const buildSmoothPath = (values, width, height, xOffset = 24) => {
  const count = values.length;
  if (!count) return "";

  const coords = values.map((value, index) => {
    const x = (index / Math.max(count - 1, 1)) * width + xOffset;
    const max = Math.max(...values, 0);
    const min = Math.min(0, ...values);
    const normalized = max === min ? 0 : (value - min) / Math.max(max - min, 1);
    const y = 12 + (1 - normalized) * height;
    return { x, y };
  });

  if (coords.length === 1) {
    return `M ${coords[0].x} ${coords[0].y}`;
  }

  return coords.reduce((path, current, index) => {
    if (index === 0) return `M ${current.x} ${current.y}`;
    const previous = coords[index - 1];
    const midX = (previous.x + current.x) / 2;
    return `${path} C ${midX} ${previous.y} ${midX} ${current.y} ${current.x} ${current.y}`;
  }, "");
};

const buildGrowthTimeline = (points = []) => {
  let cumulative = 0;
  const uniqueLessonsCompleted = new Set();
  const timeline = [];

  points
    .filter((item) => item && typeof item.y === 'number')
    .forEach((item) => {
      cumulative += item.y;
      if (item.lessonId) {
        uniqueLessonsCompleted.add(item.lessonId);
      }

      const point = {
        date: item.x || item.createdAt || null,
        value: cumulative,
        lessonsCompleted: item.lessonsCompleted ?? uniqueLessonsCompleted.size,
        label: item.x ? formatShortDate(item.x) : `Step ${uniqueLessonsCompleted.size || 1}`,
      };

      if (!timeline.length || timeline[timeline.length - 1].value !== point.value) {
        timeline.push(point);
      }
    });

  if (timeline.length && timeline[0].value !== 0) {
    timeline.unshift({
      date: timeline[0].date || new Date().toISOString(),
      value: 0,
      lessonsCompleted: 0,
      label: 'Start',
    });
  }

  return timeline;
};

const getGrowthLabels = (points = []) => {
  if (!points.length) return [];
  if (points.length <= 3) return points.map((point) => point.label);
  const labels = [points[0].label];
  const mid = points[Math.floor((points.length - 1) / 2)];
  const last = points[points.length - 1];
  if (mid && mid.label !== labels[0]) labels.push(mid.label);
  if (last.label !== labels[0]) labels.push(last.label);
  return labels;
};

const formatGrowthSpan = (points = []) => {
  if (points.length < 2 || !points[0].date || !points[points.length - 1].date) return 'Recent';
  const first = new Date(points[0].date);
  const last = new Date(points[points.length - 1].date);
  const days = Math.max(1, Math.round((last - first) / (1000 * 60 * 60 * 24)));
  if (days >= 60) return `${Math.round(days / 30)} months`;
  if (days >= 14) return `${Math.round(days / 7)} weeks`;
  return `${days} days`;
};

const GrowthLineChart = ({ points = [], color = { start: '#ffb8d9', end: '#c386ff' }, label = 'Growth chart' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const hasData = points.length > 1;

  if (!hasData) {
    return (
      <div className="chart-empty chart-empty--large">
        <span>Need more activity to display growth</span>
      </div>
    );
  }

  const values = points.map((point) => point.value);
  const max = Math.max(...values, 10);
  const min = 0;
  const yRange = max - min;
  const width = 320;
  const height = 220;
  const chartWidth = width - 42;
  const chartHeight = height - 50;

  const path = buildSmoothPath(values, chartWidth, chartHeight);
  const labels = getGrowthLabels(points);
  const yTicks = [0, Math.round(max * 0.33), Math.round(max * 0.66), max].map((value) => Math.round(value / 10) * 10);
  const hoveredPoint = hoveredIndex !== null ? points[hoveredIndex] : null;

  return (
    <div className="growth-chart-wrapper">
      <svg viewBox={`0 0 ${width} ${height}`} className="analytics-chart" aria-label={label}>
        <defs>
          <linearGradient id="growth-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color.start} />
            <stop offset="100%" stopColor={color.end} />
          </linearGradient>
          <linearGradient id="growth-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color.end} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color.start} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="24" y="12" width={chartWidth} height={chartHeight} rx="24" fill="rgba(255,255,255,0.03)" />

        {yTicks.map((tickValue, index) => {
          const y = 12 + chartHeight - (tickValue - min) / Math.max(yRange, 1) * chartHeight;
          return (
            <g key={tickValue}>
              <line x1="24" x2={chartWidth + 24} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="12" y={y + 4} fill="rgba(255,255,255,0.55)" fontSize="10" textAnchor="start">
                {tickValue}
              </text>
            </g>
          );
        })}

        <path d={`${path} L ${chartWidth + 24} ${chartHeight + 12} L 24 ${chartHeight + 12} Z`} fill="url(#growth-fill)" opacity="0.8" />
        <path d={path} fill="none" stroke="url(#growth-line)" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="round" className="chart-path" />

        {points.map((point, index) => {
          const x = (index / Math.max(points.length - 1, 1)) * chartWidth + 24;
          const normalized = yRange === 0 ? 0.5 : (point.value - min) / yRange;
          const y = chartHeight + 12 - normalized * chartHeight;
          const markerRadius = hoveredIndex === index ? 6.5 : 4.5;
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r={markerRadius}
                fill={color.end}
                opacity="0.95"
              />
              <circle
                cx={x}
                cy={y}
                r={markerRadius * 1.6}
                fill={color.end}
                opacity={hoveredIndex === index ? 0.12 : 0.06}
              />
              <rect
                x={Math.max(24, x - chartWidth / Math.max(points.length, 1) / 2)}
                y="12"
                width={Math.min(chartWidth / Math.max(points.length, 1), chartWidth)}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          );
        })}
      </svg>
      <div className="growth-axis-row">
        {labels.map((labelText) => (
          <span key={labelText} className="growth-axis-label">
            {labelText}
          </span>
        ))}
      </div>
      {hoveredPoint && (
        <div className="chart-tooltip">
          <span>{hoveredPoint.date ? new Date(hoveredPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent activity'}</span>
          <strong>{hoveredPoint.value} points</strong>
          <small>{hoveredPoint.lessonsCompleted} lessons completed</small>
        </div>
      )}
    </div>
  );
};

const MiniLineChart = ({ points = [], values = [], color = "#ff7aa5", label = "", gradientId = "subject-gradient", maxScale = null }) => {
  const chartColor = typeof color === 'string' ? { start: color, end: color } : color;
  const rawPoints = values.length
    ? values.map((value, index) => ({ value: value || 0, label: `Step ${index + 1}` }))
    : points.map((point, index) => {
      if (typeof point === 'number') {
        return { value: point, label: `Step ${index + 1}` };
      }

      return {
        value: typeof point.progress === 'number' ? point.progress : point.value || 0,
        label: point.lesson ? `Lesson ${point.lesson}` : point.label || `Step ${index + 1}`,
      };
    });

  if (!rawPoints.length) {
    return (
      <div className="chart-empty chart-empty--large">
        <span>Start learning to build progress history</span>
      </div>
    );
  }

  const valuesList = rawPoints.map((point) => point.value || 0);
  const max = maxScale ? Math.max(maxScale, ...valuesList) : Math.max(...valuesList);
  const min = Math.min(0, ...valuesList);

  if (rawPoints.length === 1) {
    const point = rawPoints[0];
    const x = 120;
    const normalized = max === min ? 0 : (point.value - min) / Math.max(max - min, 1);
    const y = 90 - 12 - normalized * 70;
    const path = `M 24 78 C 64 78 96 ${y} ${x} ${y}`;

    return (
      <svg viewBox="0 0 240 90" className="analytics-chart" aria-label={label}>
        <defs>
          <linearGradient id={`${gradientId}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={chartColor.start} />
            <stop offset="100%" stopColor={chartColor.end} />
          </linearGradient>
          <linearGradient id={`${gradientId}-fill`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColor.end} stopOpacity="0.24" />
            <stop offset="100%" stopColor={chartColor.start} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="9" y="10" width="222" height="70" rx="16" fill="rgba(255,255,255,0.02)" />
        {[1, 2, 3].map((index) => (
          <line
            key={index}
            x1="9"
            x2="231"
            y1={10 + (index * 70) / 4}
            y2={10 + (index * 70) / 4}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId}-line)`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chart-path"
        />
        <circle cx={x} cy={y} r="4.5" fill={chartColor.end} stroke={chartColor.end} strokeWidth="1" opacity="0.95">
          <title>{`${point.label}: ${point.value}`}</title>
        </circle>
      </svg>
    );
  }

  const path = buildSmoothPath(valuesList, 222, 90, 9);

  return (
    <svg viewBox="0 0 240 90" className="analytics-chart" aria-label={label}>
      <defs>
        <linearGradient id={`${gradientId}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={chartColor.start} />
          <stop offset="100%" stopColor={chartColor.end} />
        </linearGradient>
        <linearGradient id={`${gradientId}-fill`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={chartColor.end} stopOpacity="0.24" />
          <stop offset="100%" stopColor={chartColor.start} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="9" y="10" width="222" height="70" rx="16" fill="rgba(255,255,255,0.02)" />
      {[1, 2, 3].map((index) => (
        <line
          key={index}
          x1="9"
          x2="231"
          y1={10 + (index * 70) / 4}
          y2={10 + (index * 70) / 4}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path
        d={`${path} L 231 78 L 9 78 Z`}
        fill={`url(#${gradientId}-fill)`}
        opacity="0.75"
      />
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId}-line)`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.14"
      />
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId}-line)`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="chart-path"
      />
      {rawPoints.map((point, index) => {
        const x = (index / Math.max(rawPoints.length - 1, 1)) * 222 + 9;
        const normalized = max === min ? 0.5 : (point.value - min) / Math.max(max - min, 1);
        const y = 90 - 12 - normalized * 70;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4.5"
            fill={chartColor.end}
            stroke={chartColor.end}
            strokeWidth="1"
            opacity="0.95"
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        );
      })}
    </svg>
  );
};

const buildSubjectProgressPoints = (completedLessons = 0) => {
  const lessons = Number.isFinite(completedLessons) ? Math.max(0, completedLessons) : 0;

  if (lessons === 0) {
    return [{ lesson: 0, progress: 0 }];
  }

  return Array.from({ length: lessons }, (_, index) => ({
    lesson: index + 1,
    progress: index + 1,
  }));
};

const SubjectTrend = ({ completedLessons = 0, completion = null, totalLessons = 0, gradientId = "subject-gradient", color = { start: "#8f7bff", end: "#5b6cff" } }) => {
  const points = buildSubjectProgressPoints(completedLessons);
  const chartPoints = points;
  const computedPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : null;
  const displayValue = chartPoints.length
    ? typeof completion === 'number' && completion > 0
      ? completion
      : computedPercent !== null && computedPercent > 0
        ? computedPercent
        : null
    : null;
  const axisLabels = chartPoints.length > 1
    ? [
      chartPoints[0].label || `Lesson ${chartPoints[0].lesson}`,
      chartPoints[chartPoints.length - 1].label || `Lesson ${chartPoints[chartPoints.length - 1].lesson}`,
    ]
    : chartPoints.length === 1
      ? [chartPoints[0].label || `Lesson ${chartPoints[0].lesson}`]
      : [];

  return (
    <div className="subject-trend-card">
      <div className="subject-trend-chart-header">
        <div className="subject-trend-label">Progress line</div>
        <div className="subject-trend-value">{displayValue !== null ? `${displayValue}%` : "—"}</div>
      </div>
      <div className="subject-trend-chart">
        <MiniLineChart
          points={chartPoints}
          color={color}
          label="Subject progress"
          gradientId={gradientId}
          maxScale={100}
        />
      </div>
      <div className="subject-date-axis subject-date-axis--spread">
        {axisLabels.length ? (
          axisLabels.map((date, index) => (
            <span key={`${date}-${index}`} className="subject-date-label subject-date-label--small">
              {date}
            </span>
          ))
        ) : (
          <span className="subject-date-label subject-date-label--small">Start learning to build progress history</span>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token, logout, updateUser } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    college: user?.college || "",
    year: user?.year || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");

  const email = user?.email || "";

  useEffect(() => {
    if (!token || !email) return;

    const source = axios.CancelToken.source();
    setLoading(true);
    setError("");

    axios
      .get(`${API_BASE_URL}/api/analytics/${encodeURIComponent(email)}`, {
        cancelToken: source.token,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAnalytics(response.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err.response?.data?.message || "Failed to load dashboard data.");
        }
      })
      .finally(() => setLoading(false));

    return () => source.cancel();
  }, [email, token]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProfileForm({
      username: user?.username || "",
      college: user?.college || "",
      year: user?.year || "",
      bio: user?.bio || "",
      avatarUrl: user?.avatarUrl || "",
    });
    setAvatarPreview(user?.avatarUrl || "");
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const persistAvatar = async (avatarUrl) => {
    if (!token) return;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        { avatarUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.user) {
        updateUser(response.data.user);
        setAnalytics((prev) =>
          prev
            ? { ...prev, profile: { ...prev.profile, ...response.data.user } }
            : prev
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save avatar.");
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024;
    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setError("Avatar must be under 2MB");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result;
      setAvatarPreview(result);
      setProfileForm((prev) => ({ ...prev, avatarUrl: result }));
      await persistAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        profileForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.user) {
        updateUser(response.data.user);
        setAnalytics((prev) =>
          prev
            ? { ...prev, profile: { ...prev.profile, ...response.data.user } }
            : prev
        );
      }
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const metrics = useMemo(() => {
    const stats = analytics?.stats || {};
    return [
      {
        label: "Lessons Completed",
        value: formatNumber(stats.lessonsCompleted),
        icon: <BookOpen />,
      },
      {
        label: "Subjects Active",
        value: formatNumber(analytics?.subjects.length || 0),
        icon: <LayoutDashboard />,
      },
      {
        label: "Accuracy",
        value: `${stats.averageScore || 0}%`,
        icon: <Sparkles />,
      },
      {
        label: "Total Points",
        value: formatNumber(stats.totalPoints),
        icon: <Wand2 />,
      },
      {
        label: "Learning Streak",
        value: formatNumber(stats.streak),
        icon: <UserCircle />,
      },
    ];
  }, [analytics]);

  const subjectCards = useMemo(() => {
    return analytics?.subjects?.map((subject) => {
      const completed = subject.completedLessons || 0;
      const total = subject.totalLessons || subject.completedLessons || 0;
      const completionValue = Math.max(0, completed);

      return {
        title: subject.subject,
        completion: completionValue,
        averageScore: subject.averageScore || 0,
        lessons: completed,
        totalLessons: total,
        history: subject.history || [],
        streak: subject.streak || 0,
        lastActivity: subject.lastActivity || null,
      };
    }) || [];
  }, [analytics]);

  const maxSubjectLessons = useMemo(() => {
    const values = analytics?.subjects?.map((item) => item.completedLessons || 0) || [];
    return Math.max(1, ...values);
  }, [analytics]);

  const timelineData = useMemo(() => {
    const rawPoints = analytics?.analytics?.timelines?.points || [];
    const points = buildGrowthTimeline(rawPoints);
    const statsTotalPoints = Number.isFinite(analytics?.stats?.totalPoints) ? analytics.stats.totalPoints : 0;

    const cappedPoints = points.map((point) => ({
      ...point,
      value: Math.min(point.value, statsTotalPoints),
    }));

    let adjustedPoints;

    if (cappedPoints.length) {
      if (cappedPoints[0].value === statsTotalPoints) {
        adjustedPoints = cappedPoints;
      } else {
        adjustedPoints = [
          ...cappedPoints,
          {
            date: analytics?.stats?.lastUpdated || new Date().toISOString(),
            value: statsTotalPoints,
            lessonsCompleted: cappedPoints[cappedPoints.length - 1]?.lessonsCompleted || 0,
            label: analytics?.stats?.lastUpdated
              ? formatShortDate(analytics.stats.lastUpdated)
              : 'Now',
          },
        ];
      }
    } else if (statsTotalPoints > 0) {
      adjustedPoints = [
        {
          date: analytics?.stats?.lastUpdated || new Date().toISOString(),
          value: statsTotalPoints,
          lessonsCompleted: 0,
          label: analytics?.stats?.lastUpdated
            ? formatShortDate(analytics.stats.lastUpdated)
            : 'Now',
        },
      ];
    } else {
      adjustedPoints = [];
    }

    const finalValue = statsTotalPoints;
    const firstValue = adjustedPoints[0]?.value || 0;
    const growthPercent = firstValue > 0 ? Math.round(((finalValue - firstValue) / firstValue) * 100) : 0;

    return {
      points: adjustedPoints,
      totalPoints: finalValue,
      growthPercent,
      lastActive: analytics?.stats?.lastUpdated || adjustedPoints[adjustedPoints.length - 1]?.date || null,
      spanLabel: formatGrowthSpan(adjustedPoints),
    };
  }, [analytics]);

  if (!user) {
    return (
      <section className="dashboard-shell">
        <div className="dashboard-empty">
          <h2>Sign in to view your analytics dashboard</h2>
        </div>
      </section>
    );
  }

  return (

    <section className="dashboard-shell">
      <header className="dashboard-hero">
        <div>
          <p className="dashboard-subtitle">Welcome back</p>
          <h1>Hi, {user.username || user.email}</h1>
        </div>
      </header>

      {loading ? (
        <div className="dashboard-loading">Loading analytics...</div>
      ) : error ? (
        <div className="dashboard-error">{error}</div>
      ) : (
        <>
          <div className="dashboard-grid">
            <aside className="profile-panel glass-card">
              <div className="profile-avatar-wrap">
                <img
                  className="profile-avatar"
                  src={avatarPreview ||
                    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=256&q=80"}
                  alt="Profile avatar"
                />
                <label className="avatar-upload-button">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>

              <div className="profile-meta">
                <div className="profile-name">
                  <UserCircle size={20} />
                  <span>{analytics?.profile?.username || user.username}</span>
                </div>
                <p className="profile-text">{analytics?.profile?.bio || "A focused learner building real skills."}</p>
              </div>

              <div className="profile-stats">
                <div>
                  <span>{formatNumber(analytics?.subjects?.length || 0)}</span>
                  <small>Topics</small>
                </div>
                <div>
                  <span>{getLevel(analytics?.stats?.totalPoints)}</span>
                  <small>Rank</small>
                </div>
              </div>

              <div className="profile-details">
                <div>
                  <span>Joined</span>
                  <strong>{analytics?.profile?.joinedAt ? new Date(analytics.profile.joinedAt).toLocaleDateString() : "—"}</strong>
                </div>
                <div className="profile-details-row">
                  <div>
                    <span>Streak</span>
                    <strong>{formatNumber(analytics?.stats?.streak)}</strong>
                  </div>
                  <div className="profile-clock">
                    <span>Clock</span>
                    <strong>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</strong>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="ghost-button" onClick={() => setEditMode((prev) => !prev)}>
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  className="primary-button"
                  onClick={handleSaveProfile}
                  disabled={!editMode || saving}
                >
                  {saving ? "Saving..." : "Save profile"}
                </button>
              </div>

              {editMode && (
                <div className="profile-form">
                  <label>
                    Name
                    <input
                      value={profileForm.username}
                      onChange={handleInputChange("username")}
                      placeholder="Username"
                    />
                  </label>
                  <label>
                    Bio
                    <textarea
                      value={profileForm.bio}
                      onChange={handleInputChange("bio")}
                      placeholder="A short bio"
                    />
                  </label>
                  <div className="profile-row">
                    <label>
                      College
                      <input
                        value={profileForm.college}
                        onChange={handleInputChange("college")}
                        placeholder="College"
                      />
                    </label>
                    <label>
                      Year
                      <input
                        value={profileForm.year}
                        onChange={handleInputChange("year")}
                        placeholder="Year"
                      />
                    </label>
                  </div>
                </div>
              )}
            </aside>

            <main className="dashboard-main">
              <div className="stats-grid">
                {metrics.map((item) => (
                  <article key={item.label} className="stat-card glass-card">
                    <div className="stat-icon">{item.icon}</div>
                    <div>
                      <p className="stat-value">{item.value}</p>
                      <p className="stat-label">{item.label}</p>
                    </div>
                  </article>
                ))}
              </div>

              <section className="analytics-section glass-card">
                <div className="section-header">
                  <div>
                    <p className="section-overline">Performance Snapshot</p>
                    <h2>Global analytics</h2>
                  </div>
                  <span>{analytics?.stats?.lastUpdated ? new Date(analytics.stats.lastUpdated).toLocaleDateString() : "Updated recently"}</span>
                </div>

                <div className="charts-grid">
                  <div className="chart-panel growth-card">
                    <div className="chart-panel-header">
                      <div>
                        <p className="growth-header-title">Points Growth</p>
                        <p className="growth-header-subtitle">{timelineData.spanLabel}</p>
                      </div>
                      <div className="growth-header-values">
                        <div>
                          <span className="growth-main-value">{formatNumber(timelineData.totalPoints)}</span>
                          <small>Total points</small>
                        </div>
                        <div>
                          <span className="growth-secondary-value">{timelineData.growthPercent >= 0 ? `+${timelineData.growthPercent}%` : `${timelineData.growthPercent}%`}</span>
                          <small>Growth</small>
                        </div>
                        <div>
                          <span className="growth-secondary-value">{timelineData.lastActive ? formatShortDate(timelineData.lastActive) : '—'}</span>
                          <small>Last active</small>
                        </div>
                      </div>
                    </div>
                    <GrowthLineChart
                      points={timelineData.points}
                      color={{ start: '#f8b4d8', end: '#b67cff' }}
                    />
                  </div>
                  <div className="chart-panel heatmap-card">
                    <div className="chart-panel-header">
                      <span>Activity Heatmap</span>
                    </div>
                    <HeatmapCalendar
                      events={analytics?.analytics?.timelines?.points || []}
                      streak={analytics?.stats?.streak || 0}
                      weeks={32}
                    />
                  </div>
                </div>
              </section>

              <section className="subjects-section">
                <div className="section-title-row">
                  <div>
                    <p className="section-overline">Subject breakdown</p>
                    <h2>Active topics</h2>
                  </div>
                  <button onClick={() => navigate("/lessons")} className="ghost-button">
                    Explore lessons <ArrowRight size={16} />
                  </button>
                </div>

                <div className="subject-grid">
                  {subjectCards.length ? (
                    subjectCards.map((subject) => (
                      <article key={subject.title} className="subject-card glass-card">
                        <div className="subject-header">
                          <div>
                            <p>{subject.title}</p>
                            <small>{subject.lessons} lessons completed</small>
                          </div>
                          <div className="subject-score">
                            {subject.completion > 0 ? `${subject.completion}%` : "—"}
                          </div>
                        </div>
                        <div className="subject-meta-row">
                          <span>Last active: {subject.lastActivity ? formatShortDate(subject.lastActivity) : "—"}</span>
                        </div>
                        <SubjectTrend
                          completedLessons={subject.lessons}
                          completion={subject.completion}
                          totalLessons={subject.totalLessons}
                          gradientId={`subject-${subject.title.toLowerCase().replace(/\s+/g, '-')}`}
                          color={getSubjectGradient(subject.title)}
                        />
                      </article>
                    ))
                  ) : (
                    <div className="empty-state-card">
                      <h3>No subject activity yet</h3>
                      <p>Complete your first lesson to populate the topic charts.</p>
                      <button className="primary-button" onClick={() => navigate("/lessons")}>Start learning</button>
                    </div>
                  )}
                </div>
              </section>
            </main>
          </div>

          {analytics && analytics.subjects.length === 0 && (
            <div className="dashboard-empty-state glass-card">
              <h3>No progress history yet</h3>
              <p>As you complete lessons, your analytics will appear here in real time.</p>
              <button className="primary-button" onClick={() => navigate("/lessons")}>Go to lessons</button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default Dashboard;