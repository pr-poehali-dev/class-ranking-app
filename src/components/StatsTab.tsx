import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

interface StatsTabProps {
  students: Student[];
}

export default function StatsTab({ students }: StatsTabProps) {
  const totalClassPoints = students.reduce((sum, s) => sum + s.totalPoints, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Распределение баллов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {students
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .slice(0, 5)
            .map((student) => (
              <div key={student.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{student.avatar}</span>
                    {student.name}
                  </span>
                  <span className="font-bold">{student.totalPoints}</span>
                </div>
                <Progress value={(student.totalPoints / 500) * 100} className="h-3" />
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Категории баллов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon name="BookOpen" size={16} className="text-primary" />
                Успеваемость
              </span>
              <span className="font-bold">
                {students.reduce((sum, s) => sum + s.academicPoints, 0)}
              </span>
            </div>
            <Progress
              value={(students.reduce((sum, s) => sum + s.academicPoints, 0) / totalClassPoints) * 100}
              className="h-4"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon name="Zap" size={16} className="text-accent" />
                Активность
              </span>
              <span className="font-bold">
                {students.reduce((sum, s) => sum + s.activityPoints, 0)}
              </span>
            </div>
            <Progress
              value={(students.reduce((sum, s) => sum + s.activityPoints, 0) / totalClassPoints) * 100}
              className="h-4"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
