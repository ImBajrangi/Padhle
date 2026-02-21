import 'package:flutter_test/flutter_test.dart';
import 'package:study_app/main.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const StudyApp());

    // Verify that our app starts and shows the welcome message.
    expect(find.text('Welcome back,'), findsOneWidget);
    expect(find.text('Alex Harrison 👋'), findsOneWidget);
  });
}
