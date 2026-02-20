import 'package:flutter/material.dart';

class SubscriptionPlansScreen extends StatelessWidget {
  const SubscriptionPlansScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'PRO ACCESS',
          style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Colors.grey[600],
              letterSpacing: 1.2),
        ),
        centerTitle: true,
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text('Restore',
                style: TextStyle(
                    color: Color(0xFFFBBF24), fontWeight: FontWeight.bold)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 20),

            // Annual Pro Hero Card
            _buildAnnualHeroCard(),

            const SizedBox(height: 48),

            // Premium Benefits Header
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Premium Benefits',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 24),

            // Benefits Grid
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 0.9,
              children: [
                _buildBenefitItem(
                    Icons.insert_drive_file,
                    'Offline PDFs',
                    'Study without an active internet connection.',
                    const Color(0xFFFEF3C7)),
                _buildBenefitItem(
                    Icons.psychology,
                    'Expert Help',
                    '24/7 priority support from top tutors.',
                    const Color(0xFFEFF6FF)),
                _buildBenefitItem(
                    Icons.block,
                    'Ad-Free',
                    'Zero interruptions during your study flow.',
                    const Color(0xFFFDF2F2)),
                _buildBenefitItem(
                    Icons.insights,
                    'Analytics',
                    'Visual insights into your learning progress.',
                    const Color(0xFFF0FDF4)),
              ],
            ),

            const SizedBox(height: 40),

            // Social Proof Banner
            _buildSocialProofBanner(),

            const SizedBox(height: 40),

            // CTA Button
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
                child: Text(
                  'GO PRO NOW',
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w900,
                      color: Colors.black),
                ),
              ),
            ),

            const SizedBox(height: 16),
            Text(
              'CANCEL ANYTIME. AUTOMATIC RENEWAL.',
              style: TextStyle(
                  fontSize: 10, color: Colors.grey[500], letterSpacing: 0.5),
            ),
            const SizedBox(height: 32),

            // Bottom Links
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildFooterLink('Terms of Use'),
                const SizedBox(width: 24),
                _buildFooterLink('Privacy Policy'),
              ],
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildAnnualHeroCard() {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(40),
        border: Border.all(color: const Color(0xFFFEF3C7), width: 2),
      ),
      padding: const EdgeInsets.all(32),
      child: Column(
        children: [
          // Icon/Badge
          Container(
            width: 80,
            height: 80,
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
              boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10)],
            ),
            child: const Center(
              child: Icon(Icons.stars, color: Color(0xFFFBBF24), size: 40),
            ),
          ),
          const SizedBox(height: 24),

          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF3C7),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text(
              'BEST VALUE • SAVE 40%',
              style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFFD97706)),
            ),
          ),
          const SizedBox(height: 16),

          const Text(
            'Annual Pro',
            style: TextStyle(
                fontSize: 36, fontWeight: FontWeight.bold, color: Colors.black),
          ),
          const SizedBox(height: 8),
          const Text(
            'Full access to all grade 8-12 resources',
            style: TextStyle(fontSize: 14, color: Colors.grey),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),

          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('\$',
                  style: TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold, height: 1.5)),
              Text('49.99',
                  style: TextStyle(
                      fontSize: 64,
                      fontWeight: FontWeight.w900,
                      letterSpacing: -2)),
              Padding(
                padding: EdgeInsets.only(top: 36, left: 4),
                child: Text('/year',
                    style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey,
                        fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const Text(
            'ONLY \$4.16 PER MONTH',
            style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: Color(0xFFFBBF24)),
          ),
        ],
      ),
    );
  }

  Widget _buildBenefitItem(
      IconData icon, String title, String subtitle, Color iconBg) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.grey[100]!),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.02),
              blurRadius: 10,
              offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: iconBg,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: Colors.black87, size: 20),
          ),
          const Spacer(),
          Text(title,
              style:
                  const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style:
                TextStyle(fontSize: 11, color: Colors.grey[500], height: 1.3),
          ),
        ],
      ),
    );
  }

  Widget _buildSocialProofBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: Colors.grey[200]!, style: BorderStyle.solid),
      ),
      child: Row(
        children: [
          // Small Avatar Stack
          SizedBox(
            width: 70,
            height: 24,
            child: Stack(
              children: [
                _buildSmallAvatar('https://i.pravatar.cc/100?u=a', 0),
                _buildSmallAvatar('https://i.pravatar.cc/100?u=b', 18),
                _buildSmallAvatar('https://i.pravatar.cc/100?u=c', 36),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: RichText(
              text: const TextSpan(
                style: TextStyle(fontSize: 13, color: Colors.black87),
                children: [
                  TextSpan(text: 'Joined by '),
                  TextSpan(
                      text: '12,000+ students',
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  TextSpan(text: ' this week'),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSmallAvatar(String url, double left) {
    return Positioned(
      left: left,
      child: Container(
        padding: const EdgeInsets.all(1.5),
        decoration:
            const BoxDecoration(color: Colors.white, shape: BoxShape.circle),
        child: CircleAvatar(
          radius: 12,
          backgroundImage: NetworkImage(url),
        ),
      ),
    );
  }

  Widget _buildFooterLink(String label) {
    return Text(
      label,
      style: TextStyle(
          fontSize: 12,
          color: Colors.grey[500],
          fontWeight: FontWeight.w500,
          decoration: TextDecoration.underline),
    );
  }
}
