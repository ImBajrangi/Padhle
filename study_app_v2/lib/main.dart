import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:study_app/screens/onboarding_screen.dart';
import 'package:study_app/theme/app_theme.dart';

void main() {
  runApp(
    const ProviderScope(
      child: StudyApp(),
    ),
  );
}

class StudyApp extends StatelessWidget {
  const StudyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Study App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark(),
      home: const OnboardingScreen(),
    );
  }
}
