import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';
import 'package:path_provider/path_provider.dart';
import '../theme/app_theme.dart';
import '../utils/sacred_styles.dart';
import '../widgets/premium_effects.dart';

class PDFViewerScreen extends StatefulWidget {
  final String title;
  const PDFViewerScreen({super.key, required this.title});

  @override
  State<PDFViewerScreen> createState() => _PDFViewerScreenState();
}

class _PDFViewerScreenState extends State<PDFViewerScreen> {
  String? _localFilePath;
  bool _isLoading = true;
  String? _errorMessage;
  int _totalPages = 0;
  int _currentPage = 0;
  bool _isReady = false;
  PDFViewController? _pdfViewController;

  @override
  void initState() {
    super.initState();
    _downloadAndLoadPDF();
  }

  Future<void> _downloadAndLoadPDF() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final dir = await getTemporaryDirectory();
      final file = File('${dir.path}/${widget.title}');

      // Cache Data System: Check if the file already exists locally
      if (await file.exists() && await file.length() > 0) {
        if (mounted) {
          setState(() {
            _localFilePath = file.path;
            _isLoading = false;
          });
        }
        return;
      }

      // Download from a fallback remote URL (e.g. Supabase storage or Archive.org)
      String url = 'https://dn720003.ca.archive.org/0/items/satsangke-bikhre-moti/Satsangke_Bikhre_Moti_339.pdf';
      if (widget.title.contains('Math') || widget.title.contains('Formula')) {
        url = 'https://tilimltxgeucefxzerqi.supabase.co/storage/v1/object/public/pdf/Clinical%20Ai%20Architecture%20Diagrams.pdf';
      }

      final client = HttpClient();
      client.connectionTimeout = const Duration(seconds: 15);
      final request = await client.getUrl(Uri.parse(url));
      final response = await request.close();

      if (response.statusCode == 200) {
        final bytes = await response.fold<List<int>>([], (prev, element) => prev..addAll(element));
        await file.writeAsBytes(bytes);

        if (mounted) {
          setState(() {
            _localFilePath = file.path;
            _isLoading = false;
          });
        }
      } else {
        throw HttpException('Server returned status code ${response.statusCode}');
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = e.toString();
          _isLoading = false;
        });
      }
    }
  }

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
          widget.title,
          style: SacredStyles.withColor(
            SacredStyles.inter16.copyWith(fontWeight: FontWeight.bold),
            theme.colorScheme.onSurface,
          ),
        ),
        actions: [
          if (_localFilePath != null)
            BouncyButton(
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Offline file saved at: ${_localFilePath!.split('/').last}'),
                    behavior: SnackBarBehavior.floating,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                );
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Icon(Icons.share_rounded, color: theme.colorScheme.onSurface),
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          const Positioned.fill(child: GrainyTextureOverlay(opacity: 0.01)),
          if (_isLoading)
            Center(
              child: PremiumGlassContainer(
                blur: 15,
                opacity: 0.05,
                borderRadius: BorderRadius.circular(24),
                borderColor: AppColors.primary.withValues(alpha: 0.2),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 28),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const CircularProgressIndicator(color: AppColors.primary),
                      const SizedBox(height: 20),
                      Text(
                        'Securing connection...',
                        style: SacredStyles.withColor(
                          SacredStyles.mono12Bold.copyWith(letterSpacing: 1.0),
                          theme.colorScheme.onSurface,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Caching resource locally',
                        style: SacredStyles.withColor(
                          SacredStyles.inter12,
                          theme.colorScheme.onSurface.withValues(alpha: 0.5),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            )
          else if (_errorMessage != null)
            Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.error_outline_rounded, size: 64, color: Colors.redAccent),
                    const SizedBox(height: 16),
                    Text(
                      'Error loading PDF',
                      style: SacredStyles.withColor(
                        SacredStyles.inter16.copyWith(fontWeight: FontWeight.bold),
                        theme.colorScheme.onSurface,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _errorMessage!,
                      textAlign: TextAlign.center,
                      style: SacredStyles.withColor(
                        SacredStyles.inter12,
                        theme.colorScheme.onSurface.withValues(alpha: 0.6),
                      ),
                    ),
                    const SizedBox(height: 24),
                    BouncyButton(
                      onTap: _downloadAndLoadPDF,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withValues(alpha: 0.3),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.refresh_rounded, color: Colors.white),
                            const SizedBox(width: 8),
                            Text(
                              'Retry',
                              style: SacredStyles.withColor(
                                SacredStyles.inter14.copyWith(fontWeight: FontWeight.bold),
                                Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
          else if (_localFilePath != null)
            PDFView(
              filePath: _localFilePath,
              enableSwipe: true,
              swipeHorizontal: false,
              autoSpacing: true,
              pageFling: true,
              pageSnap: true,
              onRender: (pages) {
                setState(() {
                  _totalPages = pages ?? 0;
                  _isReady = true;
                });
              },
              onError: (error) {
                setState(() {
                  _errorMessage = error.toString();
                });
              },
              onPageError: (page, error) {
                setState(() {
                  _errorMessage = error.toString();
                });
              },
              onViewCreated: (PDFViewController controller) {
                _pdfViewController = controller;
              },
              onPageChanged: (page, total) {
                setState(() {
                  _currentPage = page ?? 0;
                });
              },
            ),

          // Page indicator overlay
          if (_isReady && _totalPages > 0)
            Positioned(
              bottom: 110,
              left: 0,
              right: 0,
              child: Center(
                child: PremiumGlassContainer(
                  blur: 10,
                  opacity: 0.12,
                  borderRadius: BorderRadius.circular(16),
                  borderColor: theme.colorScheme.onSurface.withValues(alpha: 0.2),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: Text(
                      '${_currentPage + 1} / $_totalPages',
                      style: SacredStyles.withColor(
                        SacredStyles.mono10Bold.copyWith(letterSpacing: 1.5),
                        theme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
              ),
            ),

          // Floating Toolbar
          if (!_isLoading && _errorMessage == null)
            Positioned(
              bottom: 40,
              left: 24,
              right: 24,
              child: PremiumGlassContainer(
                blur: 15,
                opacity: 0.08,
                showShimmer: true,
                borderRadius: BorderRadius.circular(24),
                borderColor: theme.colorScheme.outline.withValues(alpha: 0.2),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.15),
                    blurRadius: 24,
                    offset: const Offset(0, 8),
                  ),
                ],
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      BouncyButton(
                        onTap: () {
                          if (_currentPage > 0) {
                            _pdfViewController?.setPage(_currentPage - 1);
                          }
                        },
                        child: _buildToolIcon(context, Icons.navigate_before_rounded, 'Prev'),
                      ),
                      BouncyButton(
                        onTap: () {
                          if (_currentPage < _totalPages - 1) {
                            _pdfViewController?.setPage(_currentPage + 1);
                          }
                        },
                        child: _buildToolIcon(context, Icons.navigate_next_rounded, 'Next'),
                      ),
                      BouncyButton(
                        onTap: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Bookmarked page ${_currentPage + 1}'),
                              behavior: SnackBarBehavior.floating,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                          );
                        },
                        child: _buildToolIcon(context, Icons.bookmark_add_rounded, 'Bookmark'),
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

  Widget _buildToolIcon(BuildContext context, IconData icon, String label) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: theme.colorScheme.onSurface, size: 26),
          const SizedBox(height: 4),
          Text(
            label.toUpperCase(),
            style: SacredStyles.withColor(
              SacredStyles.mono10Bold.copyWith(letterSpacing: 1.0),
              theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
          ),
        ],
      ),
    );
  }
}

