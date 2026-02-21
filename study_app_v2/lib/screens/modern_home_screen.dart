import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/app_theme.dart';
import '../widgets/bento_card.dart';

class ModernHomeScreen extends StatelessWidget {
  const ModernHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 80, 24, 120),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(context),
            const SizedBox(height: 40),
            _buildStatusBento(),
            const SizedBox(height: 32),
            _buildSectionHeader('Today\'s Focus'),
            const SizedBox(height: 20),
            _buildSubjectsBento(),
            const SizedBox(height: 32),
            _buildSectionHeader('Daily Assignments'),
            const SizedBox(height: 20),
            _buildAssignmentsList(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white.withOpacity(0.1)),
                image: const DecorationImage(
                  image: NetworkImage(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqUWP7HM6rEHnI5McRApJipQP5ABiMvZt7lTycq939qkZCO7NM8Aqb-aAmcIPCUpm0pib7oQMJh-xCec7v8lpVmCegcqW75UA30TXPusU062bT4alEykfyED8stqFy_Y7Chq8To4Zxt0owfMK2OWN4eKYDqr2Vm786b5CGPWn8jFPboyVUnCR2cgAsIM-11WNXF-IzViRvMVZRIfIO0DopIp_Zwkit7O8FeztCOoD-FmZfx-HxSkdIfIQBv7jp-Q_tUtg5N7GReo4'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    SvgPicture.asset(
                      'assets/images/logo.svg',
                      height: 18,
                      colorFilter: const ColorFilter.mode(
                        AppColors.primary,
                        BlendMode.srcIn,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      'PADHLE HUB',
                      style: GoogleFonts.robotoMono(
                        color: AppColors.primary,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ],
                ),
                Text(
                  'Alex • Grade 11',
                  style: GoogleFonts.inter(
                    color: AppColors.textSecondary,
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ],
        ),
        Row(
          children: [
            _buildHeaderAction(Icons.search_rounded),
            const SizedBox(width: 12),
            _buildHeaderAction(Icons.notifications_none_rounded),
          ],
        ),
      ],
    );
  }

  Widget _buildHeaderAction(IconData icon) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: AppColors.surface,
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Icon(icon, color: AppColors.textSecondary, size: 20),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: AppColors.textMain,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          'View All',
          style: TextStyle(
            color: AppColors.primary,
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _buildStatusBento() {
    return Row(
      children: [
        Expanded(
          flex: 45,
          child: BentoCard(
            title: '14 Days',
            subtitle: 'Current Streak',
            icon: Icons.local_fire_department_rounded,
            accentColor: Colors.orange,
            height: 140,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          flex: 55,
          child: BentoCard(
            title: '2,450',
            subtitle: 'Total XP Earned',
            icon: Icons.bolt_rounded,
            accentColor: AppColors.primary,
            height: 140,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.7,
                    backgroundColor: AppColors.primary.withOpacity(0.1),
                    valueColor: const AlwaysStoppedAnimation(AppColors.primary),
                    minHeight: 6,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSubjectsBento() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: BentoCard(
            title: 'Quantum Physics',
            subtitle: 'Unit 4: Mechanics',
            icon: Icons.science_rounded,
            accentColor: AppColors.accentBlue,
            height: 180,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            children: [
              BentoCard(
                title: 'Maths',
                icon: Icons.functions_rounded,
                accentColor: AppColors.accentPurple,
                height: 82,
              ),
              const SizedBox(height: 16),
              BentoCard(
                title: 'Chemistry',
                icon: Icons.biotech_rounded,
                accentColor: AppColors.secondary,
                height: 82,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildAssignmentsList() {
    return Column(
      children: [
        _buildAssignmentItem(
            'Maths Quiz', 'Due tomorrow', Icons.quiz_rounded, Colors.purple),
        const SizedBox(height: 12),
        _buildAssignmentItem(
            'Physics Lab', 'Due in 3 days', Icons.biotech_rounded, Colors.blue),
      ],
    );
  }

  Widget _buildAssignmentItem(
      String title, String due, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: const TextStyle(
                        color: AppColors.textMain,
                        fontWeight: FontWeight.bold)),
                Text(due,
                    style: const TextStyle(
                        color: AppColors.textSecondary, fontSize: 12)),
              ],
            ),
          ),
          const Icon(Icons.chevron_right_rounded,
              color: AppColors.textSecondary),
        ],
      ),
    );
  }
}
