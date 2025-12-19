import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Plus, 
  CheckCircle, 
  TrendingUp, 
  Footprints,
  Droplet,
  Moon,
  Activity,
  Heart,
  Apple,
  Pill
} from 'lucide-react';

export const PatientGoals = () => {
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      type: 'steps', 
      target: 10000, 
      current: 6500, 
      unit: 'steps',
      icon: Footprints,
      color: 'text-blue-600'
    },
    { 
      id: 2, 
      type: 'water', 
      target: 8, 
      current: 4, 
      unit: 'glasses',
      icon: Droplet,
      color: 'text-blue-400'
    },
    { 
      id: 3, 
      type: 'sleep', 
      target: 8, 
      current: 7, 
      unit: 'hours',
      icon: Moon,
      color: 'text-indigo-600'
    },
    { 
      id: 4, 
      type: 'exercise', 
      target: 1, 
      current: 0, 
      unit: 'sessions',
      icon: Activity,
      color: 'text-green-600'
    }
  ]);

  const weeklyStats = [
    { day: 'Mon', steps: 8500, water: 6, sleep: 7.5, exercise: 1 },
    { day: 'Tue', steps: 9200, water: 8, sleep: 8, exercise: 1 },
    { day: 'Wed', steps: 7800, water: 5, sleep: 6.5, exercise: 0 },
    { day: 'Thu', steps: 10500, water: 7, sleep: 7, exercise: 1 },
    { day: 'Fri', steps: 6500, water: 4, sleep: 7, exercise: 0 },
    { day: 'Sat', steps: 12000, water: 8, sleep: 8.5, exercise: 2 },
    { day: 'Sun', steps: 9800, water: 7, sleep: 8, exercise: 1 }
  ];

  const goalTypes = [
    { type: 'steps', label: 'Daily Steps', icon: Footprints, unit: 'steps', defaultTarget: 10000 },
    { type: 'water', label: 'Water Intake', icon: Droplet, unit: 'glasses', defaultTarget: 8 },
    { type: 'sleep', label: 'Sleep Duration', icon: Moon, unit: 'hours', defaultTarget: 8 },
    { type: 'exercise', label: 'Exercise Sessions', icon: Activity, unit: 'sessions', defaultTarget: 1 },
    { type: 'meditation', label: 'Meditation', icon: Heart, unit: 'minutes', defaultTarget: 20 },
    { type: 'fruits', label: 'Fruit Servings', icon: Apple, unit: 'servings', defaultTarget: 3 },
    { type: 'medication', label: 'Medication', icon: Pill, unit: 'doses', defaultTarget: 2 }
  ];

  const updateGoal = (goalId: number, newValue: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === goalId 
          ? { ...goal, current: Math.min(newValue, goal.target) }
          : goal
      )
    );
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const GoalCard = ({ goal }: { goal: any }) => {
    const progress = getProgress(goal.current, goal.target);
    const isComplete = goal.current >= goal.target;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <goal.icon className={`h-8 w-8 ${goal.color} mr-3`} />
              <div>
                <h3 className="font-semibold text-gray-900 capitalize">{goal.type}</h3>
                <p className="text-sm text-gray-600">
                  {goal.current} / {goal.target} {goal.unit}
                </p>
              </div>
            </div>
            {isComplete && <CheckCircle className="h-6 w-6 text-green-500" />}
          </div>

          <div className="space-y-3">
            <Progress value={progress} className="w-full h-3" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}% Complete
              </span>
              <Badge variant={isComplete ? 'default' : 'secondary'}>
                {isComplete ? 'Completed' : 'In Progress'}
              </Badge>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateGoal(goal.id, goal.current - 1)}
                disabled={goal.current <= 0}
              >
                -
              </Button>
              <Input 
                type="number"
                value={goal.current}
                onChange={(e) => updateGoal(goal.id, parseInt(e.target.value) || 0)}
                className="text-center"
                min="0"
                max={goal.target}
              />
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateGoal(goal.id, goal.current + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const WeeklyChart = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Weekly Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weeklyStats.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium text-gray-600 mb-2">{day.day}</div>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-gray-600">Steps</div>
                      <div className="font-bold text-sm">{day.steps.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-gray-600">Water</div>
                      <div className="font-bold text-sm">{day.water} glasses</div>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <div className="text-xs text-gray-600">Sleep</div>
                      <div className="font-bold text-sm">{day.sleep}h</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Footprints className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Steps/Day</p>
                  <p className="text-2xl font-bold">9,186</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Droplet className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Water/Day</p>
                  <p className="text-2xl font-bold">6.4 glasses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Moon className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Sleep/Night</p>
                  <p className="text-2xl font-bold">7.3 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Exercise Days</p>
                  <p className="text-2xl font-bold">5/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const AddGoalForm = () => {
    const [newGoal, setNewGoal] = useState({
      type: '',
      target: 0,
      unit: ''
    });

    const handleGoalTypeChange = (type: string) => {
      const goalType = goalTypes.find(gt => gt.type === type);
      if (goalType) {
        setNewGoal({
          type: goalType.type,
          target: goalType.defaultTarget,
          unit: goalType.unit
        });
      }
    };

    const handleAddGoal = (e: React.FormEvent) => {
      e.preventDefault();
      if (newGoal.type && newGoal.target > 0) {
        const goalType = goalTypes.find(gt => gt.type === newGoal.type);
        const newGoalData = {
          id: goals.length + 1,
          type: newGoal.type,
          target: newGoal.target,
          current: 0,
          unit: newGoal.unit,
          icon: goalType?.icon || Target,
          color: 'text-purple-600'
        };
        setGoals([...goals, newGoalData]);
        setNewGoal({ type: '', target: 0, unit: '' });
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <Label>Goal Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {goalTypes.map((goalType) => (
                  <button
                    key={goalType.type}
                    type="button"
                    onClick={() => handleGoalTypeChange(goalType.type)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      newGoal.type === goalType.type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <goalType.icon className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{goalType.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {newGoal.type && (
              <div>
                <Label htmlFor="target">Daily Target</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="target"
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 0})}
                    min="1"
                    required
                  />
                  <span className="text-gray-600">{newGoal.unit}</span>
                </div>
              </div>
            )}

            <Button type="submit" disabled={!newGoal.type || newGoal.target <= 0} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Health Goals</h1>
        <p className="text-gray-600 mt-2">
          Track your daily wellness goals and monitor your progress over time
        </p>
      </div>

      {/* Goals Tabs */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Today's Goals</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Weekly Stats</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Goal</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklyChart />
        </TabsContent>

        <TabsContent value="add">
          <AddGoalForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};