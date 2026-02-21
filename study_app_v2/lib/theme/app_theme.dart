import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // PadhLe Hub Palette (Emerald Green & Charcoal)
  static const Color primary =
      Color.fromARGB(255, 19, 105, 50); // Vibrant Emerald Green
  static const Color primaryAction =
      Color.fromARGB(255, 10, 60, 28); // Darker Green for Actions
  static const Color secondary =
      Color.fromARGB(255, 60, 104, 62); // Soft Green for Accents

  // Background & Surface (Deep Mode)
  static const Color bgDark = Color(0xFF121212); // Deep Charcoal
  static const Color surface = Color(0xFF1E1E1E); // Material Surface Grey
  static const Color surfaceDark = Color(0xFF2C2C2C); // Darker Surface Variant

  // Text Tokens
  static const Color textMain = Color(0xFFFFFFFF); // Pure White
  static const Color textSecondary = Color(0xFFB0B0B0); // Silver/Grey
  static const Color textOffWhite = Color(0xFFE0E0E0); // Body Text

  // Legacy/Reference (to be phased out)
  static const Color accentBlue = Color(0xFF3B82F6);
  static const Color accentPurple = Color(0xFFA855F7);
  static const Color bgCream = bgDark; // Alias for legacy screens
  static const Color bgLight = bgDark; // Alias for legacy screens
  static const Color accentOrange =
      Color.fromARGB(255, 52, 89, 54); // Alias for legacy screens
}

class AppTheme {
  static const double borderRadius = 24.0;

  static ThemeData dark() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.bgDark,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        secondary: AppColors.primaryAction,
        surface: AppColors.surface,
        background: AppColors.bgDark,
        onPrimary: Colors.white,
      ),
      // Specialized Typography
      textTheme: TextTheme(
        displayLarge: GoogleFonts.robotoMono(
          color: AppColors.textMain,
          fontWeight: FontWeight.bold,
          fontSize: 32,
          letterSpacing: -1.0,
        ),
        headlineMedium: GoogleFonts.robotoMono(
          color: AppColors.textMain,
          fontWeight: FontWeight.w600,
          fontSize: 24,
        ),
        bodyLarge: GoogleFonts.inter(
          color: AppColors.textOffWhite,
          fontSize: 16,
        ),
        bodyMedium: GoogleFonts.inter(
          color: AppColors.textSecondary,
          fontSize: 14,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: AppColors.textMain),
        titleTextStyle: TextStyle(
          color: AppColors.textMain,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      cardTheme: CardThemeData(
        color: AppColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius),
        ),
        elevation: 0,
      ),
    );
  }
}
