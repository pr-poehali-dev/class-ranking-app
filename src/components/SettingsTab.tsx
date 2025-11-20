import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function SettingsTab() {
  return (
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
  );
}
