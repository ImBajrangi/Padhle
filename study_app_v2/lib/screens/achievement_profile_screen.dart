import 'package:flutter/material.dart';
import 'package:study_app/theme/app_theme.dart';
import 'package:study_app/widgets/premium_effects.dart';
import 'dart:ui';

class AchievementProfileScreen extends StatelessWidget {
  const AchievementProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgCream,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textMain),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
              icon: const Icon(Icons.settings_outlined,
                  color: AppColors.textMain),
              onPressed: () {}),
        ],
      ),
      body: Stack(
        children: [
          const GrainyTextureOverlay(opacity: 0.04),
          SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 120),
                _buildProfileHeader(),
                const SizedBox(height: 40),
                _buildStatsBentoGrid(),
                const SizedBox(height: 40),
                _buildAchievementsSection(),
                const SizedBox(height: 120),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Column(
      children: [
        Stack(
          alignment: Alignment.center,
          children: [
            Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.primary, width: 4),
              ),
              padding: const EdgeInsets.all(4),
              child: const CircleAvatar(
                radius: 60,
                backgroundImage:
                    NetworkImage('https://i.pravatar.cc/300?u=alex'),
              ),
            ),
            Positioned(
              right: 2,
              bottom: 2,
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
                child:
                    const Icon(Icons.edit, size: 16, color: AppColors.textMain),
              ),
            ),
          ],
        ),
        const SizedBox(height: 24),
        const Text(
          'Alex Johnson',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w900,
            color: AppColors.textMain,
            letterSpacing: -1,
          ),
        ),
        const Text(
          'University Student • Grade 11',
          style: TextStyle(
            fontSize: 14,
            color: AppColors.textSecondary,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildStatsBentoGrid() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Performance',
              style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textMain)),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: _buildBentoCard('14 Days', 'STREAK',
                    Icons.local_fire_department, AppColors.primaryAction),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildBentoCard('Level 12', 'RANK', Icons.military_tech,
                    AppColors.accentPurple),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildBentoCardFull(
              'Active Learner',
              'You are in the top 5% of grade 11 students.',
              Icons.trending_up,
              AppColors.accentBlue),
        ],
      ),
    );
  }

  Widget _buildBentoCard(
      String val, String label, IconData icon, Color accent) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 15)
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: accent, size: 28),
          const SizedBox(height: 16),
          Text(val,
              style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textMain)),
          Text(label,
              style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textSecondary,
                  letterSpacing: 1)),
        ],
      ),
    );
  }

  Widget _buildBentoCardFull(
      String title, String desc, IconData icon, Color accent) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 15)
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
                color: accent.withOpacity(0.1), shape: BoxShape.circle),
            child: Icon(icon, color: accent, size: 28),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textMain)),
                Text(desc,
                    style: const TextStyle(
                        fontSize: 12, color: AppColors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAchievementsSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Achievements',
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textMain)),
          const SizedBox(height: 20),
          _buildAchievementItem(
              'Elite Scholar',
              'Top 5% of students in Grade 11',
              Icons.workspace_premium,
              AppColors.primary),
          const SizedBox(height: 16),
          _buildAchievementItem(
              'Consistency King',
              'Maintained 30 day study streak',
              Icons.local_fire_department,
              AppColors.primaryAction),
          const SizedBox(height: 16),
          _buildAchievementItem(
              'Quiz Master',
              'Scored 100% in 5 consecutive quizzes',
              Icons.psychology,
              AppColors.accentBlue),
        ],
      ),
    );
  }

  Widget _buildAchievementItem(
      String title, String desc, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textMain)),
                Text(desc,
                    style: const TextStyle(
                        fontSize: 12, color: AppColors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
