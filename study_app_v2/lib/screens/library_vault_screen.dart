import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/app_theme.dart';
import '../widgets/bento_card.dart';

class LibraryVaultScreen extends StatelessWidget {
  const LibraryVaultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 80, 24, 120),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: 40),
            _buildSectionHeader('Quick Access'),
            const SizedBox(height: 20),
            _buildQuickAccessBento(),
            const SizedBox(height: 40),
            _buildSectionHeader('Categories'),
            const SizedBox(height: 20),
            _buildCategoriesList(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
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
    return Text(
      title,
      style: const TextStyle(
        color: AppColors.textMain,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildQuickAccessBento() {
    return Row(
      children: [
        Expanded(
          child: BentoCard(
            title: 'Downloads',
            subtitle: '12 Files',
            icon: Icons.download_for_offline_rounded,
            accentColor: AppColors.accentBlue,
            height: 120,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: BentoCard(
            title: 'Saved',
            subtitle: '45 Resources',
            icon: Icons.bookmark_rounded,
            accentColor: AppColors.primaryAction,
            height: 120,
          ),
        ),
      ],
    );
  }

  Widget _buildCategoriesList() {
    final categories = [
      {
        'name': 'Science',
        'icon': Icons.science_rounded,
        'count': '124 Materials',
        'color': Colors.blue
      },
      {
        'name': 'Mathematics',
        'icon': Icons.functions_rounded,
        'count': '98 Materials',
        'color': Colors.purple
      },
      {
        'name': 'Humanities',
        'icon': Icons.public_rounded,
        'count': '76 Materials',
        'color': Colors.orange
      },
      {
        'name': 'Languages',
        'icon': Icons.translate_rounded,
        'count': '54 Materials',
        'color': Colors.green
      },
    ];

    return Column(
      children: categories
          .map((cat) => _buildCategoryItem(
                cat['name'] as String,
                cat['count'] as String,
                cat['icon'] as IconData,
                cat['color'] as Color,
              ))
          .toList(),
    );
  }

  Widget _buildCategoryItem(
      String title, String count, IconData icon, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
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
                Text(
                  title,
                  style: const TextStyle(
                    color: AppColors.textMain,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  count,
                  style: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 12,
                  ),
                ),
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
