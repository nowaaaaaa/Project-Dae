import unittest
from server import compareVersions

class compareVersionscompareVersions(unittest.TestCase):
    def compareVersions_version_between_start_and_end(self):
        self.assertTrue(compareVersions('2.42.2+dfsg-1+deb11u1', '2.13.1-4.2', '6.2_p20200523-r0'))
        self.assertTrue(compareVersions('1.66.1-1+b1', '1.31.1-r21', '2.13.1-4.2'))
        self.assertFalse(compareVersions('20201115', '20180224.1+nmu1', '3.118ubuntu5'))

    def compareVersions_version_less_than_start_or_greater_than_end(self):
        self.assertFalse(compareVersions('2.42.2+dfsg-1+deb11u1', '3.118ubuntu5', '8.32-4.1ubuntu1'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '2.13.1-4.2', '2.42.2+dfsg-1+deb11u1'))
        self.assertFalse(compareVersions('20201115', '6.2_p20200523-r0', '20180224.1+nmu1'))

    def compareVersions_any_as_wildcard(self):
        self.assertTrue(compareVersions('2.42.2+dfsg-1+deb11u1', 'any', '6.2_p20200523-r0'))
        self.assertTrue(compareVersions('1.66.1-1+b1', '1.31.1-r21', 'any'))
        self.assertTrue(compareVersions('20201115', 'any', 'any'))
        self.assertFalse(compareVersions('2.42.2+dfsg-1+deb11u1', '3.118ubuntu5', 'any'))
        self.assertFalse(compareVersions('1.66.1-1+b1', 'any', '1.13.1-4.2'))

    def compareVersions_version_strings_with_non_numeric_characters(self):
        self.assertTrue(compareVersions('1.31.1-r21', '1.31.1-r20', '1.31.1-r22'))
        self.assertTrue(compareVersions('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u0', '2.42.2+dfsg-1+deb11u2'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '1.66.1-1+b2', '1.66.1-1+b3'))
        self.assertFalse(compareVersions('20201115', '20201116', '20201117'))

    def compareVersions_version_with_different_number_of_segments(self):
        self.assertTrue(compareVersions('20201115', '202011', '202012'))
        self.assertTrue(compareVersions('1.66.1-1+b1', '1.66', '1.67'))
        self.assertFalse(compareVersions('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u1.1', '2.42.2+dfsg-1+deb11u1.2'))

    def compareVersions_version_with_leading_zeros(self):
        self.assertTrue(compareVersions('0012ubuntu4.3', '0012ubuntu4.2', '0012ubuntu4.4'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '01.66.1-1+b2', '1.66.1-1+b3'))

    def compareVersions_version_with_trailing_zeros(self):
        self.assertTrue(compareVersions('3.118ubuntu5', '3.118ubuntu4', '3.118ubuntu6'))
        self.assertFalse(compareVersions('2.13.1-4.2', '2.13.1-4.20', '2.13.1-4.3'))

    def compareVersions_version_with_multiple_zeros(self):
        self.assertTrue(compareVersions('20180224.1+nmu1', '20180224.1', '20180224.2'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '1.66.1-1+0002', '1.66.1-1+0003'))

    def compareVersions_version_with_non_numeric_characters(self):
        self.assertTrue(compareVersions('1.31.1-r21', '1.31.1-r21', '1.31.1-r22')) # is bozo moet eig true zijn
        self.assertTrue(compareVersions('2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u1', '2.42.2+dfsg-1+deb11u2')) # is bozo moet eig true zijn
        self.assertTrue(compareVersions('1.66.1-1+b1', '1.66.1-1+b1', '1.66.1-1+b2')) # is bozo moet eig true zijn
        self.assertTrue(compareVersions('20201115', '20201115', '20201116')) # is bozo moet eig true zijn

    def compareVersions_invalid_version(self):
        self.assertFalse(compareVersions('', '1.66.1-1+b1', '1.66.1-1+b2'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '', '1.66.1-1+b2'))
        self.assertFalse(compareVersions('1.66.1-1+b1', '1.66.1-1+b2', ''))

if __name__ == '__main__':
    unittest.main()