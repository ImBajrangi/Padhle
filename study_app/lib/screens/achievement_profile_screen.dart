import 'package:flutter/material.dart';

class AchievementProfileScreen extends StatelessWidget {
  const AchievementProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F8F5),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CircleAvatar(
            backgroundColor: Colors.white,
            child: IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.black, size: 20),
              onPressed: () => Navigator.pop(context),
            ),
          ),
        ),
        title: const Text('Profile',
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: CircleAvatar(
              backgroundColor: Colors.white,
              child: IconButton(
                icon: const Icon(Icons.settings, color: Colors.black, size: 20),
                onPressed: () {},
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 20),
            _buildXPCircleSection(),
            const SizedBox(height: 48),
            _buildStatsHeader(),
            const SizedBox(height: 16),
            _buildStatsGrid(),
            const SizedBox(height: 40),
            _buildBadgesSection(),
            const SizedBox(height: 40),
            _buildLeaderboardSection(),
            const SizedBox(height: 120),
          ],
        ),
      ),
    );
  }

  Widget _buildXPCircleSection() {
    return Column(
      children: [
        // 3D Sphere
        Container(
          width: 200,
          height: 200,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFF4E225).withOpacity(0.4),
                blurRadius: 40,
                offset: const Offset(0, 20),
              ),
            ],
            gradient: const RadialGradient(
              center: Alignment(-0.3, -0.3),
              colors: [
                Color(0xFFFFF9C4),
                Color(0xFFF4E225),
                Color(0xFFF57F17),
              ],
              stops: [0.0, 0.6, 1.0],
            ),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Inner Glow effect
              Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                      color: Colors.white.withOpacity(0.3), width: 2),
                ),
              ),
              const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    '14',
                    style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF1E293B)),
                  ),
                  Text(
                    'LEVEL',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF1E293B),
                        letterSpacing: 2),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        const Text(
          'Knowledge Seeker',
          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text(
          '750 / 1000 XP to Level 15',
          style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
              fontWeight: FontWeight.w500),
        ),
        const SizedBox(height: 20),
        // XP Bar
        Container(
          width: double.infinity,
          height: 16,
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(8),
            boxShadow: const [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 4,
                offset: Offset(0, 2),
              )
            ],
          ),
          child: Stack(
            children: [
              FractionallySizedBox(
                widthFactor: 0.75,
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFF4E225),
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                          color: const Color(0xFFF4E225).withOpacity(0.6),
                          blurRadius: 10),
                    ],
                  ),
                ),
              ),
              // Shine
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [
                        Colors.transparent,
                        Colors.white.withOpacity(0.2),
                        Colors.transparent
                      ],
                      stops: const [0.0, 0.5, 1.0],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStatsHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text('Stats',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        TextButton(
          onPressed: () {},
          child: const Text('View All',
              style:
                  TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }

  Widget _buildStatsGrid() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 1.25,
      children: [
        _buildStatCard(
            Icons.menu_book, '142', 'Notes Read', const Color(0xFFF4E225)),
        _buildStatCard(
            Icons.check_circle, '89%', 'Avg. Score', Colors.green[400]!),
        _buildStatCard(Icons.local_fire_department, '12', 'Day Streak',
            Colors.orange[400]!),
        _buildStatCard(Icons.timer, '24h', 'Study Time', Colors.purple[400]!),
      ],
    );
  }

  Widget _buildStatCard(
      IconData icon, String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.grey[100]!),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                value,
                style:
                    const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              Text(
                label,
                style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[400],
                    letterSpacing: 0.5),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBadgesSection() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Badges',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text('12/30',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
        const SizedBox(height: 20),
        SizedBox(
          height: 120,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              _buildBadge('Speed Reader', Icons.speed, true),
              _buildBadge('PDF Master', Icons.picture_as_pdf, true),
              _buildBadge('Night Owl', Icons.dark_mode, false),
              _buildBadge('Team Player', Icons.groups, false),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBadge(String label, IconData icon, bool isUnlocked) {
    return Padding(
      padding: const EdgeInsets.only(right: 20),
      child: Column(
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isUnlocked
                  ? const Color(0xFFF4E225).withOpacity(0.1)
                  : Colors.grey[100],
              border: Border.all(
                  color:
                      isUnlocked ? const Color(0xFFF4E225) : Colors.grey[300]!,
                  width: 2),
              boxShadow: isUnlocked
                  ? [
                      BoxShadow(
                          color: const Color(0xFFF4E225).withOpacity(0.3),
                          blurRadius: 10)
                    ]
                  : [],
            ),
            child: Icon(icon,
                color: isUnlocked ? const Color(0xFF1E293B) : Colors.grey[400],
                size: 32),
          ),
          const SizedBox(height: 8),
          Text(label,
              style:
                  const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildLeaderboardSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Leaderboard',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        const SizedBox(height: 20),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.04),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Colors.black.withOpacity(0.05)),
          ),
          child: Row(
            children: [
              const Column(
                children: [
                  Icon(Icons.arrow_drop_up, color: Color(0xFFF4E225)),
                  Text('42',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(width: 20),
              Container(width: 1, height: 40, color: Colors.grey[300]),
              const SizedBox(width: 20),
              const Expanded(
                child: SizedBox(
                  height: 44,
                  child: Stack(
                    children: [
                      Positioned(
                        left: 0,
                        child: CircleAvatar(
                            backgroundImage:
                                NetworkImage('https://i.pravatar.cc/100?u=u1'),
                            radius: 20),
                      ),
                      Positioned(
                        left: 28,
                        child: CircleAvatar(
                            backgroundImage:
                                NetworkImage('https://i.pravatar.cc/100?u=u2'),
                            radius: 22,
                            backgroundColor: Color(0xFFF4E225)),
                      ),
                      Positioned(
                        left: 60,
                        child: CircleAvatar(
                            backgroundImage:
                                NetworkImage('https://i.pravatar.cc/100?u=u3'),
                            radius: 20),
                      ),
                    ],
                  ),
                ),
              ),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('GRADE 10',
                      style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey)),
                  Text('Top 15%',
                      style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFFF4E225))),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
