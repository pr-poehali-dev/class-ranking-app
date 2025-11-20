import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Student {
  id: number;
  name: string;
  avatar: string;
  totalPoints: number;
  academicPoints: number;
  activityPoints: number;
  achievements: string[];
  rank: number;
}

interface RatingTabProps {
  students: Student[];
  selectedCategory: 'all' | 'academic' | 'activity';
  onCategoryChange: (category: 'all' | 'academic' | 'activity') => void;
}

const getRankColor = (rank: number) => {
  if (rank === 1) return 'from-yellow-400 to-yellow-600';
  if (rank === 2) return 'from-gray-300 to-gray-500';
  if (rank === 3) return 'from-orange-400 to-orange-600';
  return 'from-purple-400 to-purple-600';
};

const getRankIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '🎖️';
};

export default function RatingTab({ students, selectedCategory, onCategoryChange }: RatingTabProps) {
  const sortedStudents = [...students].sort((a, b) => {
    if (selectedCategory === 'academic') return b.academicPoints - a.academicPoints;
    if (selectedCategory === 'activity') return b.activityPoints - a.activityPoints;
    return b.totalPoints - a.totalPoints;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Топ учеников</CardTitle>
          <Select value={selectedCategory} onValueChange={(v: any) => onCategoryChange(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все баллы</SelectItem>
              <SelectItem value="academic">Успеваемость</SelectItem>
              <SelectItem value="activity">Активность</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedStudents.map((student, index) => (
          <div
            key={student.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r hover:shadow-md transition-all animate-scale-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              backgroundImage: `linear-gradient(to right, hsl(var(--muted)), transparent)`,
            }}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(index + 1)} text-white text-2xl font-bold shadow-lg`}>
              {getRankIcon(index + 1)}
            </div>
            <div className="text-4xl">{student.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <div className="flex gap-1">
                  {student.achievements.map((ach, i) => (
                    <span key={i} className="text-lg">{ach}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={14} />
                  {student.academicPoints}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Zap" size={14} />
                  {student.activityPoints}
                </span>
              </div>
              <Progress
                value={(student.totalPoints / 500) * 100}
                className="mt-2 h-2"
              />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {selectedCategory === 'academic'
                  ? student.academicPoints
                  : selectedCategory === 'activity'
                  ? student.activityPoints
                  : student.totalPoints}
              </div>
              <p className="text-xs text-muted-foreground">баллов</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
