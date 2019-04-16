'use strict';

var {app, BrowserWindow} = require('electron');

var winControl = {
	mainWindow: null,

	// Create and display the main window
	showMainWindow: function() {
		this.mainWindow = new BrowserWindow({width: 750, height: 570, show: false, resizable: true});
		this.mainWindow.loadURL('file://' + __dirname + '/../contents/main_window/index.html');
		this.mainWindow.setMenu(null);
		this.mainWindow.webContents.openDevTools();

		// Close all other windows when hidden
		this.mainWindow.on('closed', () => {
			console.log('main window closed.');
			this.mainWindow = null;
		});

		this.mainWindow.once('ready-to-show', () => {
			this.mainWindow.show();
		});
	},
};

module.exports = winControl;

