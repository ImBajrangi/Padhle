import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';
import '../theme/app_theme.dart';
import '../utils/sacred_styles.dart';
import '../widgets/premium_effects.dart';

class MockTestScreen extends StatelessWidget {
  const MockTestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        leading: Center(
          child: BouncyButton(
            onTap: () => Navigator.pop(context),
            child: Icon(Icons.arrow_back_ios_new_rounded, color: theme.colorScheme.onSurface, size: 20),
          ),
        ),
        title: Text(
          'Quantum Mechanics Test',
          style: SacredStyles.withColor(
              SacredStyles.inter16.copyWith(fontWeight: FontWeight.bold),
              theme.colorScheme.onSurface),
        ),
      ),
      body: Stack(
        children: [
          const Positioned.fill(child: GrainyTextureOverlay(opacity: 0.02)),
          SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                _buildResultCard(context),
                const SizedBox(height: 32),
                _buildSectionHeader(context, 'Subject Analysis'),
                const SizedBox(height: 20),
                _buildSubjectBreakdown(context),
                const SizedBox(height: 32),
                _buildActionButtons(context),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResultCard(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return PremiumGlassContainer(
      blur: 12,
      opacity: 0.06,
      showShimmer: true,
      borderRadius: BorderRadius.circular(32),
      borderColor: AppColors.primary.withValues(alpha: 0.2),
      child: Container(
        padding: const EdgeInsets.all(32),
        child: Column(
          children: [
            Text(
              'Overall Score'.toUpperCase(),
              style: SacredStyles.withColor(
                SacredStyles.mono10Bold.copyWith(letterSpacing: 2.0),
                isDark ? AppColors.textSecondary : AppColors.textSecondaryLight,
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              height: 200,
              child: SfRadialGauge(
                axes: <RadialAxis>[
                  RadialAxis(
                    minimum: 0,
                    maximum: 100,
                    showLabels: false,
                    showTicks: false,
                    startAngle: 270,
                    endAngle: 270,
                    axisLineStyle: AxisLineStyle(
                      thickness: 0.2,
                      color: AppColors.primary.withValues(alpha: 0.1),
                      thicknessUnit: GaugeSizeUnit.factor,
                    ),
                    pointers: const <GaugePointer>[
                      RangePointer(
                        value: 85,
                        width: 0.2,
                        sizeUnit: GaugeSizeUnit.factor,
                        color: AppColors.primary,
                        cornerStyle: CornerStyle.bothCurve,
                      )
                    ],
                    annotations: <GaugeAnnotation>[
                      GaugeAnnotation(
                        positionFactor: 0.1,
                        widget: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '85%',
                              style: SacredStyles.withColor(
                                SacredStyles.display32Bold.copyWith(fontSize: 36),
                                theme.colorScheme.onSurface,
                              ),
                            ),
                            Text(
                              'EXCELLENT!',
                              style: SacredStyles.withColor(
                                SacredStyles.mono10Bold.copyWith(letterSpacing: 1.0),
                                AppColors.primary,
                              ),
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title.toUpperCase(),
              style: SacredStyles.withColor(
                SacredStyles.mono12Bold.copyWith(letterSpacing: 1.5),
                isDark ? AppColors.textSecondary : AppColors.textSecondaryLight,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Divider(color: theme.colorScheme.outline.withValues(alpha: 0.3)),
      ],
    );
  }

  Widget _buildSubjectBreakdown(BuildContext context) {
    return Column(
      children: [
        _buildStatRow(context, 'Concept Clarity', 0.9, Colors.green),
        _buildStatRow(context, 'Numerical Accuracy', 0.75, Colors.blue),
        _buildStatRow(context, 'Speed', 0.82, Colors.orange),
      ],
    );
  }

  Widget _buildStatRow(
      BuildContext context, String label, double value, Color color) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                label,
                style: SacredStyles.withColor(
                  SacredStyles.inter14,
                  theme.colorScheme.onSurface,
                ),
              ),
              Text(
                '${(value * 100).toInt()}%',
                style: SacredStyles.withColor(
                  SacredStyles.mono12Bold,
                  color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: value,
              backgroundColor: color.withValues(alpha: 0.1),
              valueColor: AlwaysStoppedAnimation(color),
              minHeight: 8,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      children: [
        BouncyButton(
          onTap: () => Navigator.pop(context),
          child: PremiumShineEffect(
            child: Container(
              width: double.infinity,
              height: 60,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [
                    AppColors.primary,
                    AppColors.primary,
                  ],
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.3),
                    blurRadius: 15,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              alignment: Alignment.center,
              child: Text(
                'BACK TO UNIT',
                style: SacredStyles.withColor(
                  SacredStyles.mono12Bold.copyWith(letterSpacing: 2.0),
                  Colors.white,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),
        BouncyButton(
          onTap: () {},
          child: Text(
            'REVIEW MISTAKES',
            style: SacredStyles.withColor(
              SacredStyles.mono10Bold.copyWith(letterSpacing: 1.5),
              isDark ? AppColors.textSecondary : AppColors.textSecondaryLight,
            ),
          ),
        ),
      ],
    );
  }
}

