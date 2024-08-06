module.exports = {
    apps: [
      {
        name: 'puppeteer',
        script: 'index.js',
        interpreter: '/bin/bash',
        exec_mode: 'fork',
        args: 'xvfb-run -a node'
      },
    ],
  };