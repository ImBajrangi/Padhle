import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class PDFViewerScreen extends StatelessWidget {
  final String title;
  const PDFViewerScreen({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgDark,
      appBar: AppBar(
        title: Text(title, style: const TextStyle(fontSize: 16)),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.share_rounded)),
          IconButton(
              onPressed: () {}, icon: const Icon(Icons.more_vert_rounded)),
        ],
      ),
      body: Stack(
        children: [
          // PDF Content Placeholder
          Container(
            color: AppColors.surface,
            width: double.infinity,
            height: double.infinity,
            child: const Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.picture_as_pdf_rounded,
                      size: 64, color: AppColors.textSecondary),
                  SizedBox(height: 16),
                  Text('PDF Rendering Engine Active',
                      style: TextStyle(color: AppColors.textSecondary)),
                ],
              ),
            ),
          ),

          // Floating Toolbar
          Positioned(
            bottom: 40,
            left: 24,
            right: 24,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.8),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildToolIcon(Icons.draw_rounded, 'Annotate'),
                  _buildToolIcon(Icons.text_fields_rounded, 'Highlight'),
                  _buildToolIcon(Icons.bookmark_add_rounded, 'Bookmark'),
                  _buildToolIcon(Icons.search_rounded, 'Search'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildToolIcon(IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white, size: 24),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white, fontSize: 10)),
      ],
    );
  }
}
