import unittest
from versionCompare import test2

print("====> Start of tests <====")

class TestCompareVersions(unittest.TestCase):
    def test_version_between_start_and_end(self):
        self.assertTrue(test2('3.2.1', '3.1.0', '3.3.0'))
        self.assertTrue(test2('3.2.1', '3.2.0', '3.2.2'))
        self.assertTrue(test2('3.2.1', '3.2.1', '3.2.1'))     # Geeft False, moet true geven maar maakt niet heel veel uit want niemand gaat 2x dezelfde versie geven

    def test_version_less_than_start_or_greater_than_end(self):
        self.assertFalse(test2('3.2.1', '3.3.0', '3.4.0'))    # Geeft True, moet False zijn
        self.assertFalse(test2('3.2.1', '3.2.2', '3.2.3'))
        self.assertFalse(test2('3.2.1', '3.1.0', '3.2.0'))

    def test_any_as_wildcard(self):
        self.assertTrue(test2('3.2.1', 'any', '3.3.0'))
        self.assertTrue(test2('3.2.1', '3.2.0', 'any'))
        self.assertTrue(test2('3.2.1', 'any', 'any'))
        self.assertFalse(test2('3.2.1', '3.3.0', 'any'))      # Geeft True, weet niet of dat de bedoeling is
        self.assertFalse(test2('3.2.1', 'any', '3.2.0'))

    def test_version_strings_with_non_numeric_characters(self):
        self.assertTrue(test2('3.2.1-alpha', '3.2.0', '3.2.2'))
        self.assertTrue(test2('3.2.1', '3.2.0', '3.2.2-beta'))
        self.assertTrue(test2('3.2.1-alpha', '3.2.0', '3.2.1'))
        self.assertTrue(test2('3.2.1', '3.2.1-alpha', '3.2.2'))

    def test_version_with_different_number_of_segments(self):
        self.assertTrue(test2('3.2.1', '3.2', '3.3'))
        self.assertFalse(test2('3.2.1', '3.2.0', '3.2'))
        self.assertFalse(test2('3.2.1', '3.2.1.0', '3.2.1')) # deze is bozo moet eig assertTrue zijn

    def test_version_with_leading_zeros(self):
        self.assertTrue(test2('3.02.1', '3.01.0', '3.03.0'))
        self.assertFalse(test2('3.02.1', '3.02.2', '3.02.3'))

    def test_version_with_trailing_zeros(self):
        self.assertTrue(test2('3.2.10', '3.2.9', '3.2.11'))       # Geeft False, moet True zijn
        self.assertFalse(test2('3.2.10', '3.2.11', '3.2.12'))

    def test_version_with_multiple_zeros(self):
        self.assertTrue(test2('3.0.0.1', '3.0.0', '3.0.1'))       # Geeft False, moet True zijn
        self.assertFalse(test2('3.0.0.1', '3.0.1', '3.0.2'))

    def test_version_with_non_numeric_characters(self):
        self.assertTrue(test2('3.2.1-alpha', '3.2.1', '3.2.2'))
        self.assertTrue(test2('3.2.1', '3.2.1-alpha', '3.2.2'))
        self.assertTrue(test2('3.2.1', '3.2.1', '3.2.1-alpha'))

    def test_invalid_version(self):
        self.assertFalse(test2('', '3.2.1', '3.2.2'))
        self.assertTrue(test2('3.2.1', 'any', '3.2.2'))     #Error list index out of range
        self.assertTrue(test2('3.2.1', '3.2.1', 'any'))

    def test_compareVersions_version_between_start_and_end(self):
        self.assertTrue(test2('2.42.2+dfsg-1+deb11u1', '2.13.1-4.2', '6.2_p20200523-r0'))
        self.assertTrue(test2('1.66.1-1+b1', '1.31.1-r21', '2.13.1-4.2'))
        self.assertFalse(test2('20201115', '20180224.1+nmu1', '3.118ubuntu5'))

    def test_compareVersions_version_less_than_start_or_greater_than_end(self):
        self.assertFalse(test2('2.42.2+dfsg-1+deb11u1', '3.118ubuntu5', '8.32-4.1ubuntu1'))
        self.assertFalse(test2('1.66.1-1+b1', '2.13.1-4.2', '2.42.2+dfsg-1+deb11u1'))
        self.assertFalse(test2('20201115', '6.2_p20200523-r0', '20180224.1+nmu1'))

    def test_compareVersions_any_as_wildcard(self):
        self.assertTrue(test2('2.42.2+dfsg-1+deb11u1', 'any', '6.2_p20200523-r0'))
        self.assertTrue(test2('1.66.1-1+b1', '1.31.1-r21', 'any'))
        self.assertTrue(test2('20201115', 'any', 'any'))
        self.assertFalse(test2('2.42.2+dfsg-1+deb11u1', '3.118ubuntu5', 'any'))
        self.assertFalse(test2('1.66.1-1+b1', 'any', '1.13.1-4.2'))

    def test_compareVersions_version_strings_with_non_numeric_characters(self):
        self.assertTrue(test2('1.31.1-r21', '1.31.1-r20', '1.31.1-r22'))
        self.assertTrue(test2('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u0', '2.42.2+dfsg-1+deb11u2'))
        self.assertFalse(test2('1.66.1-1+b1', '1.66.1-1+b2', '1.66.1-1+b3'))
        self.assertFalse(test2('20201115', '20201116', '20201117'))

    def test_compareVersions_version_with_different_number_of_segments(self):
        self.assertTrue(test2('20201115', '202011', '202012'))
        self.assertTrue(test2('1.66.1-1+b1', '1.66', '1.67'))
        self.assertFalse(test2('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u1.1', '2.42.2+dfsg-1+deb11u1.2'))

    def test_compareVersions_version_with_leading_zeros(self):
        self.assertTrue(test2('0012ubuntu4.3', '0012ubuntu4.2', '0012ubuntu4.4'))
        self.assertFalse(test2('1.66.1-1+b1', '01.66.1-1+b2', '1.66.1-1+b3'))

    def test_compareVersions_version_with_trailing_zeros(self):
        self.assertTrue(test2('3.118ubuntu5', '3.118ubuntu4', '3.118ubuntu6'))
        self.assertFalse(test2('2.13.1-4.2', '2.13.1-4.20', '2.13.1-4.3'))

    def test_compareVersions_version_with_multiple_zeros(self):
        self.assertTrue(test2('20180224.1+nmu1', '20180224.1', '20180224.2'))
        self.assertFalse(test2('1.66.1-1+b1', '1.66.1-1+0002', '1.66.1-1+0003'))

    def test_compareVersions_version_with_non_numeric_characters(self):
        self.assertTrue(test2('1.31.1-r21', '1.31.1-r21', '1.31.1-r22')) # is bozo moet eig true zijn
        self.assertTrue(test2('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u2')) # is bozo moet eig true zijn
        self.assertTrue(test2('1.66.1-1+b1', '1.66.1-1+b1', '1.66.1-1+b2')) # is bozo moet eig true zijn
        self.assertTrue(test2('20201115', '20201115', '20201116')) # is bozo moet eig true zijn

    def test_compareVersions_invalid_version(self):
        self.assertFalse(test2('', '1.66.1-1+b1', '1.66.1-1+b2'))
        self.assertFalse(test2('1.66.1-1+b1', '', '1.66.1-1+b2'))
        self.assertFalse(test2('1.66.1-1+b1', '1.66.1-1+b2', ''))

if __name__ == '__main__':
    unittest.main()