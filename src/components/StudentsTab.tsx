import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface StudentsTabProps {
  students: Student[];
  onAddPoints: (studentId: number, category: 'academic' | 'activity', points: number) => void;
}

export default function StudentsTab({ students, onAddPoints }: StudentsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student, index) => (
        <Card key={student.id} className="hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="text-5xl">{student.avatar}</div>
              <div className="flex-1">
                <CardTitle className="text-lg">{student.name}</CardTitle>
                <div className="flex gap-1 mt-1">
                  {student.achievements.map((ach, i) => (
                    <span key={i} className="text-xl">{ach}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Всего баллов</span>
              <Badge variant="secondary" className="text-lg font-bold">
                {student.totalPoints}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={14} />
                  Успеваемость
                </span>
                <span className="font-semibold">{student.academicPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Icon name="Zap" size={14} />
                  Активность
                </span>
                <span className="font-semibold">{student.activityPoints}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onAddPoints(student.id, 'academic', 10)}
              >
                <Icon name="Plus" size={14} className="mr-1" />
                Успеваемость
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onAddPoints(student.id, 'activity', 5)}
              >
                <Icon name="Plus" size={14} className="mr-1" />
                Активность
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
