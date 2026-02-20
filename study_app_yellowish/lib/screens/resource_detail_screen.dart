import 'package:flutter/material.dart';

class ResourceDetailScreen extends StatelessWidget {
  const ResourceDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          // Hero Image Background
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: MediaQuery.of(context).size.height * 0.45,
            child: Image.network(
              'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=100&w=1000&auto=format&fit=crop',
              fit: BoxFit.cover,
            ),
          ),

          // App Bar Overlay
          Positioned(
            top: 44,
            left: 16,
            right: 16,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCircularButton(
                    Icons.arrow_back, () => Navigator.pop(context)),
                _buildCircularButton(Icons.more_horiz, () {}),
              ],
            ),
          ),

          // Content Card
          Positioned.fill(
            top: MediaQuery.of(context).size.height * 0.4,
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 12, 24, 120),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Handle
                    Center(
                      child: Container(
                        width: 48,
                        height: 5,
                        decoration: BoxDecoration(
                          color: Colors.grey[300],
                          borderRadius: BorderRadius.circular(2.5),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Stats Row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildStatCard(Icons.description, '24', 'Pages',
                            const Color(0xFFFEF3C7), const Color(0xFFD97706)),
                        _buildStatCard(Icons.sd_storage, '4.2', 'MB Size',
                            const Color(0xFFEFF6FF), const Color(0xFF2563EB)),
                        _buildStatCard(Icons.star, '4.9', 'Rating',
                            const Color(0xFFFFF7ED), const Color(0xFFEA580C)),
                      ],
                    ),
                    const SizedBox(height: 32),

                    // Unlock Button
                    Container(
                      width: double.infinity,
                      height: 64,
                      decoration: BoxDecoration(
                        color: const Color(0xFFFBBF24),
                        borderRadius: BorderRadius.circular(32),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFFFBBF24).withOpacity(0.3),
                            blurRadius: 20,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: const Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.lock_outline,
                                color: Colors.black, size: 20),
                            SizedBox(width: 8),
                            Text(
                              'Unlock Full Access',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),

                    // Current Learners Section
                    const Text(
                      'Current Learners',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Text(
                          'Students studying this topic right now',
                          style:
                              TextStyle(fontSize: 14, color: Colors.grey[600]),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: const Color(0xFFEFF6FF),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: const Text(
                            'See All',
                            style: TextStyle(
                                color: Color(0xFF2563EB),
                                fontSize: 12,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    _buildSocialProofCard(),
                    const SizedBox(height: 40),

                    // Topic Tags
                    const Text(
                      'Topic Tags',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _buildTag('#Kinematics'),
                        _buildTag('#Dynamics'),
                        _buildTag('#NewtonLaws'),
                        _buildTag('#Energy'),
                      ],
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCircularButton(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.4),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: Colors.white, size: 20),
      ),
    );
  }

  Widget _buildStatCard(
      IconData icon, String value, String label, Color bg, Color iconColor) {
    return Container(
      width: 100,
      padding: const EdgeInsets.symmetric(vertical: 20),
      decoration: BoxDecoration(
        color: bg.withOpacity(0.3),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: bg, width: 1),
      ),
      child: Column(
        children: [
          Icon(icon, color: iconColor, size: 24),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black87),
          ),
          Text(
            label,
            style: TextStyle(fontSize: 12, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }

  Widget _buildTag(String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: TextStyle(
            fontSize: 14, color: Colors.grey[700], fontWeight: FontWeight.w500),
      ),
    );
  }

  Widget _buildSocialProofCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF9FAFB),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: Row(
        children: [
          // Avatar Stack Placeholder
          SizedBox(
            width: 100,
            height: 32,
            child: Stack(
              children: [
                _buildCircleAvatar('https://i.pravatar.cc/100?u=1', 0),
                _buildCircleAvatar('https://i.pravatar.cc/100?u=2', 25),
                _buildCircleAvatar('https://i.pravatar.cc/100?u=3', 50),
                Positioned(
                  left: 75,
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                    child: const Center(
                      child: Text('+128',
                          style: TextStyle(
                              fontSize: 10, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
          // Mini Bar Chart Placeholder
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              _buildBar(12, const Color(0xFFBFDBFE)),
              _buildBar(20, const Color(0xFF93C5FD)),
              _buildBar(15, const Color(0xFF60A5FA)),
              _buildBar(28, const Color(0xFF3B82F6)),
              _buildBar(24, const Color(0xFFBFDBFE)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCircleAvatar(String url, double left) {
    return Positioned(
      left: left,
      child: Container(
        padding: const EdgeInsets.all(2),
        decoration:
            const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
        child: CircleAvatar(
          radius: 14,
          backgroundImage: NetworkImage(url),
        ),
      ),
    );
  }

  Widget _buildBar(double height, Color color) {
    return Container(
      margin: const EdgeInsets.only(left: 4),
      width: 6,
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }
}
