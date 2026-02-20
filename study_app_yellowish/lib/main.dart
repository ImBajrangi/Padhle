import 'package:flutter/material.dart';
import 'package:study_app/screens/home_dashboard_screen.dart';
import 'package:study_app/theme/app_theme.dart';

void main() {
  runApp(const StudyApp());
}

class StudyApp extends StatelessWidget {
  const StudyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StudyApp',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: ThemeMode.system,
      home: const HomeDashboardScreen(),
    );
  }
}
