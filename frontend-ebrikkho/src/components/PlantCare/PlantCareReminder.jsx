import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReminder,
  updateReminder,
  deleteReminder,
  toggleReminderComplete,
} from "../../redux/slices/reminderSlice";
import { Calendar, Clock, Check, Trash2, Edit2, Plus } from "lucide-react";

const PlantCareReminder = ({ plantId, plantName }) => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) =>
    state.reminders.filter((reminder) => reminder.plantId === plantId)
  );

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    frequency: "once", // once, daily, weekly, monthly
  });
  const [editingReminder, setEditingReminder] = useState(null);

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (editingReminder) {
      dispatch(
        updateReminder({
          ...editingReminder,
          ...newReminder,
          plantId,
          plantName,
        })
      );
      setEditingReminder(null);
    } else {
      dispatch(
        addReminder({
          ...newReminder,
          plantId,
          plantName,
          completed: false,
          createdAt: new Date().toISOString(),
        })
      );
    }
    setIsAddingReminder(false);
    setNewReminder({
      title: "",
      description: "",
      date: "",
      time: "",
      frequency: "once",
    });
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    setNewReminder({
      title: reminder.title,
      description: reminder.description,
      date: reminder.date,
      time: reminder.time,
      frequency: reminder.frequency,
    });
    setIsAddingReminder(true);
  };

  const handleDeleteReminder = (reminderId) => {
    dispatch(deleteReminder(reminderId));
  };

  const handleToggleComplete = (reminderId) => {
    dispatch(toggleReminderComplete(reminderId));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Care Reminders</h3>
        <button
          onClick={() => setIsAddingReminder(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Add Reminder
        </button>
      </div>

      {isAddingReminder && (
        <form onSubmit={handleAddReminder} className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newReminder.title}
              onChange={(e) =>
                setNewReminder({ ...newReminder, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newReminder.description}
              onChange={(e) =>
                setNewReminder({ ...newReminder, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newReminder.date}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) =>
                  setNewReminder({ ...newReminder, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={newReminder.frequency}
              onChange={(e) =>
                setNewReminder({ ...newReminder, frequency: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAddingReminder(false);
                setEditingReminder(null);
                setNewReminder({
                  title: "",
                  description: "",
                  date: "",
                  time: "",
                  frequency: "once",
                });
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingReminder ? "Update Reminder" : "Add Reminder"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 border rounded-lg ${
              reminder.completed ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4
                  className={`text-lg font-medium ${
                    reminder.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {reminder.title}
                </h4>
                {reminder.description && (
                  <p className="text-gray-600 mt-1">{reminder.description}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{reminder.time}</span>
                  </div>
                  <span className="capitalize">{reminder.frequency}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleComplete(reminder.id)}
                  className={`p-2 rounded-full ${
                    reminder.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  } hover:bg-green-200 transition-colors`}
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => handleEditReminder(reminder)}
                  className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {reminders.length === 0 && !isAddingReminder && (
          <p className="text-center text-gray-500 py-4">
            No reminders set for this plant yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlantCareReminder;
