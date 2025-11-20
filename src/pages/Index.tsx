import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Анна Соколова',
    avatar: '👩‍🎓',
    totalPoints: 485,
    academicPoints: 320,
    activityPoints: 165,
    achievements: ['🏆', '⭐', '🎯'],
    rank: 1,
  },
  {
    id: 2,
    name: 'Максим Петров',
    avatar: '👨‍🎓',
    totalPoints: 462,
    academicPoints: 305,
    activityPoints: 157,
    achievements: ['⭐', '🎯'],
    rank: 2,
  },
  {
    id: 3,
    name: 'Мария Иванова',
    avatar: '👧',
    totalPoints: 441,
    academicPoints: 290,
    activityPoints: 151,
    achievements: ['🏆', '⭐'],
    rank: 3,
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    avatar: '👦',
    totalPoints: 398,
    academicPoints: 265,
    activityPoints: 133,
    achievements: ['🎯'],
    rank: 4,
  },
  {
    id: 5,
    name: 'София Лебедева',
    avatar: '👩',
    totalPoints: 376,
    academicPoints: 245,
    activityPoints: 131,
    achievements: ['⭐'],
    rank: 5,
  },
];

export default function Index() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: '', avatar: '👤' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'activity'>('all');

  const addStudent = () => {
    if (newStudent.name.trim()) {
      const student: Student = {
        id: students.length + 1,
        name: newStudent.name,
        avatar: newStudent.avatar,
        totalPoints: 0,
        academicPoints: 0,
        activityPoints: 0,
        achievements: [],
        rank: students.length + 1,
      };
      setStudents([...students, student]);
      setNewStudent({ name: '', avatar: '👤' });
      setIsDialogOpen(false);
    }
  };

  const addPoints = (studentId: number, category: 'academic' | 'activity', points: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const updated = {
            ...student,
            [category === 'academic' ? 'academicPoints' : 'activityPoints']:
              student[category === 'academic' ? 'academicPoints' : 'activityPoints'] + points,
          };
          updated.totalPoints = updated.academicPoints + updated.activityPoints;
          return updated;
        }
        return student;
      })
    );
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (selectedCategory === 'academic') return b.academicPoints - a.academicPoints;
    if (selectedCategory === 'activity') return b.activityPoints - a.activityPoints;
    return b.totalPoints - a.totalPoints;
  });

  const totalClassPoints = students.reduce((sum, s) => sum + s.totalPoints, 0);
  const avgPoints = students.length > 0 ? Math.round(totalClassPoints / students.length) : 0;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Рейтинг класса
            </h1>
            <p className="text-muted-foreground mt-2">Отслеживайте успехи и достижения учеников</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Icon name="UserPlus" className="mr-2" size={20} />
                Добавить ученика
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый ученик</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Введите имя ученика"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Аватар</Label>
                  <Select value={newStudent.avatar} onValueChange={(value) => setNewStudent({ ...newStudent, avatar: value })}>
                    <SelectTrigger id="avatar">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="👤">👤 По умолчанию</SelectItem>
                      <SelectItem value="👨‍🎓">👨‍🎓 Студент</SelectItem>
                      <SelectItem value="👩‍🎓">👩‍🎓 Студентка</SelectItem>
                      <SelectItem value="👦">👦 Мальчик</SelectItem>
                      <SelectItem value="👧">👧 Девочка</SelectItem>
                      <SelectItem value="👨">👨 Парень</SelectItem>
                      <SelectItem value="👩">👩 Девушка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addStudent} className="w-full">Добавить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего учеников</CardTitle>
              <Icon name="Users" className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Общие баллы</CardTitle>
              <Icon name="Trophy" className="text-secondary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalClassPoints}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Средний балл</CardTitle>
              <Icon name="TrendingUp" className="text-accent" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgPoints}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rating" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="rating" className="gap-2">
              <Icon name="Award" size={16} />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Icon name="Users" size={16} />
              Ученики
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rating" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Топ учеников</CardTitle>
                  <Select value={selectedCategory} onValueChange={(v: any) => setSelectedCategory(v)}>
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
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
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
                        onClick={() => addPoints(student.id, 'academic', 10)}
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        Успеваемость
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => addPoints(student.id, 'activity', 5)}
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        Активность
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки начисления баллов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon name="BookOpen" className="text-primary" size={20} />
                      Успеваемость
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Отличная оценка: +10 баллов</li>
                      <li>• Хорошая оценка: +7 баллов</li>
                      <li>• Контрольная работа: +15 баллов</li>
                      <li>• Домашнее задание: +5 баллов</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon name="Zap" className="text-accent" size={20} />
                      Активность
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Участие в мероприятии: +5 баллов</li>
                      <li>• Помощь одноклассникам: +3 балла</li>
                      <li>• Дежурство по классу: +2 балла</li>
                      <li>• Творческий проект: +8 баллов</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" className="text-primary mt-0.5" size={20} />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Система достижений</p>
                      <p>🏆 Получите за 1 место в рейтинге</p>
                      <p>⭐ Получите за 300+ баллов</p>
                      <p>🎯 Получите за активное участие</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
