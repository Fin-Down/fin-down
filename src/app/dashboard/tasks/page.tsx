'use client'
import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trash2, Plus, Loader2 } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Отслеживание состояния аутентификации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Загрузка задач при изменении пользователя
  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, 'tasks');
        const q = query(
          tasksRef,
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as Task[];
        
        setTasks(tasksData);
        setError('');
      } catch (err) {
        console.error("Error loading tasks:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUser]);

  const addTask = async () => {
    if (!newTask.trim() || !currentUser) return;
    
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        text: newTask,
        completed: false,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      
      setTasks([{
        id: docRef.id,
        text: newTask,
        completed: false,
        userId: currentUser.uid,
        createdAt: new Date()
      }, ...tasks]);
      setNewTask('');
      setError('');
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (!taskToUpdate) return;
      
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !taskToUpdate.completed
      });
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task status.");
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task.");
    }
  };

  if (!currentUser && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Please sign in</h2>
          <p className="text-gray-600">You need to sign in to access your tasks.</p>
          <button 
            // onClick={() => auth.signInWithPopup(new auth.GoogleAuthProvider())}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
       
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}
      
      <div className="flex mb-6 sticky top-0 bg-white py-2 z-10">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          disabled={isAdding}
        />
        <button
          onClick={addTask}
          disabled={!newTask.trim() || isAdding}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
        >
          {isAdding ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <Plus size={20} />
          )}
        </button>
      </div>
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Circle className="mx-auto h-12 w-12" strokeWidth={1} />
            </div>
            <h3 className="text-lg font-medium text-gray-500">No tasks yet</h3>
            <p className="text-gray-400">Add your first task above</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`flex items-center p-4 border rounded-lg transition ${
                task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
              }`}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                className="mr-3 text-gray-400 hover:text-green-500 transition"
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.completed ? (
                  <CheckCircle size={24} className="text-green-500" />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              
              <span 
                className={`flex-1 text-left break-words ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.text}
              </span>
              
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-2 text-gray-400 hover:text-red-500 transition p-1"
                aria-label="Delete task"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}