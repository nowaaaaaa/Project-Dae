import unittest
from server import compareVersions

print("====> Start of tests <====")

class TestCompareVersions(unittest.TestCase):
    def test_version_between_start_and_end(self):
        self.assertTrue(compareVersions('3.2.1', '3.1.0', '3.3.0'))
        self.assertTrue(compareVersions('3.2.1', '3.2.0', '3.2.2'))
        self.assertTrue(compareVersions('3.2.1', '3.2.1', '3.2.1'))     # Geeft False, moet true geven maar maakt niet heel veel uit want niemand gaat 2x dezelfde versie geven

    def test_version_less_than_start_or_greater_than_end(self):
        self.assertFalse(compareVersions('3.2.1', '3.3.0', '3.4.0'))    # Geeft True, moet False zijn
        self.assertFalse(compareVersions('3.2.1', '3.2.2', '3.2.3'))
        self.assertFalse(compareVersions('3.2.1', '3.1.0', '3.2.0'))

    def test_any_as_wildcard(self):
        self.assertTrue(compareVersions('3.2.1', 'any', '3.3.0'))
        self.assertTrue(compareVersions('3.2.1', '3.2.0', 'any'))
        self.assertTrue(compareVersions('3.2.1', 'any', 'any'))
        self.assertFalse(compareVersions('3.2.1', '3.3.0', 'any'))      # Geeft True, weet niet of dat de bedoeling is
        self.assertFalse(compareVersions('3.2.1', 'any', '3.2.0'))

    def test_version_strings_with_non_numeric_characters(self):
        self.assertTrue(compareVersions('3.2.1-alpha', '3.2.0', '3.2.2'))
        self.assertTrue(compareVersions('3.2.1', '3.2.0', '3.2.2-beta'))
        self.assertFalse(compareVersions('3.2.1-alpha', '3.2.0', '3.2.1'))
        self.assertFalse(compareVersions('3.2.1', '3.2.1-alpha', '3.2.2'))

    def test_version_with_different_number_of_segments(self):
        self.assertTrue(compareVersions('3.2.1', '3.2', '3.3'))
        self.assertTrue(compareVersions('3.2.1', '3.2.0', '3.2'))
        self.assertFalse(compareVersions('3.2.1', '3.2.1.0', '3.2.1'))

    def test_version_with_leading_zeros(self):
        self.assertTrue(compareVersions('3.02.1', '3.01.0', '3.03.0'))
        self.assertFalse(compareVersions('3.02.1', '3.02.2', '3.02.3'))

    def test_version_with_trailing_zeros(self):
        self.assertTrue(compareVersions('3.2.10', '3.2.9', '3.2.11'))       # Geeft False, moet True zijn
        self.assertFalse(compareVersions('3.2.10', '3.2.11', '3.2.12'))

    def test_version_with_multiple_zeros(self):
        self.assertTrue(compareVersions('3.0.0.1', '3.0.0', '3.0.1'))       # Geeft False, moet True zijn
        self.assertFalse(compareVersions('3.0.0.1', '3.0.1', '3.0.2'))

    def test_version_with_non_numeric_characters(self):
        self.assertFalse(compareVersions('3.2.1-alpha', '3.2.1', '3.2.2'))
        self.assertFalse(compareVersions('3.2.1', '3.2.1-alpha', '3.2.2'))
        self.assertFalse(compareVersions('3.2.1', '3.2.1', '3.2.1-alpha'))

    def test_invalid_version(self):
        self.assertFalse(compareVersions('', '3.2.1', '3.2.2'))
        self.assertFalse(compareVersions('3.2.1', '', '3.2.2'))     #Error list index out of range
        self.assertFalse(compareVersions('3.2.1', '3.2.1', ''))

if __name__ == '__main__':
    unittest.main()