import 'package:flutter/material.dart';
import 'package:study_app/theme/app_theme.dart';
import 'package:study_app/widgets/premium_effects.dart';
import 'package:study_app/utils/sacred_styles.dart';
import 'dart:ui';

class ResourceDetailScreen extends StatelessWidget {
  const ResourceDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.black, // Base for the hero image
      body: Stack(
        children: [
          const Positioned.fill(child: GrainyTextureOverlay(opacity: 0.02)),
          // 1. Hero Image Section (55% height)
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: MediaQuery.of(context).size.height * 0.55,
            child: Stack(
              children: [
                Positioned.fill(
                  child: Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrNu3SbwIs2-GLuV5TOLh-MdBpzaFYGRRvRsGBNUX6NF2wyWr5MQB3NhQgUy-eTgliK87hHTFp1vY_M3xCW0n7li6mBpYNerZat15zFq3yM4x1qA5A2jl8xNw2FyC5CO8_34G3PMn8zRXA5NqH_2glb-9DAy8Na6uNZiNtdUBN9XkKe68_gid87jiMZ3zmG_MGGjox2rVX-jmQAfiIeGyd8VVH0KVGAXbTnnMorhrKGCh5teehMPILFm2Wd6q0S7VrU_BOU14VFIs',
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.4),
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.6),
                        ],
                      ),
                    ),
                  ),
                ),
                // Header Actions
                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildCircleAction(context, Icons.arrow_back,
                            () => Navigator.pop(context)),
                        _buildCircleAction(context, Icons.more_horiz, () {}),
                      ],
                    ),
                  ),
                ),
                // Title Info (Bottom of hero)
                Positioned(
                  bottom: 60,
                  left: 24,
                  right: 24,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.4),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                              color: Colors.white.withValues(alpha: 0.1)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                                width: 8,
                                height: 8,
                                decoration: const BoxDecoration(
                                    color: AppColors.primary,
                                    shape: BoxShape.circle)),
                            const SizedBox(width: 8),
                            const Text('GRADE 11 PHYSICS',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    letterSpacing: 1)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'Advanced Mechanics &\nMotion Study Notes',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          height: 1.1,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // 2. Content Card (Overlapping)
          Positioned.fill(
            top: MediaQuery.of(context).size.height * 0.5,
            child: Container(
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(32),
                    topRight: Radius.circular(32)),
                boxShadow: [
                  BoxShadow(
                      color: Colors.black.withValues(alpha: 0.15),
                      blurRadius: 40,
                      offset: const Offset(0, -10)),
                ],
              ),
              child: SingleChildScrollView(
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Handle bar
                    Center(
                      child: Container(
                        width: 48,
                        height: 6,
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: BorderRadius.circular(3),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    // Stats grid
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildDetailStat(context, '24', 'Pages', Icons.description,
                            AppColors.primary),
                        _buildDetailStat(context, '4.2', 'MB Size', Icons.sd_storage,
                            AppColors.accentBlue),
                        _buildDetailStat(context, '4.9', 'Rating', Icons.star,
                            AppColors.accentOrange),
                      ],
                    ),
                    const SizedBox(height: 40),
                    // CTA Button
                    BouncyButton(
                      onTap: () {},
                      child: PremiumShineEffect(
                        child: Container(
                          width: double.infinity,
                          height: 64,
                          decoration: BoxDecoration(
                            gradient: const SweepGradient(
                              colors: [
                                AppColors.primary,
                                AppColors.secondary,
                                AppColors.primary,
                              ],
                            ),
                            borderRadius: BorderRadius.circular(32),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primary.withValues(alpha: 0.4),
                                blurRadius: 20,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.lock_open_rounded, color: Colors.white, size: 22),
                              SizedBox(width: 12),
                              Text(
                                'UNLOCK FULL ACCESS',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w900,
                                  color: Colors.white,
                                  letterSpacing: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    // Learners section
                    const Text('Current Learners',
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    const Text('Students studying this topic right now',
                        style: TextStyle(
                            color: AppColors.textSecondary, fontSize: 14)),
                    const SizedBox(height: 20),
                    _buildLearnersRow(context),
                    const SizedBox(height: 40),
                    // Tags
                    const Text('Topic Tags',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _buildTag(context, '#Kinematics'),
                        _buildTag(context, '#Dynamics'),
                        _buildTag(context, '#NewtonLaws'),
                        _buildTag(context, '#Energy'),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCircleAction(
      BuildContext context, IconData icon, VoidCallback onTap) {
    return BouncyButton(
      onTap: onTap,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              shape: BoxShape.circle,
              border: Border.all(color: Colors.white.withValues(alpha: 0.3)),
            ),
            child: Icon(icon, color: Colors.white, size: 24),
          ),
        ),
      ),
    );
  }

  Widget _buildDetailStat(
      BuildContext context, String value, String label, IconData icon, Color accent) {
    final theme = Theme.of(context);
    return PremiumGlassContainer(
      blur: 8,
      opacity: 0.04,
      borderRadius: BorderRadius.circular(24),
      borderColor: accent.withValues(alpha: 0.15),
      child: Container(
        width: 100,
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Column(
          children: [
            Icon(icon, color: accent, size: 24),
            const SizedBox(height: 8),
            Text(
              value,
              style: SacredStyles.withColor(
                SacredStyles.inter20Bold,
                theme.colorScheme.onSurface,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label.toUpperCase(),
              style: SacredStyles.withColor(
                SacredStyles.mono10Bold,
                theme.colorScheme.onSurface.withValues(alpha: 0.5),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLearnersRow(BuildContext context) {
    return PremiumGlassContainer(
      blur: 5,
      opacity: 0.05,
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SizedBox(
              width: 110,
              child: Stack(
                children: [
                  _buildAvatar(0, 'https://i.pravatar.cc/100?u=1'),
                  _buildAvatar(28, 'https://i.pravatar.cc/100?u=2'),
                  _buildAvatar(56, 'https://i.pravatar.cc/100?u=3'),
                  Positioned(
                    left: 84,
                    child: Container(
                      width: 36,
                      height: 36,
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white, width: 2),
                      ),
                      child: const Center(
                          child: Text('+128',
                              style: TextStyle(
                                  fontSize: 10, fontWeight: FontWeight.bold))),
                    ),
                  ),
                ],
              ),
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                _buildBar(16, AppColors.accentBlue.withValues(alpha: 0.3)),
                const SizedBox(width: 4),
                _buildBar(24, AppColors.accentBlue.withValues(alpha: 0.5)),
                const SizedBox(width: 4),
                _buildBar(12, AppColors.accentBlue.withValues(alpha: 0.3)),
                const SizedBox(width: 4),
                _buildBar(32, AppColors.accentBlue),
                const SizedBox(width: 4),
                _buildBar(40, AppColors.primary),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAvatar(double left, String url) {
    return Positioned(
      left: left,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white, width: 2),
          image: DecorationImage(image: NetworkImage(url), fit: BoxFit.cover),
        ),
      ),
    );
  }

  Widget _buildBar(double height, Color color) {
    return Container(
      width: 6,
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(2), topRight: Radius.circular(2)),
      ),
    );
  }

  Widget _buildTag(BuildContext context, String text) {
    final theme = Theme.of(context);
    return PremiumGlassContainer(
      blur: 0,
      opacity: 0.05,
      borderRadius: BorderRadius.circular(12),
      borderColor: theme.colorScheme.onSurface.withValues(alpha: 0.1),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Text(
          text,
          style: SacredStyles.withColor(
            SacredStyles.inter12.copyWith(fontWeight: FontWeight.w500),
            theme.colorScheme.onSurface.withValues(alpha: 0.7),
          ),
        ),
      ),
    );
  }
}

