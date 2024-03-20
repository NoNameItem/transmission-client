# Changelog

## [2.1.0](https://github.com/NoNameItem/transmission-client/compare/v2.0.0...v2.1.0) (2024-03-20)


### Features

* **torrents:** Sorting by Remaining Time now sorts by remainong time and time to idle stop combined ([c037321](https://github.com/NoNameItem/transmission-client/commit/c0373216b43533448c25a146074fce0f5129edd3))

## [2.0.0](https://github.com/NoNameItem/transmission-client/compare/v1.1.1...v2.0.0) (2024-02-16)


### ⚠ BREAKING CHANGES

* **connection:** connection settings interface

### Features

* **connection:** connection settings interface ([bb1f59f](https://github.com/NoNameItem/transmission-client/commit/bb1f59ffcc81ac2bb090d9cbae713d98625ba0aa))
* **torrents:** Added idle stop time to torrent compact display ([e93a898](https://github.com/NoNameItem/transmission-client/commit/e93a89812b18e95863daa1e07b8c57ee3ab5ce48))
* **torrents:** Added idle stop time to torrent display ([9b477ba](https://github.com/NoNameItem/transmission-client/commit/9b477baa51f1d768df58ea392ab7c6dde1d9db18))
* **torrents:** save used torrent folders in local storage for later reuse ([0cbfd60](https://github.com/NoNameItem/transmission-client/commit/0cbfd601fe41a4abdcf43ab5a5d55e7cb437557e))

## [1.1.1](https://github.com/NoNameItem/transmission-client/compare/v1.1.0...v1.1.1) (2024-02-03)


### Bug Fixes

* version ([0564018](https://github.com/NoNameItem/transmission-client/commit/0564018edb9d29bc6a3be37bd29065cd1b3fbc23))

## [1.1.0](https://github.com/NoNameItem/transmission-client/compare/v1.0.0...v1.1.0) (2024-02-03)


### Features

* **menu:** expand selected torrents in compact view ([bccc103](https://github.com/NoNameItem/transmission-client/commit/bccc103d89572574a3dbf52d3af67406be9aef46))
* **menu:** hide/show menu ([7bae6d6](https://github.com/NoNameItem/transmission-client/commit/7bae6d68664241a7962b9f09c596034e96e8f257))
* **settings:** settings ([6b4111d](https://github.com/NoNameItem/transmission-client/commit/6b4111d726292de292aa04022e1c2a59ef463886))
* **settings:** stop if idle for N minutes ([08e806f](https://github.com/NoNameItem/transmission-client/commit/08e806fbf1a7b2e90a91bd2a822142bf419bee3f))
* **stats:** active download and upload count ([1b2004f](https://github.com/NoNameItem/transmission-client/commit/1b2004fd4b687e35aee8510f5f60dc72433aaadf))
* **stats:** Display stats: download and upload speed, active and total torrents count ([e91a0aa](https://github.com/NoNameItem/transmission-client/commit/e91a0aa68be93f8338ce3f1a788c06b18fb8dc37))
* **torrents:** add/remove torrents ([02670d9](https://github.com/NoNameItem/transmission-client/commit/02670d926b2bb19eae54756d260b27b93ddcec61))
* **torrents:** clear selection when torrent deleted ([7f3bd64](https://github.com/NoNameItem/transmission-client/commit/7f3bd64d9c222a5ed1b383fd33cb6c80c83855f0))
* **torrents:** colorized progress bar and progress for stopped torrents ([dbe2ac8](https://github.com/NoNameItem/transmission-client/commit/dbe2ac8f7a0b21afe7bae6d2e87ff21b5339dc38))
* **torrents:** display queue position ([e37f319](https://github.com/NoNameItem/transmission-client/commit/e37f3199b37438fd4248e8c54694bd9657683edd))
* **torrents:** download/upload count ([1adcddd](https://github.com/NoNameItem/transmission-client/commit/1adcddd6a7dc98f2df905f4807e94ae493be9901))
* **torrents:** filter errors and errors count ([64b056a](https://github.com/NoNameItem/transmission-client/commit/64b056acb067070b6a933e2612683f5e7b68a974))
* **torrents:** filtered count and filter reset ([7c21fcb](https://github.com/NoNameItem/transmission-client/commit/7c21fcb5badbedf19e7b8a005a0541cab76116cd))
* **torrents:** Highlight rows in torrent files tree on hover + multiple sorting ([c8cd790](https://github.com/NoNameItem/transmission-client/commit/c8cd790aecea161560cb29076051c1b1fa87c757))
* **torrents:** last active sorting ([c9749b2](https://github.com/NoNameItem/transmission-client/commit/c9749b2c8714d7d844b738c241da9e8fca91cb29))
* **torrents:** last active time ([3e45b66](https://github.com/NoNameItem/transmission-client/commit/3e45b66ffd26081c3d3725435495f496458e6096))
* **torrents:** move torrents in queue ([9ceec5e](https://github.com/NoNameItem/transmission-client/commit/9ceec5e55a6b4ae2531e93b685f42ef21a3a4c92))
* **torrents:** order by total size ([8f33c9d](https://github.com/NoNameItem/transmission-client/commit/8f33c9dc7bcd1869b2f330fd19a6fea18af98445))
* **torrents:** persist filter and sorting settings between page reloads ([87f9514](https://github.com/NoNameItem/transmission-client/commit/87f951481fca836deb16e37e417c1a78affa2102))
* **torrents:** selected torrents count ([11a3bec](https://github.com/NoNameItem/transmission-client/commit/11a3bec4b66cc754b0270a347f89b4519fc173d5))
* **torrents:** session stats in footer ([71d03f9](https://github.com/NoNameItem/transmission-client/commit/71d03f90e680cd7873cd1a959b5432c7aca90841))
* **torrents:** set last active time equal to time since added if torrent never was active ([69f3ea7](https://github.com/NoNameItem/transmission-client/commit/69f3ea704becf46fa5b6a5307c899154b62766ac))
* **torrents:** start/stop all torrents ([7e16891](https://github.com/NoNameItem/transmission-client/commit/7e16891da53c3fe33683dac2645b8401e3aaa601))
* **torrents:** start/stop selected ([07e41c8](https://github.com/NoNameItem/transmission-client/commit/07e41c8b5a45bb4c70c3b47aa401575edd1f41a2))
* **torrents:** time stats formatting improved ([3d127ad](https://github.com/NoNameItem/transmission-client/commit/3d127ad3f8d5176b67e0487b7e76a43d2ee7d0f4))
* **torrents:** torrent added time display ([770f3f7](https://github.com/NoNameItem/transmission-client/commit/770f3f75baf493f33957310c42032466d874b4c8))
* **torrents:** torrent files select ([f8343e8](https://github.com/NoNameItem/transmission-client/commit/f8343e89408911f91f2c4fff2531f97ceaacd687))
* **torrents:** torrent list ([6c5b0fc](https://github.com/NoNameItem/transmission-client/commit/6c5b0fcc5bb0f93c8314642d1da4afcf67300aab))
* **torrents:** torrent list compact view ([ef4494f](https://github.com/NoNameItem/transmission-client/commit/ef4494fddc8167175cd4311c184916dfdf79b10c))
* **torrents:** torrent selection ([955c2f9](https://github.com/NoNameItem/transmission-client/commit/955c2f9d69f0ba2d9775e35a9d117533f20aa918))
* **torrents:** tree-table for torrent files ([221c031](https://github.com/NoNameItem/transmission-client/commit/221c031b3f6a0ddf65a7c9cc0fac9a03604a9d93))
* **torrents:** verify selected ([bc1b369](https://github.com/NoNameItem/transmission-client/commit/bc1b36920552af62b584c634cdeae07817298991))


### Bug Fixes

* **api:** api retry timeout ([099797d](https://github.com/NoNameItem/transmission-client/commit/099797da1aaf54300811fbba00db7b10479a4aa8))
* **menu:** click on already selected torrent now removes selection ([cb89adb](https://github.com/NoNameItem/transmission-client/commit/cb89adbf0712ece9a84d64a4372395c6f42ffe3c))
* **settings:** save setting fix ([d3ff3ab](https://github.com/NoNameItem/transmission-client/commit/d3ff3ab09233a8a3ff1642c9f0ea7be3e4688344))
* **torrents:** do not show errors for queued torrents ([135950a](https://github.com/NoNameItem/transmission-client/commit/135950ab20d3ea524748742cce103e83c16e85a4))
* **torrents:** expand only single selected torrent ([00df5d6](https://github.com/NoNameItem/transmission-client/commit/00df5d6b2c5cc9e1396c215a852368aa931d2393))
* **torrents:** fixed start when added flag ([b3fbbd7](https://github.com/NoNameItem/transmission-client/commit/b3fbbd7683939a45f425674e181dab769f4ad934))
* **torrents:** get max upload ratio from session settings ([aacc853](https://github.com/NoNameItem/transmission-client/commit/aacc853513400dcbfc26e774776d357fdd166e39))
* **torrents:** minor fixes ([43c81d9](https://github.com/NoNameItem/transmission-client/commit/43c81d9bdd3489c35909860b25dcafc1aef3cf2d))
* **torrents:** minor fixes ([60052c3](https://github.com/NoNameItem/transmission-client/commit/60052c3540fcc7eac2fed14f43c049bab2a58932))
* **torrents:** search crash on regexp special characters ([9187005](https://github.com/NoNameItem/transmission-client/commit/91870057cafac7dcbccd465e6516bf0ce9bff8fe))
* **torrents:** status for errors ([7027393](https://github.com/NoNameItem/transmission-client/commit/7027393b7d0c9b302497a72d263d5a4d9b01a69e))
* **torrents:** wrap long stats in multiple lines ([01bdd45](https://github.com/NoNameItem/transmission-client/commit/01bdd457fba6d316eddcf8275885d21dc35722d9))

## [1.0.0](https://github.com/NoNameItem/transmission-client/compare/0.0.1...v0.1.0) (2024-02-03)


### Features

* **menu:** expand selected torrents in compact view ([bccc103](https://github.com/NoNameItem/transmission-client/commit/bccc103d89572574a3dbf52d3af67406be9aef46))
* **menu:** hide/show menu ([7bae6d6](https://github.com/NoNameItem/transmission-client/commit/7bae6d68664241a7962b9f09c596034e96e8f257))
* **settings:** settings ([6b4111d](https://github.com/NoNameItem/transmission-client/commit/6b4111d726292de292aa04022e1c2a59ef463886))
* **settings:** stop if idle for N minutes ([08e806f](https://github.com/NoNameItem/transmission-client/commit/08e806fbf1a7b2e90a91bd2a822142bf419bee3f))
* **stats:** active download and upload count ([1b2004f](https://github.com/NoNameItem/transmission-client/commit/1b2004fd4b687e35aee8510f5f60dc72433aaadf))
* **stats:** Display stats: download and upload speed, active and total torrents count ([e91a0aa](https://github.com/NoNameItem/transmission-client/commit/e91a0aa68be93f8338ce3f1a788c06b18fb8dc37))
* **torrents:** add/remove torrents ([02670d9](https://github.com/NoNameItem/transmission-client/commit/02670d926b2bb19eae54756d260b27b93ddcec61))
* **torrents:** clear selection when torrent deleted ([7f3bd64](https://github.com/NoNameItem/transmission-client/commit/7f3bd64d9c222a5ed1b383fd33cb6c80c83855f0))
* **torrents:** colorized progress bar and progress for stopped torrents ([dbe2ac8](https://github.com/NoNameItem/transmission-client/commit/dbe2ac8f7a0b21afe7bae6d2e87ff21b5339dc38))
* **torrents:** display queue position ([e37f319](https://github.com/NoNameItem/transmission-client/commit/e37f3199b37438fd4248e8c54694bd9657683edd))
* **torrents:** download/upload count ([1adcddd](https://github.com/NoNameItem/transmission-client/commit/1adcddd6a7dc98f2df905f4807e94ae493be9901))
* **torrents:** filter errors and errors count ([64b056a](https://github.com/NoNameItem/transmission-client/commit/64b056acb067070b6a933e2612683f5e7b68a974))
* **torrents:** filtered count and filter reset ([7c21fcb](https://github.com/NoNameItem/transmission-client/commit/7c21fcb5badbedf19e7b8a005a0541cab76116cd))
* **torrents:** Highlight rows in torrent files tree on hover + multiple sorting ([c8cd790](https://github.com/NoNameItem/transmission-client/commit/c8cd790aecea161560cb29076051c1b1fa87c757))
* **torrents:** last active sorting ([c9749b2](https://github.com/NoNameItem/transmission-client/commit/c9749b2c8714d7d844b738c241da9e8fca91cb29))
* **torrents:** last active time ([3e45b66](https://github.com/NoNameItem/transmission-client/commit/3e45b66ffd26081c3d3725435495f496458e6096))
* **torrents:** move torrents in queue ([9ceec5e](https://github.com/NoNameItem/transmission-client/commit/9ceec5e55a6b4ae2531e93b685f42ef21a3a4c92))
* **torrents:** order by total size ([8f33c9d](https://github.com/NoNameItem/transmission-client/commit/8f33c9dc7bcd1869b2f330fd19a6fea18af98445))
* **torrents:** persist filter and sorting settings between page reloads ([87f9514](https://github.com/NoNameItem/transmission-client/commit/87f951481fca836deb16e37e417c1a78affa2102))
* **torrents:** selected torrents count ([11a3bec](https://github.com/NoNameItem/transmission-client/commit/11a3bec4b66cc754b0270a347f89b4519fc173d5))
* **torrents:** session stats in footer ([71d03f9](https://github.com/NoNameItem/transmission-client/commit/71d03f90e680cd7873cd1a959b5432c7aca90841))
* **torrents:** set last active time equal to time since added if torrent never was active ([69f3ea7](https://github.com/NoNameItem/transmission-client/commit/69f3ea704becf46fa5b6a5307c899154b62766ac))
* **torrents:** start/stop all torrents ([7e16891](https://github.com/NoNameItem/transmission-client/commit/7e16891da53c3fe33683dac2645b8401e3aaa601))
* **torrents:** start/stop selected ([07e41c8](https://github.com/NoNameItem/transmission-client/commit/07e41c8b5a45bb4c70c3b47aa401575edd1f41a2))
* **torrents:** time stats formatting improved ([3d127ad](https://github.com/NoNameItem/transmission-client/commit/3d127ad3f8d5176b67e0487b7e76a43d2ee7d0f4))
* **torrents:** torrent added time display ([770f3f7](https://github.com/NoNameItem/transmission-client/commit/770f3f75baf493f33957310c42032466d874b4c8))
* **torrents:** torrent files select ([f8343e8](https://github.com/NoNameItem/transmission-client/commit/f8343e89408911f91f2c4fff2531f97ceaacd687))
* **torrents:** torrent list ([6c5b0fc](https://github.com/NoNameItem/transmission-client/commit/6c5b0fcc5bb0f93c8314642d1da4afcf67300aab))
* **torrents:** torrent list compact view ([ef4494f](https://github.com/NoNameItem/transmission-client/commit/ef4494fddc8167175cd4311c184916dfdf79b10c))
* **torrents:** torrent selection ([955c2f9](https://github.com/NoNameItem/transmission-client/commit/955c2f9d69f0ba2d9775e35a9d117533f20aa918))
* **torrents:** tree-table for torrent files ([221c031](https://github.com/NoNameItem/transmission-client/commit/221c031b3f6a0ddf65a7c9cc0fac9a03604a9d93))
* **torrents:** verify selected ([bc1b369](https://github.com/NoNameItem/transmission-client/commit/bc1b36920552af62b584c634cdeae07817298991))


### Bug Fixes

* **api:** api retry timeout ([099797d](https://github.com/NoNameItem/transmission-client/commit/099797da1aaf54300811fbba00db7b10479a4aa8))
* **menu:** click on already selected torrent now removes selection ([cb89adb](https://github.com/NoNameItem/transmission-client/commit/cb89adbf0712ece9a84d64a4372395c6f42ffe3c))
* **settings:** save setting fix ([d3ff3ab](https://github.com/NoNameItem/transmission-client/commit/d3ff3ab09233a8a3ff1642c9f0ea7be3e4688344))
* **torrents:** do not show errors for queued torrents ([135950a](https://github.com/NoNameItem/transmission-client/commit/135950ab20d3ea524748742cce103e83c16e85a4))
* **torrents:** expand only single selected torrent ([00df5d6](https://github.com/NoNameItem/transmission-client/commit/00df5d6b2c5cc9e1396c215a852368aa931d2393))
* **torrents:** fixed start when added flag ([b3fbbd7](https://github.com/NoNameItem/transmission-client/commit/b3fbbd7683939a45f425674e181dab769f4ad934))
* **torrents:** get max upload ratio from session settings ([aacc853](https://github.com/NoNameItem/transmission-client/commit/aacc853513400dcbfc26e774776d357fdd166e39))
* **torrents:** minor fixes ([43c81d9](https://github.com/NoNameItem/transmission-client/commit/43c81d9bdd3489c35909860b25dcafc1aef3cf2d))
* **torrents:** minor fixes ([60052c3](https://github.com/NoNameItem/transmission-client/commit/60052c3540fcc7eac2fed14f43c049bab2a58932))
* **torrents:** search crash on regexp special characters ([9187005](https://github.com/NoNameItem/transmission-client/commit/91870057cafac7dcbccd465e6516bf0ce9bff8fe))
* **torrents:** status for errors ([7027393](https://github.com/NoNameItem/transmission-client/commit/7027393b7d0c9b302497a72d263d5a4d9b01a69e))
* **torrents:** wrap long stats in multiple lines ([01bdd45](https://github.com/NoNameItem/transmission-client/commit/01bdd457fba6d316eddcf8275885d21dc35722d9))
