import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserPrefs {
  final bool isModernMode;
  final int selectedGrade;

  UserPrefs({
    this.isModernMode = true,
    this.selectedGrade = 10,
  });

  UserPrefs copyWith({
    bool? isModernMode,
    int? selectedGrade,
  }) {
    return UserPrefs(
      isModernMode: isModernMode ?? this.isModernMode,
      selectedGrade: selectedGrade ?? this.selectedGrade,
    );
  }
}

class UserPrefsNotifier extends StateNotifier<UserPrefs> {
  UserPrefsNotifier() : super(UserPrefs());

  void toggleModernMode() {
    state = state.copyWith(isModernMode: !state.isModernMode);
  }

  void setGrade(int grade) {
    state = state.copyWith(selectedGrade: grade);
  }
}

final userPrefsProvider =
    StateNotifierProvider<UserPrefsNotifier, UserPrefs>((ref) {
  return UserPrefsNotifier();
});
