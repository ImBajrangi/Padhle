import 'package:flutter/material.dart';

class MockData {
  // Global User Stats
  static const int userStreak = 12;
  static const int userXP = 4550;
  static const int userLevel = 15;
  static const double dailyGoalProgress = 0.75;

  // Subjects & Progress
  static const List<Map<String, dynamic>> subjects = [
    {
      'name': 'Physics',
      'progress': 0.85,
      'color': Color(0xFF22C55E),
      'icon': Icons.bolt_rounded,
    },
    {
      'name': 'Mathematics',
      'progress': 0.65,
      'color': Color(0xFF3B82F6),
      'icon': Icons.functions_rounded,
    },
    {
      'name': 'Chemistry',
      'progress': 0.45,
      'color': Color(0xFFF59E0B),
      'icon': Icons.science_rounded,
    },
    {
      'name': 'Biology',
      'progress': 0.30,
      'color': Color(0xFFEF4444),
      'icon': Icons.eco_rounded,
    },
  ];

  // Library Categories
  static const List<Map<String, dynamic>> libraryCategories = [
    {
      'title': 'Chapter Notes',
      'count': 124,
      'icon': Icons.description_rounded,
      'color': Color(0xFF22C55E),
    },
    {
      'title': 'Question Bank',
      'count': 850,
      'icon': Icons.quiz_rounded,
      'color': Color(0xFF3B82F6),
    },
    {
      'title': 'Video Lectures',
      'count': 45,
      'icon': Icons.play_circle_fill_rounded,
      'color': Color(0xFFA855F7),
    },
    {
      'title': 'Mind Maps',
      'count': 12,
      'icon': Icons.account_tree_rounded,
      'color': Color(0xFFF59E0B),
    },
  ];

  // Today's Focus Tasks
  static const List<Map<String, dynamic>> todayFocus = [
    {
      'title': 'Review Thermodynamics',
      'duration': '45 min',
      'status': 'In Progress',
    },
    {
      'title': 'Practice Calculus II',
      'duration': '1 hour',
      'status': 'Upcoming',
    },
    {
      'title': 'Organic Chemistry Quiz',
      'duration': '20 min',
      'status': 'Pending',
    },
  ];
}
