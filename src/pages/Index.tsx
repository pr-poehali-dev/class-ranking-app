import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RatingTab from '@/components/RatingTab';
import StudentsTab from '@/components/StudentsTab';
import StatsTab from '@/components/StatsTab';
import SettingsTab from '@/components/SettingsTab';

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

  const totalClassPoints = students.reduce((sum, s) => sum + s.totalPoints, 0);
  const avgPoints = students.length > 0 ? Math.round(totalClassPoints / students.length) : 0;

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
            <RatingTab 
              students={students} 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <StudentsTab students={students} onAddPoints={addPoints} />
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <StatsTab students={students} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
