import 'package:flutter/material.dart';

class GradeSelectionScreen extends StatefulWidget {
  const GradeSelectionScreen({super.key});

  @override
  State<GradeSelectionScreen> createState() => _GradeSelectionScreenState();
}

class _GradeSelectionScreenState extends State<GradeSelectionScreen> {
  final FixedExtentScrollController _controller =
      FixedExtentScrollController(initialItem: 1);
  int _selectedGrade = 10;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFDFCFB),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 48),
            Center(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    )
                  ],
                ),
                child:
                    Icon(Icons.school, size: 32, color: Colors.blueGrey[200]),
              ),
            ),
            const SizedBox(height: 32),
            const Text(
              'Select your Class',
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold, // Use bold for "Select your Class"
                color: Color(0xFF1E293B),
                letterSpacing: -1,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Swipe to choose your current academic year',
              style: TextStyle(
                fontSize: 15,
                color: Colors.grey[500],
                fontWeight: FontWeight.w500,
              ),
            ),
            const Spacer(),
            SizedBox(
              height: 440,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Selected Background Glow
                  Container(
                    width: 260,
                    height: 120,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF9C3).withOpacity(0.9),
                      borderRadius: BorderRadius.circular(48),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFFACC15).withOpacity(0.15),
                          blurRadius: 40,
                          offset: const Offset(0, 20),
                        ),
                      ],
                    ),
                  ),
                  ListWheelScrollView.useDelegate(
                    controller: _controller,
                    itemExtent: 140,
                    perspective: 0.003,
                    diameterRatio: 1.8,
                    physics: const FixedExtentScrollPhysics(),
                    onSelectedItemChanged: (index) {
                      setState(() {
                        _selectedGrade = index + 9;
                      });
                    },
                    childDelegate: ListWheelChildBuilderDelegate(
                      childCount: 4, // 9, 10, 11, 12
                      builder: (context, index) {
                        final grade = index + 9;
                        final isSelected = _selectedGrade == grade;
                        return Center(
                          child: Text(
                            '$grade',
                            style: TextStyle(
                              fontSize: isSelected ? 100 : 56,
                              fontWeight: FontWeight.w900,
                              color: isSelected
                                  ? const Color(0xFF1E293B)
                                  : Colors.grey[200],
                              fontFamily:
                                  'Georgia', // Using serif for numbers as in design
                              letterSpacing: -2,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 40),
              child: Column(
                children: [
                  Container(
                    width: double.infinity,
                    height: 64,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFACC15),
                      borderRadius: BorderRadius.circular(32),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFFACC15).withOpacity(0.3),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: InkWell(
                      onTap: () => Navigator.pop(context),
                      borderRadius: BorderRadius.circular(32),
                      child: const Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Confirm Standard',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF1E293B),
                              ),
                            ),
                            SizedBox(width: 8),
                            Icon(Icons.arrow_forward,
                                color: Color(0xFF1E293B), size: 20),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildPageIndicator(false),
                      const SizedBox(width: 8),
                      _buildPageIndicator(true),
                      const SizedBox(width: 8),
                      _buildPageIndicator(false),
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

  Widget _buildPageIndicator(bool isActive) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(
        color: isActive ? Colors.grey[800] : Colors.grey[300],
        shape: BoxShape.circle,
      ),
    );
  }
}
