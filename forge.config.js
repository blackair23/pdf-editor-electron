const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: './images/pdf.ico',
    extraResource: ['./images']
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {       
        name: 'pdf_editor',
        authors: 'Deivid Iliev',
        description: 'A PDF editor application',
        setupIcon: './images/pdf.ico',
        iconUrl: './images/pdf.ico', // Replace with your actual icon URL if needed
        loadingGif: '', // Optional: Path to a loading GIF
        icon: './images/pdf.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {icon: './images/pdf.ico'},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {icon: './images/pdf.ico'},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {icon: './images/pdf.ico'},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
