import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../utils/sacred_styles.dart';
import '../widgets/premium_effects.dart';

class TutorChatScreen extends StatelessWidget {
  const TutorChatScreen({super.key});

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
        title: Column(
          children: [
            Text(
              'AI Tutor',
              style: SacredStyles.withColor(
                SacredStyles.inter16.copyWith(fontWeight: FontWeight.bold),
                theme.colorScheme.onSurface,
              ),
            ),
            Text(
              'Online • Always here to help',
              style: SacredStyles.withColor(
                SacredStyles.mono10Bold,
                Colors.green,
              ),
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          const Positioned.fill(child: GrainyTextureOverlay(opacity: 0.02)),
          Column(
            children: [
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.all(24),
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _buildChatBubble(
                      context,
                      'Hello Alex! I see you\'re studying Quantum Mechanics. How can I assist you today?',
                      isTutor: true,
                    ),
                    _buildChatBubble(
                      context,
                      'I\'m having trouble understanding the Wave Function collapse. Can you explain it simply?',
                      isTutor: false,
                    ),
                    _buildChatBubble(
                      context,
                      'Of course! Imagine a coin spinning on a table. While it\'s spinning, it\'s both heads and tails at once (Superposition). Collapse happens when you stop the coin and it finally is one or the other.',
                      isTutor: true,
                    ),
                  ],
                ),
              ),
              _buildChatInput(context),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildChatBubble(BuildContext context, String text,
      {required bool isTutor}) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final borderRadius = BorderRadius.circular(20).copyWith(
      bottomLeft:
          isTutor ? const Radius.circular(0) : const Radius.circular(20),
      bottomRight:
          isTutor ? const Radius.circular(20) : const Radius.circular(0),
    );

    return Align(
      alignment: isTutor ? Alignment.centerLeft : Alignment.centerRight,
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        constraints: BoxConstraints(maxWidth: isTutor ? 280 : 260),
        child: PremiumGlassContainer(
          blur: 5,
          opacity: isTutor ? 0.08 : 0.04,
          borderRadius: borderRadius,
          borderColor: isTutor
              ? AppColors.primary.withValues(alpha: 0.3)
              : theme.colorScheme.outline.withValues(alpha: 0.2),
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Text(
              text,
              style: SacredStyles.withColor(
                SacredStyles.inter14,
                isTutor
                    ? theme.colorScheme.onSurface
                    : (isDark ? AppColors.textOffWhite : AppColors.textMain),
              ).copyWith(height: 1.4),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildChatInput(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 40),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border.all(color: theme.colorScheme.outline.withValues(alpha: 0.5)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: theme.scaffoldBackgroundColor,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: theme.colorScheme.outline.withValues(alpha: 0.5)),
              ),
              child: TextField(
                style: TextStyle(color: theme.colorScheme.onSurface),
                decoration: InputDecoration(
                  hintText: 'Ask your tutor...',
                  hintStyle: SacredStyles.withColor(
                    SacredStyles.inter14,
                    theme.brightness == Brightness.dark
                        ? AppColors.textSecondary
                        : AppColors.textSecondaryLight,
                  ),
                  border: InputBorder.none,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          BouncyButton(
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Message sent'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withValues(alpha: 0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child:
                  const Icon(Icons.send_rounded, color: Colors.white, size: 20),
            ),
          ),
        ],
      ),
    );
  }
}

