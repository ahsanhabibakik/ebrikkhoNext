import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReminder,
  updateReminder,
  deleteReminder,
  toggleReminderComplete,
} from "../../redux/slices/reminderSlice";
import { Calendar, Clock, Edit2, Trash2, Check, X } from "lucide-react";

const PlantCareReminders = ({ plantId }) => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) =>
    state.reminders.reminders.filter((reminder) => reminder.plantId === plantId)
  );

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    frequency: "once",
  });

  const [editingReminder, setEditingReminder] = useState(null);

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (newReminder.title && newReminder.date) {
      dispatch(
        addReminder({
          ...newReminder,
          plantId,
          completed: false,
        })
      );
      setNewReminder({
        title: "",
        description: "",
        date: "",
        time: "",
        frequency: "once",
      });
    }
  };

  const handleUpdateReminder = (e) => {
    e.preventDefault();
    if (editingReminder.title && editingReminder.date) {
      dispatch(updateReminder(editingReminder));
      setEditingReminder(null);
    }
  };

  const handleDeleteReminder = (reminderId) => {
    dispatch(deleteReminder(reminderId));
  };

  const handleToggleComplete = (reminderId) => {
    dispatch(toggleReminderComplete(reminderId));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Plant Care Reminders</h3>

      {/* Add New Reminder Form */}
      <form onSubmit={handleAddReminder} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Reminder Title"
            value={newReminder.title}
            onChange={(e) =>
              setNewReminder({ ...newReminder, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description (optional)"
            value={newReminder.description}
            onChange={(e) =>
              setNewReminder({ ...newReminder, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="date"
              value={newReminder.date}
              onChange={(e) =>
                setNewReminder({ ...newReminder, date: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) =>
                setNewReminder({ ...newReminder, time: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <select
            value={newReminder.frequency}
            onChange={(e) =>
              setNewReminder({ ...newReminder, frequency: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Reminder
        </button>
      </form>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 border rounded ${
              reminder.completed ? "bg-gray-50" : "bg-white"
            }`}
          >
            {editingReminder?.id === reminder.id ? (
              <form onSubmit={handleUpdateReminder} className="space-y-4">
                <input
                  type="text"
                  value={editingReminder.title}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={editingReminder.description}
                  onChange={(e) =>
                    setEditingReminder({
                      ...editingReminder,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={editingReminder.date}
                    onChange={(e) =>
                      setEditingReminder({
                        ...editingReminder,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="time"
                    value={editingReminder.time}
                    onChange={(e) =>
                      setEditingReminder({
                        ...editingReminder,
                        time: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingReminder(null)}
                    className="p-2 text-gray-600 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                  <button
                    type="submit"
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h4
                      className={`font-medium ${
                        reminder.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {reminder.title}
                    </h4>
                    {reminder.description && (
                      <p className="text-gray-600 mt-1">
                        {reminder.description}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleComplete(reminder.id)}
                      className={`p-2 rounded ${
                        reminder.completed
                          ? "bg-gray-200 text-gray-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setEditingReminder(reminder)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(reminder.date).toLocaleDateString()}
                  </div>
                  {reminder.time && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {reminder.time}
                    </div>
                  )}
                  <div className="capitalize">{reminder.frequency}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCareReminders;
