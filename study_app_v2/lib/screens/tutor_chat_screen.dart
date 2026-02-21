import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class TutorChatScreen extends StatelessWidget {
  const TutorChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        title: const Column(
          children: [
            Text('AI Tutor',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('Online • Always here to help',
                style: TextStyle(fontSize: 10, color: Colors.green)),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(24),
              children: [
                _buildChatBubble(
                  'Hello Alex! I see you\'re studying Quantum Mechanics. How can I assist you today?',
                  isTutor: true,
                ),
                _buildChatBubble(
                  'I\'m having trouble understanding the Wave Function collapse. Can you explain it simply?',
                  isTutor: false,
                ),
                _buildChatBubble(
                  'Of course! Imagine a coin spinning on a table. While it\'s spinning, it\'s both heads and tails at once (Superposition). Collapse happens when you stop the coin and it finally is one or the other.',
                  isTutor: true,
                ),
              ],
            ),
          ),
          _buildChatInput(),
        ],
      ),
    );
  }

  Widget _buildChatBubble(String text, {required bool isTutor}) {
    return Align(
      alignment: isTutor ? Alignment.centerLeft : Alignment.centerRight,
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        constraints: BoxConstraints(maxWidth: isTutor ? 280 : 260),
        decoration: BoxDecoration(
          color:
              isTutor ? AppColors.primary.withOpacity(0.1) : AppColors.surface,
          borderRadius: BorderRadius.circular(20).copyWith(
            bottomLeft:
                isTutor ? const Radius.circular(0) : const Radius.circular(20),
            bottomRight:
                isTutor ? const Radius.circular(20) : const Radius.circular(0),
          ),
          border: Border.all(
            color: isTutor
                ? AppColors.primary.withOpacity(0.2)
                : Colors.white.withOpacity(0.05),
          ),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: isTutor ? AppColors.textMain : AppColors.textOffWhite,
            height: 1.4,
          ),
        ),
      ),
    );
  }

  Widget _buildChatInput() {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 40),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: AppColors.bgDark,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const TextField(
                style: TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Ask your tutor...',
                  hintStyle: TextStyle(color: AppColors.textSecondary),
                  border: InputBorder.none,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: const BoxDecoration(
              color: AppColors.primary,
              shape: BoxShape.circle,
            ),
            child:
                const Icon(Icons.send_rounded, color: Colors.white, size: 20),
          ),
        ],
      ),
    );
  }
}
