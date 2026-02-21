import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../theme/app_theme.dart';
import '../widgets/premium_effects.dart';
import '../widgets/glass_bottom_bar.dart';
import '../providers/user_prefs_provider.dart';
import 'library_vault_screen.dart';
import 'modern_home_screen.dart';

class HomeDashboardScreen extends ConsumerStatefulWidget {
  const HomeDashboardScreen({super.key});

  @override
  ConsumerState<HomeDashboardScreen> createState() =>
      _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends ConsumerState<HomeDashboardScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const ModernHomeScreen(),
    const LibraryVaultScreen(),
    const Scaffold(body: Center(child: Text('Statistics'))),
    const Scaffold(body: Center(child: Text('Profile'))),
  ];

  @override
  Widget build(BuildContext context) {
    final userPrefs = ref.watch(userPrefsProvider);

    return Scaffold(
      backgroundColor: AppColors.bgDark,
      extendBody: true,
      body: Stack(
        children: [
          IndexedStack(
            index: _currentIndex,
            children: _screens,
          ),
          _buildFloatingModeToggle(userPrefs.isModernMode),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        shape: const CircleBorder(),
        elevation: 10,
        child: const Icon(Icons.add_rounded, size: 32),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: GlassBottomBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
      ),
    );
  }

  Widget _buildFloatingModeToggle(bool isModern) {
    return Positioned(
      top: 60,
      right: 24,
      child: GestureDetector(
        onTap: () {
          ref.read(userPrefsProvider.notifier).toggleModernMode();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content:
                  Text('Switched to ${!isModern ? 'Modern' : 'Beginner'} Mode'),
              duration: const Duration(seconds: 1),
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12)),
              backgroundColor: AppColors.surface,
            ),
          );
        },
        child: PremiumGlassContainer(
          blur: 10,
          opacity: 0.1,
          borderRadius: BorderRadius.circular(20),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(isModern ? Icons.bolt : Icons.auto_awesome,
                    color: AppColors.primary, size: 20),
                const SizedBox(width: 8),
                Text(
                  isModern ? 'MODERN' : 'BEGINNER',
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
