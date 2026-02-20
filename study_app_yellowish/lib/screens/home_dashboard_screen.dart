import 'package:flutter/material.dart';
import 'package:study_app/screens/achievement_profile_screen.dart';
import 'package:study_app/screens/beginner_home_screen.dart';
import 'package:study_app/screens/grade_selection_screen.dart';
import 'package:study_app/screens/modern_home_screen.dart';
import 'package:study_app/screens/subscription_plans_screen.dart';

class HomeDashboardScreen extends StatefulWidget {
  const HomeDashboardScreen({super.key});

  @override
  State<HomeDashboardScreen> createState() => _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends State<HomeDashboardScreen> {
  bool _isBeginnerMode = true;
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          IndexedStack(
            index: _selectedIndex == 0 ? (_isBeginnerMode ? 0 : 1) : 2,
            children: const [
              BeginnerHomeScreen(),
              ModernHomeScreen(),
              Center(child: Text('Placeholder Screen')),
            ],
          ),
          // Toggle for Demonstration
          Positioned(
            top: 60,
            right: 20,
            child: GestureDetector(
              onTap: () {
                setState(() {
                  _isBeginnerMode = !_isBeginnerMode;
                });
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(_isBeginnerMode
                        ? 'Switched to Beginner Mode'
                        : 'Switched to Modern Mode'),
                    duration: const Duration(seconds: 1),
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              },
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    Icon(_isBeginnerMode ? Icons.child_care : Icons.bolt,
                        color: Colors.white, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      _isBeginnerMode ? 'BEGINNER' : 'MODERN',
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(context),
      floatingActionButton: _buildAddButton(context),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildBottomNav(BuildContext context) {
    final navBg = _isBeginnerMode ? const Color(0xFF111111) : Colors.white;

    return Container(
      height: 90,
      decoration: BoxDecoration(
        color: navBg,
        borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(30), topRight: Radius.circular(30)),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 20)
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildNavLink(Icons.home_filled, 'Home', 0),
          _buildNavLink(Icons.menu_book, 'Library', 1),
          const SizedBox(width: 40),
          _buildNavLink(Icons.workspace_premium, 'Pro', 2),
          _buildNavLink(Icons.person_outline, 'Profile', 3),
        ],
      ),
    );
  }

  Widget _buildNavLink(IconData icon, String label, int index) {
    final isSelected = _selectedIndex == index;
    const activeColor = Color(0xFFFACC15);
    final inactiveColor = _isBeginnerMode ? Colors.grey[600] : Colors.grey[400];

    return InkWell(
      onTap: () {
        if (index == 3) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => const AchievementProfileScreen()));
        } else if (index == 2) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => const SubscriptionPlansScreen()));
        } else if (index == 1) {
          Navigator.push(context,
              MaterialPageRoute(builder: (_) => const GradeSelectionScreen()));
        } else {
          setState(() => _selectedIndex = index);
        }
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: isSelected ? activeColor : inactiveColor, size: 28),
          const SizedBox(height: 4),
          if (isSelected)
            Container(
                width: 4,
                height: 4,
                decoration:
                    BoxDecoration(color: activeColor, shape: BoxShape.circle)),
        ],
      ),
    );
  }

  Widget _buildAddButton(BuildContext context) {
    return Container(
      width: 64,
      height: 64,
      margin: const EdgeInsets.only(top: 24),
      decoration: BoxDecoration(
        color: const Color(0xFFFACC15),
        shape: BoxShape.circle,
        border: Border.all(
            color: _isBeginnerMode ? const Color(0xFF111111) : Colors.white,
            width: 6),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFFACC15).withOpacity(0.3),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: const Icon(Icons.add, color: Colors.black, size: 32),
    );
  }
}
