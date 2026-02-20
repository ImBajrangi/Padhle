import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // Light Theme
  static const Color primary = Color(0xFF137fec);
  static const Color primaryLight = Color(0xFFe7f2fe);
  static const Color backgroundLight = Color(0xFFf6f7f8);
  static const Color surfaceLight = Colors.white;
  static const Color textMainLight = Color(0xFF0f172A);
  static const Color textSecondaryLight = Color(0xFF64748B);

  // Dark Theme
  static const Color backgroundDark = Color(0xFF101922);
  static const Color surfaceDark = Color(0xFF1e293b);
  static const Color textMainDark = Color(0xFFf1f5f9);
  static const Color textSecondaryDark = Color(0xFF94a3b8);

  // Shared
  static const Color accentPurple = Color(0xFFa855f7);
  static const Color accentOrange = Color(0xFFf97316);
  static const Color accentEmerald = Color(0xFF10b981);
}

class AppTheme {
  static ThemeData light() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.backgroundLight,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
        onPrimary: Colors.white,
        surface: AppColors.surfaceLight,
        background: AppColors.backgroundLight,
      ),
      textTheme: GoogleFonts.lexendTextTheme(),
    );
  }

  static ThemeData dark() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.backgroundDark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
        onPrimary: Colors.white,
        surface: AppColors.surfaceDark,
        background: AppColors.backgroundDark,
        brightness: Brightness.dark,
      ),
      textTheme: GoogleFonts.lexendTextTheme(ThemeData.dark().textTheme),
    );
  }
}
