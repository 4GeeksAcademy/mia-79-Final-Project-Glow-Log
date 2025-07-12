function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: '<cloud name>',
      uploadPreset: '<upload preset>',
      buttonclass: 'cloudinary-button',
      buttontext: '+',
      sources: [
        'local',
        'url',
        'camera',
        'image_search',
        'google_drive',
        'unsplash',
      ],
      googleApiKey: '<image_search_google_api_key>',
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#c5d09f',
          windowBorder: '#5d6c3b',
          tabIcon: '#5d6c3b',
          menuIcons: '#5d6c3b',
          textDark: '#dde6c4',
          textLight: '#FFFFFF',
          link: '#5d6c3b',
          action: '#5d6c3b',
          inactiveTabIcon: '#0E2F5A',
          error: '#9daf7a',
          inProgress: '#768f58',
          complete: '#768f58',
          sourceBg: '#dde6c4',
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
            active: true,
          },
        },
      },
    },
    (err, info) => {
      if (!err) {
        console.log('Upload Widget event - ', info);
      }
    }
  );
}

// backup of values
// showAdvancedOptions: true,
//       cropping: true,
//       multiple: false,
//       defaultSource: 'local',
//       styles: {
//         palette: {
//           window: '#c5d09f',
//           windowBorder: '#5d6c3b',
//           tabIcon: '#5d6c3b',
//           menuIcons: '#5d6c3b',
//           textDark: '#dde6c4',
//           textLight: '#FFFFFF',
//           link: '#5d6c3b',
//           action: '#5d6c3b',
//           inactiveTabIcon: '#0E2F5A',
//           error: '#9daf7a',
//           inProgress: '#768f58',
//           complete: '#768f58',
//           sourceBg: '#dde6c4',
//         },

// sources: [
//         'local',
//         'url',
//         'camera',
//         'image_search',
//         'google_drive',
//         'dropbox',
//         'shutterstock',
//         'getty',
//         'istock',
//         'unsplash',
